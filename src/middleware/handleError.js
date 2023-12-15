const handleError = (err, req, res, next) => {
  if (err) {
    res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = { handleError };
