const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const verificationEmail = require("../services/email/emailVerification");
/**
 * @desc make new user
 * @route POST api/user/register
 * @access public
 */
const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      verified: false,
    });

    await verificationEmail(email, newUser._id);

    res.status(201).json(newUser);
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

/**
 * @desc sets a user email to verified
 * @route POST api/user/verify/:id
 * @access public
 */
const verifyUser = async (req, res, next) => {
  const userID = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { verified: true },
      { new: true }
    );
    res.status(200).json({ message: "User is verified" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  verifyUser,
};
