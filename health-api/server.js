require("dotenv").config();
const express = require("express");
const db = require("./data/database");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const passport = require("./passport");

const app = express();
const port = process.env.PORT || 8080;

app
  .use(express.json())
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
      }),
    }),
  )
  .use(passport.initialize())
  .use(passport.session())
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
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
