const sql = require("mysql");

const connection = sql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "viact",
});

connection.query(
  "CREATE TABLE IF NOT EXISTS users(id int(11) AUTO_INCREMENT NOT NULL, email TEXT(1000) NOT NULL, password TEXT(1000) NOT NULL, repeat_password TEXT(1000) NOT NULL, PRIMARY KEY(id))",
  (err, result) => {
    if (err) console.log(err);
  }
);

module.exports = connection;
