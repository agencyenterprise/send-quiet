const { App } = require("@slack/bolt");
var CronJob = require('cron').CronJob;
const axios = require("axios");


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const sendReminder = async (userId) => {
  
  
  
  axios.post("https://slack.com/api/conversations.open?users=U02KYK0R481&pretty=1", {}, {
    headers: {
      Authorization: "Bearer xoxb-2371065813-3367314368900-bhDHNiRsyNQpVEietxieV3IC",

    }
  }).then((res) => console.log(res.data));

//   const res = await app.client.conversations.open({
//     users: [userId]
//   });

//   console.log("res = ", res);

//   await app.client.chat.postMessage({
//     channel_id: res.channel.id,
//     text: "Test message"
//   })
}

const job = new CronJob('* * * * * 1', function() {
  sendReminder();
}, null, true, 'America/Los_Angeles');

const startJob = () => {
  job.start();
}

module.exports = { sendReminder, startJob };