const express = require("express");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const { handleError } = require("./middleware/handleError");
const passport = require("passport");

require("./authentication/passport");

//required routes
const userRoute = require("./routes/userRoute");
const errorRoute = require("./routes/errorRoute");

// Initialize app
const app = express();

//port sever runs on
const PORT = 3007;

// Set path to .env file and check for errors
const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
  console.error("Error: with ENV");
}

// Use the cors middleware options to configure which domains can be accessed
app.use(cors());

// allows req.body and req.query params able to be accessed
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//protect headers
app.use(helmet());

// runs anytime a request is made
app.use(morgan("tiny"));

//-----session setup-----//
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
    },
  })
);

//----passport setup-----//
app.use(passport.initialize());
app.use(passport.session());

//-----routes-----//
app.use("/api/user", userRoute);
app.use("*", errorRoute);

//-----middleware-----//
app.use(handleError);

//-----MongoDB connection & Express startup-----//
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Mongo");
    // start and run server
    app.listen(PORT, () =>
      console.log(
        `*** Express server listening on http://localhost:${PORT}/ ***`
      )
    );
  })
  .catch((err) => {
    console.log("Mongoose error: " + err);
  });
