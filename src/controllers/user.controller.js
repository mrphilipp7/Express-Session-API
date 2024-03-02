const bcrypt = require("bcrypt");
const User = require("../services/user/user.services");

/**
 * @desc make new user
 * @route POST api/user/register
 * @access public
 */
const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.createNewUser({
      email: email,
      password: hashedPassword,
    });

    res.status(newUser.status).json(newUser.response);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc log in user
 * @route POST api/user/login
 * @access public
 */
const loginUser = async (req, res, next) => {
  try {
    if (req.user) {
      res.status(200).json({
        status: req.authInfo,
        user: { id: req.user.id, email: req.user.email },
      });
    } else {
      throw new Error("No user was found");
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @desc demo with deserialization
 * @route GET api/user/currentUser
 * @access private
 */
const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: { id: req.user.id, email: req.user.email },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc log user out
 * @route POST api/user/logout
 * @access public
 */
const logoutUser = async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      // After successful logout
      return res.status(200).json({ message: "User logged out" });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser, getCurrentUser, logoutUser };
