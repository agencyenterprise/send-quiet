const { MongoClient, ServerApiVersion } = require('mongodb');
const axios = require('axios').default;

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const log = (msg) => console.log('[mongo]', msg);

class Mongo {
    async connect() {
        if (this.connected) {
            return this.db;
        }
        log('Connecting')
        await client.connect();
        const db = await client.db('send-quiet');
        log('Pinging');
        await db.command({ ping: 1});
        log('Ping successful!');

        this.db = db;
        this.client = client;
        this.connected = true;
    }

    async disconnect() {
        if (this.client) {
            await this.client.close();
            this.db = null;
            this.client = null;
            this.connected = false;
        }
    }
}

export const mongo = new Mongo();
export const connect = mongo.connect();
