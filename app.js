const { saveMessage, fetchUserMessages, clearUserMessages, listUsers } = require('./db.js');
const { homeMessageBlockTemplate, homePageTemplate, noMessagesHomeTemplate } = require("./message-templates.js");
const { sendReminder } = require('./cron-handler.js');
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

sendReminder('U02KYK0R481');


app.event('app_home_opened', async ({ event, client, context }) => {
  const publishHome = async (view) => {
    return await client.views.publish({
      user_id: event.user,
      view
    });
  }
  
  try {
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
  ack();

  const respondWithUsage = () => {
    respond("Usage: /sendq @user message");
  }
  
  const params = payload.text.match(/\s*?\<@(.+)?>(.+)/);
  
  if (params.length !== 3) {
    respondWithUsage();
    return;
  }
  
  const destUserId = params[1].replace(/\|.*/, '');
  const message = params[2].trim();
  
  const senderUserId = payload.user_id;
  const senderUserName = payload.user_name;
  await saveMessage(senderUserId, senderUserName, destUserId, message);
  
  await respond("Message delivered :tada:");
});

app.action({action_id: 'clear'}, async ({client, ack, respond, body}) => {
  ack();
  const userId = body.user.id;
  if (!userId) {
    respond("bad user id");
  } else {
    await clearUserMessages(userId);
    await client.views.publish({
      user_id: userId,
      view: noMessagesHomeTemplate,
    });
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

