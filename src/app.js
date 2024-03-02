const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const createSession = require("./services/session/session");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const passport = require("passport");
const dotenv = require("dotenv");
const configureCors = require("./services/cors/corsConfig");
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

// Protect headers
app.use(helmet());

// Use xss-clean middleware
app.use(xss());

const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
  console.error("Error: with ENV");
}

// Compress res body to send JSON to client quicker
app.use(compression());

// Configure which domains can be access API
app.use(configureCors());

// Allows req.body and req.query params able to be accessed
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

//-----session setup-----//
createSession(app);

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
