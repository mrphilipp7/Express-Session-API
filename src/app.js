const express = require("express");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
const compression = require("compression");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const passport = require("passport");
const dotenv = require("dotenv");
const MongoStore = require("connect-mongo");
require("./services/authentication/passport");

// Required routes
const userRoute = require("./routes/userRoute");
const errorRoute = require("./routes/errorRoute");
const sessionRoute = require("./routes/sessionRoute");

// Middleware
const { catchErrors } = require("./middleware/catchErrors");
const { controlHeaders } = require("./middleware/controlHeaders");

// Initialize app
const app = express();

const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
  console.error("Error: with ENV");
}

// Compress res body to send JSON to client quicker
app.use(compression());

// Configure which domains can be access API
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  optionsSuccessStatus: 200,
};
app.use(cors({ origin: corsOptions, credentials: true }));

// Allows req.body and req.query params able to be accessed
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Protect headers
app.use(helmet());

// Use xss-clean middleware
app.use(xss());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

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

//----middleware----//
app.use(controlHeaders);

//----passport setup-----//
app.use(passport.initialize());
app.use(passport.session());

//-----routes-----//
app.use("/api/user", userRoute);
app.use("/api/session", sessionRoute);
app.use("*", errorRoute);

//-----middleware-----//
app.use(catchErrors);

module.exports = app;
