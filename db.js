const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kani@2004",
  database: "salary_app",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed ❌", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

module.exports = db;