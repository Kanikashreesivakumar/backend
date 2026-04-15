const mysql = require("mysql2");

// Using a pool is better for stability as it handles reconnections automatically
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "kani@2004",
  database: "salary_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Pool");
    connection.release();
  }
});

module.exports = pool;