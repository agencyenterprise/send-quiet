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

const clearUserMessages = async (userId) => {
  const dbUrl = buildDbUrl(userId);
  const result = await axios.delete(dbUrl);
  console.log("userId = ", userId);
  console.log("result = " + result.status)
}


module.exports = { saveMessage, fetchUserMessages, clearUserMessages };
