const session = require("express-session");
const MongoStore = require("connect-mongo");

function createSession(app) {
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
        maxAge: 1000 * 60 * 30, // 30 minutes
      },
    })
  );
}

module.exports = createSession;
