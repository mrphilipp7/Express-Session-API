const mongoose = require("mongoose");
const app = require("./app");

const PORT = 3007;

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
