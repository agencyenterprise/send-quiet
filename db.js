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
  const result = messages.data && Object.keys(messages.data)
    .map((messageId) => {
      return {...messages.data[messageId], id: messageId}
    });
  return result;
}

module.exports = { saveMessage, fetchUserMessages };
