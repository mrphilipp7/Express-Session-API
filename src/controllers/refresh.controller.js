const User = require("../services/user.services");
const jwt = require("jsonwebtoken");

/**
 * @desc refresh JWT
 * @route GET api/refresh/
 * @access public
 */
const refreshToken = (req, res) => {
  const cookies = req.cookies;

  // Make sure jwt cookie exists
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const user = await User.findUserByID(decoded.userID);
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      //---- Generate Access Token ----//
      const accessToken = jwt.sign(
        { userID: decoded.userID },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1m",
        }
      );

      res.json({ accessToken });
    }
  );
};

module.exports = refreshToken;
