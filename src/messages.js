const { connect } = require('./db.js');

const collection = async () => {
    const db = await connect();
    return db.collection('messages');
}

export const saveMessage = async (userId, senderUserId, senderUserName, message) => {
    const collection = await collection();
    await collection.insertOne({
        created_at: Date.now(),
        userId,
        senderUserId,
        senderUserName,
        message,
    });
};

export const fetchUserMessages = async (userId) => {
    const collection = await collection();
    return await collection.find({ userId })
};

export const clearUserMessages = async (userId) => {
    const collection = await collection();
    return await collection.deleteMany({ userId })
};
