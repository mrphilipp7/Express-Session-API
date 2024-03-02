/**
 * @desc catch non-existent routes
 * @route GET *
 * @access public
 */
const getInvalidRoute = (req, res) => {
  res.status(404).json({ error: { code: "404", message: "invalid route" } });
};

module.exports = { getInvalidRoute };
