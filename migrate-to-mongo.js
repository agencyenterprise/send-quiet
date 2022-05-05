const { MongoClient, ServerApiVersion } = require('mongodb');
const axios = require('axios').default;

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const db = await client.db('send-quiet');
    console.log("Connected to server, pinging");
    await db.command({ ping: 1 })
    console.log("Ping successful! Fetching messages...");
    const messages = await fetchAllMessages();
    console.log("Saving on mongo...")
    await db.collection('messages').insertMany(messages);
    console.log('Done.');

  } finally {
    await client.close();
  }
}

async function fetchAllMessages() {
  const messages = await axios.get("https://send-quiet-default-rtdb.firebaseio.com/messages.json")
    .then((res) => res.data);
  
  return Object.keys(messages).flatMap((userId) => 
    Object.keys(messages[userId])
      .map((messageId) => messages[userId][messageId])
      .map((messageObj) => {
        const { message, senderUserId, senderUserName } = messageObj;
        return {
            userId,
            message,
            senderUserId,
            senderUserName,
        };
      })
  );
}

run().catch(console.dir);