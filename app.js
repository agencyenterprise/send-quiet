// Require the Bolt package (github.com/slackapi/bolt)
const { saveMessage, fetchUserMessages } = require('./db.js');
const { homeMessageBlockTemplate, homePageTemplate, noMessagesHomeTemplate } = require("./message-templates.js");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});




app.event('app_home_opened', async ({ event, client, context }) => {
  
  const publishHome = async (view) => {
    return await client.views.publish({
      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view
    });
  }
  
  try {
    console.log('event.user = ', event.user)
    const fetchedMessages = await fetchUserMessages(event.user);
    
    if (!fetchedMessages || fetchedMessages.length === 0) {
      publishHome(noMessagesHomeTemplate);
    } else {
      const messages = fetchedMessages
        .flatMap((message) => homeMessageBlockTemplate(message.senderUserName, message.message))
      publishHome(homePageTemplate(messages));
    }
  } catch (error) {
    console.error(error.data);
  }
});

app.command('/sendq', async ({ ack, client, payload, context, respond, body }) => {
  // Acknowledge the command request
  ack();

  const respondWithUsage = () => {
    respond("Usage: /sendq @user message");
  }
  
  console.log("payload = '", payload.text, "'");
  const params = payload.text.match(/\s*?\<@(.+)?>(.+)/);
  
  console.log("params = ", params);
  if (params.length !== 3) {
    respondWithUsage();
    return;
  }
  
  const destUserId = params[1].replace(/\|.*/, '');
  const message = params[2].trim();
  
  console.log("user = ", destUserId);
  console.log("message = ", message);
  
  const senderUserId = payload.user_id;
  const senderUserName = payload.user_name;
  await saveMessage(senderUserId, senderUserName, destUserId, message);
  
  await respond("Message delivered.");
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  
  console.log('⚡️ Bolt app is running!');
})();






