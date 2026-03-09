require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument=require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes/contacts'));

MongoClient.connect(process.env.MONGODB_URI)
  .then((client) => {
    const db = client.db('cse341');
    app.locals.db = db;
    console.log('Connected to MongoDB!');

    app.listen(port, () => {
      console.log(`Contacts server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });