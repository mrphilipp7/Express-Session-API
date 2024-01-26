const convict = require("convict");
const dotenv = require("dotenv");

// Set path to .env file and check for errors
const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
  console.error("Error: with ENV");
}

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["development", "production"],
    default: "development",
    env: "NODE_ENV",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3007,
    env: "PORT",
  },
  sessionSecret: {
    doc: "The secret for session.",
    format: String,
    default: "dev_secret",
    env: "SESSION_SECRET",
  },
});

// Load and validate configuration
config.validate({ allowed: "strict" });

module.exports = config;
