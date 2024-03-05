/**
 * @desc check on session authentication
 * @route GET api/session/status
 * @access public
 */
const checkStatus = (req, res, next) => {
  try {
    res.status(200).json({ message: "valid session" });
  } catch (err) {
    next(err);
  }
};

module.exports = { checkStatus };
