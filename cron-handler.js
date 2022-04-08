const { App } = require("@slack/bolt");
var CronJob = require('cron').CronJob;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const sendReminder = () => {
  app.client.conversations.open({
    users: ['U02KYK0R481']
  }).then((res) => {
    console.log("res = ", res);
    app.client.chat.postMessage({
      channel_id: res.channel.id,
      text: "Test message"
    })
  })
}

const job = new CronJob('* * * * * 1', function() {
  sendReminder();
}, null, true, 'America/Los_Angeles');

const startJob = () => {
  job.start();
}

module.exports = { sendReminder, startJob };