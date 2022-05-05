const { dbConnection } = require('./db.js');

const collection = async () => {
    const db = await dbConnection;
    return db.collection('messages');
}

const saveMessage = async (userId, senderUserId, senderUserName, message) => {
    const messages = await collection();
    await messages.insertOne({
        created_at: Date.now(),
        userId,
        senderUserId,
        senderUserName,
        message,
    });
};

const fetchUserMessages = async (userId) => {
    const messages = await collection();
    return await messages.find({ userId }).limit(10).toArray();
};

const clearUserMessages = async (userId) => {
    const messages = await collection();
    return await messages.deleteMany({ userId })
};

module.exports = {
  saveMessage,
  fetchUserMessages,
  clearUserMessages
}