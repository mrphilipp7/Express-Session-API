const mysql = require("mysql2");

// Create a connection pool
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

    // Connection pool options
    waitForConnections: true, // Wait for a connection to become available if the limit is reached
    connectionLimit: numberOfConnections, // Maximum number of simultaneous connections in the pool
    queueLimit: 0, // No limit to the number of queued connection requests
  })
  .promise();

module.exports = pool;
