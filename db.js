const axios = require("axios");

const buildDbUrl = (destUserId) => 
  `${process.env.FIREBASE_URL}/messages/${destUserId}.json`;

const saveMessage = async (senderUserId, senderUserName, destUserId, message) => {
  const dbUrl = buildDbUrl(destUserId);
  await axios.post(dbUrl, {
    senderUserId,
    senderUserName,
    message,
  });
};

const fetchUserMessages = async (destUserId) => {
  const dbUrl = buildDbUrl(destUserId);
  const messages = await axios.get(dbUrl);
  console.log(messages.data);
  return Object.keys(messages.data)
    .map((messageId) => messages[messageId])
}

module.exports = { saveMessage, fetchUserMessages };
