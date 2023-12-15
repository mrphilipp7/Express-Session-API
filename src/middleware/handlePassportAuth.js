const handlePassportAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(new Error("Not authenticated"));
  } else {
    next();
  }
};

module.exports = { handlePassportAuth };
