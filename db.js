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
  if (result.status !== 200) {
    throw new Error("could not clear messages");
  }
}

const listUsers = async() => {
  const dbUrl = `${process.env.FIREBASE_URL}/messages.json?shallow=true`;
  const result = await axios.get(dbUrl);
  if (result.status !== 200) {
    throw new Error("could not clear messages");
  }
  const users = Object.keys(result.data);
  console.log(users);
  return users;
}

module.exports = { saveMessage, fetchUserMessages, clearUserMessages, listUsers };
