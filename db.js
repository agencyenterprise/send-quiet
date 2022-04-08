const axios = require("axios");

const buildDbUrl = (destUserId) => 
  `${process.env.FIREBASE_URL}/messages/${destUserId}.json`;

const saveMessage = (senderUserId, destUserId, message) => {
  console.log();
  const dbUrl = buildDbUrl(destUserId);
  axios.post(dbUrl, {
    senderUserId,
    message,
  });
};

module.exports = { saveMessage };
