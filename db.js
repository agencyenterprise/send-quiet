
const axios = require('axios');

const buildDbUrl = (destUserId) => {
  process.env.FIREBASE_URL + "/messages/" + destUserId;
}

export const saveMessage = (senderUserId, destUserId, message) {
  axios.post()
}