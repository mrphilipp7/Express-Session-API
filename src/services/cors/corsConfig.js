const cors = require("cors");

module.exports = function configureCors() {
  const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN,
    optionsSuccessStatus: 200,
  };
  return cors({ origin: corsOptions, credentials: true });
};
