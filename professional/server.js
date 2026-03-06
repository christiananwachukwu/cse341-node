require('dotenv').config({ path: __dirname + '/.env'});
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 8080;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.static(__dirname));

app.use('/', require('./routes/index'));

MongoClient.connect(process.env.MONGODB_URI)
.then ((client) =>{
    const db = client.db('cse341');
    app.locals.db = db;
    console.log('Connected to MongoDB!');

    app.listen(port, ()=> {
        console.log(`Professional server running on port ${port}`);
    });
})
.catch((err) => {
    console.error('MongoDB connection failed:', err);
});
