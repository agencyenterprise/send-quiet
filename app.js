// Require the Bolt package (github.com/slackapi/bolt)
const { saveMessage, fetchUserMessages } = require('./db.js');
const { homeMessageTemplate, homeTemplate } = require("./message-templates.js");
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
    const messages = await fetchUserMessages(event.user);
    if (!messages || messages.length === 0) {
      publishHome("No messages for you");
    } else {
      //const messagesBlock = messages.map((message) => homeMessageTemplate(message.sender, message.content));
      publishHome(homeTemplate);
    }    
  } catch (error) {
    console.error(error.data);
  }
});

app.command('/sendq', async ({ ack, payload, context, respond, body }) => {
  // Acknowledge the command request
  ack();

  if (payload.channel_name !== 'directmessage') {
    await respond("Sorry, I only work with direct messages for now.");
    return;
  }
  
  const senderUserId = payload.user_id;
  const senderUserName = payload.user_name;
  const destUserId = payload.channel_id;
  const message = payload.text;
  await saveMessage(senderUserId, senderUserName, destUserId, payload.text);
  
  await respond("Message delivered.");
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  
  console.log('⚡️ Bolt app is running!');
})();






