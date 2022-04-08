// Require the Bolt package (github.com/slackapi/bolt)
const { saveMessage } = require('./db.js');
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});


app.event('app_home_opened', async ({ event, client, context }) => {
    try {
      console.log('event.user: ', event.user);
      /* view.publish is the method that your app uses to push a view to the Home tab */
      const result = await client.views.publish({

        /* the user that opened your app's app home */
        user_id: event.user,

        /* the view object that appears in the app home*/
        view: {
          "type": "home",
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "Hello *World*"
              }
            }
          ]
        }
      }
    );
    
  } catch (error) {
    console.error(error.data);
  }
});

app.command('/sendq', async ({ ack, payload, context, respond }) => {
  // Acknowledge the command request
  ack();

  saveMessage("test-user-id", payload);
  
  await respond("test");
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  
  console.log('⚡️ Bolt app is running!');
})();




