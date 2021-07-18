const sql = require("./db.config");

exports.emailValidate = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = ?`, [email], (err, output) => {
    if (err) return result(err, null);
    return result(null, output);
  });
};

exports.insertUsers = (userObj, result) => {
  sql.query(`INSERT INTO users SET ?`, [userObj], (err, output) => {
    if (err) return result(err, null);
    return result(null, output);
  });
};

exports.userReceipts = (receiptImg, status, package, user_id, result) => {
  sql.query(
    `INSERT INTO receipts(receiptImg, status, package, user_id) VALUES(?,?,?,?)`,
    [receiptImg, status, package, user_id],
    async (err, output) => {
      if (err) return result(err, null);
      return result(null, output);
    }
  );
};
