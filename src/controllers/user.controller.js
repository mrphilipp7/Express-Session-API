const bcrypt = require("bcrypt");
const User = require("../services/user.services");
const jwt = require("jsonwebtoken");

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
  const { email, password } = req.body;
  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      throw new Error("No user found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    //---- Generate Access Token ----//
    const accessToken = jwt.sign(
      { userID: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );

    //---- Generate Refresh Token ----//
    const refreshToken = jwt.sign(
      { userID: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    //---- Save Refresh Token To HTTP only Cookie And Return Access Token To Client ----//
    res
      .cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ accessToken });
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
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204).json({ message: "No Content" });
    res
      .clearCookie("jwt", { httpOnly: true, sameSite: "None" })
      .status(200)
      .json({ message: "User logged out" });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser, getCurrentUser, logoutUser };
