const mysql2 = require("mysql2/promise");
const {
  MYSQL_DB_HOST: host,
  MYSQL_DB_PORT: port,
  MYSQL_DB_USER: user,
  MYSQL_DB_PASS: password,
  MYSQL_DB_SCHEMA: database,
} = process.env;

let connection = null;

async function initDB() {
  try {
    connection = await mysql2.createConnection({
      host,
      port,
      user,
      password,
      database,
    });
    console.log(`mysql DB running on port ${port}`);

  } catch (error) {
    console.log(error);
    console.log("Application shut down due to MySQL connection error");
    process.exit(1);
  }
}

function getConnection() {
  return connection;
}

export { initDB, getConnection };
