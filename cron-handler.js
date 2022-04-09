const { App } = require("@slack/bolt");
var CronJob = require('cron').CronJob;
const axios = require("axios");
const FormData = require('form-data');


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const sendReminder = async (userId) => {
  
  const reminderText = "Hello! You have quiet messages to check! Click on the Home tab above.";
  
  const formData = new FormData();
  formData.append('token', process.env.SLACK_BOT_TOKEN);
  
  axios.post(`https://slack.com/api/conversations.open?users=${userId}&pretty=1`, formData, {
    headers: formData.getHeaders(),
  }).then((res) => {
    const data = res.data;
    if (res.status === 200 && data.ok) {
      console.log("sending post", data, data.channel.id);
      axios.post(`https://slack.com/api/chat.postMessage?channel=${data.channel.id}&text=${reminderText}&pretty=1`, formData, {
        headers: formData.getHeaders(),
      }).then((res) => console.log(res));
    }
  });
  
}

const job = new CronJob('* * * * * 1', function() {
  sendReminder();
}, null, true, 'America/Los_Angeles');

const startJob = () => {
  job.start();
}

module.exports = { sendReminder, startJob };