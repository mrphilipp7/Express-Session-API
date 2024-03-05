const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const configureCors = require("./config/cors.config");
// Required routes
const userRoute = require("./routes/user.route");
const errorRoute = require("./routes/error.route");
const sessionRoute = require("./routes/session.route");
const refreshRoute = require("./routes/refresh.route");

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

app.use(cookieParser());

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

//----middleware----//
app.use(controlHeaders);

//-----routes-----//
app.use("/api/user", userRoute);
app.use("/api/session", sessionRoute);
app.use("/api/refresh", refreshRoute);
app.use("*", errorRoute);

//-----middleware-----//
app.use(catchErrors);

module.exports = app;
