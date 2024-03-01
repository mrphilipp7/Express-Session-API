const catchErrors = (err, req, res, next) => {
  if (err) {
    if (err.message === "Not authenticated") {
      res.status(401).json({ error: err.message });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
  next();
};

module.exports = { catchErrors };
