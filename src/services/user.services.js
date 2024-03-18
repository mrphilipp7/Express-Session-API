const pool = require("../config/db.config");

const createNewUser = async ({ email, password }) => {
  try {
    const query = `INSERT INTO User (Email, Password) VALUES (?,?)`;
    const result = await pool.query(query, [email, password]);

    return { status: "201", response: result };
  } catch (err) {
    return { status: "400", response: err.message };
  }
};

const findUserByID = async (id) => {
  try {
    const query = `SELECT * FROM User WHERE id =(?)`;
    const [rows] = await pool.query(query, [id]);

    return rows;
  } catch (err) {
    return err.message;
  }
};

const findUserByEmail = async (email) => {
  try {
    const query = `SELECT * FROM User WHERE Email = (?)`;
    const [rows] = await pool.query(query, [email]);

    return rows;
  } catch (err) {
    return err.message;
  }
};

module.exports = { createNewUser, findUserByID, findUserByEmail };
