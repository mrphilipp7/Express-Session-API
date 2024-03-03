const User = require("../models/user.model");

const createNewUser = async ({ email, password }) => {
  try {
    const newUser = await User.create({
      email,
      password: password,
    });
    return { status: "201", response: newUser };
  } catch (err) {
    return { status: "400", response: err.message };
  }
};

const findUserByID = async (id) => {
  try {
    const user = await User.findById(id);

    if (user) return user;
    else return null;
  } catch (err) {
    return err.message;
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (user) return user;
    else return null;
  } catch (err) {
    return err.message;
  }
};

module.exports = { createNewUser, findUserByID, findUserByEmail };
