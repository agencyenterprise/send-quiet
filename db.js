const axios = require("axios");

const buildDbUrl = (destUserId) => 
  `${process.env.FIREBASE_URL}/messages/${destUserId}.json`;

const saveMessage = (senderUserId, senderUserName, destUserId, message) => {
  const dbUrl = buildDbUrl(destUserId);
  axios.post(dbUrl, {
    senderUserId,
    senderUserName,
    message,
  });
};

const fetchUserMessages = (destUserId) => {
  const dbUrl = buildDbUrl(destUserId);
  const messages = axios.get(dbUrl);
  Object.keys(messages)
    .map((messageId) => messages[messageId])
    .map((message) => )
}

module.exports = { saveMessage, fetchUserMessages };
