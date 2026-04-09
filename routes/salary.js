const express = require("express");
const router = express.Router();
const db = require("../db");

// GET salary
router.get("/", (req, res) => {
  db.query("SELECT amount FROM salary LIMIT 1", (err, result) => {
    if (err) {
      console.error("Error fetching salary:", err);
      return res.status(500).send(err);
    }
    res.json(result[0] || { amount: 0 });
  });
});

// SET salary
router.post("/", (req, res) => {
  const { amount } = req.body;

  // Try to update existing salary
  db.query("UPDATE salary SET amount = ?", [amount], (err, result) => {
    if (err) {
      console.error("Error updating salary:", err);
      return res.status(500).send(err);
    }

    // If no row exists, insert it
    if (result.affectedRows === 0) {
      db.query("INSERT INTO salary (amount) VALUES (?)", [amount], (err) => {
        if (err) {
          console.error("Error inserting salary:", err);
          return res.status(500).send(err);
        }
        res.json({ message: "Salary set successfully ✅" });
      });
    } else {
      res.json({ message: "Salary updated successfully ✅" });
    }
  });
});

module.exports = router;