const express = require("express");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const passport = require("passport");
const config = require("./config/configuration");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const { handleError } = require("./middleware/handleError");
require("./authentication/passport");

// Required routes
const userRoute = require("./routes/userRoute");
const errorRoute = require("./routes/errorRoute");
const sessionRoute = require("./routes/sessionRoute");

// Initialize app
const app = express();

// Access configuration properties using convict
// Port sever runs on http://localhost:3007/ when no env port is given
const PORT = config.get("port");
const SESSION_SECRET = config.get("sessionSecret");
const NODE_ENV = config.get("env");

// Compress res body to send JSON to client quicker
app.use(compression());

// Configure which domains can be access API
const corsOptions = {
  origin: process.env.PORT | "*",
  optionsSuccessStatus: 200,
};
app.use(cors());

// Allows req.body and req.query params able to be accessed
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Protect headers
app.use(helmet());

if (NODE_ENV === "development") {
  // Runs anytime a request is made
  console.log("Running in dev mode");
  app.use(morgan("tiny"));
}

//-----session setup-----//
app.use(
  session({
    secret: SESSION_SECRET,
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
app.use("/api/session", sessionRoute);
app.use("*", errorRoute);

//-----middleware-----//
app.use(handleError);

//-----MongoDB connection & Express startup-----//
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () =>
      console.log(`*** Express server listening on ${PORT} ***`)
    );
  })
  .catch((err) => {
    console.log("Mongoose error: " + err);
  });
