/**
 * @desc check on session authentication
 * @route GET api/session/status
 * @access public
 */
const checkStatus = (req, res, next) => {
  try {
    //if-else to determine status code based on authorization
    if (req.isAuthenticated()) {
      const user = { id: req.user.id, email: req.user.email, status: 200 };
      res.status(200).json({
        isAuthenticated: req.isAuthenticated(),
        id: req.user.id,
        user: req.user.email,
        status: 200,
      });
    } else {
      res.status(401).json({
        isAuthenticated: req.isAuthenticated(),
        user: null,
        status: 401,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { checkStatus };
