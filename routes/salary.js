const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

// Require authentication for all salary routes
router.use(auth);

// GET only user's salary
router.get("/", (req, res) => {
  const userId = req.user.id;
  db.query("SELECT amount FROM salary WHERE user_id = ? LIMIT 1", [userId], (err, result) => {
    if (err) {
      console.error("Error fetching salary:", err);
      return res.status(500).send(err);
    }
    res.json(result[0] || { amount: 0 });
  });
});

// SET or UPDATE user's salary
router.post("/", (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  // Try to update existing salary for this user
  db.query("UPDATE salary SET amount = ? WHERE user_id = ?", [amount, userId], (err, result) => {
    if (err) {
      console.error("Error updating salary:", err);
      return res.status(500).send(err);
    }

    // If no row exists for this user, insert it
    if (result.affectedRows === 0) {
      db.query("INSERT INTO salary (amount, user_id) VALUES (?, ?)", [amount, userId], (err) => {
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