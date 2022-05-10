require('dotenv').config();


const app = require('./src/bolt-app.js');
app.run().catch(console.error);