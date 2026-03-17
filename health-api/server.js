const express = require("express");
const db = require("./data/database");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app
.use(express.json())
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
.use("/", require("./routes"));

db.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
