require('dotenv').config();
const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.static(__dirname));

app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log(`Professional server running on port ${port}`);
});