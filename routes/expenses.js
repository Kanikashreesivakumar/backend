const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

// Require authentication for all expense routes
router.use(auth);

// GET only the logged-in user's expenses
router.get("/", (req, res) => {
  const userId = req.user.id;
  db.query("SELECT * FROM expenses WHERE user_id = ? ORDER BY id DESC", [userId], (err, result) => {
    if (err) {
      console.error("Error fetching expenses:", err);
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

// ADD expense for the logged-in user
router.post("/", (req, res) => {
  const { title, amount } = req.body;
  const userId = req.user.id;

  db.query(
    "INSERT INTO expenses (title, amount, user_id) VALUES (?, ?, ?)",
    [title, amount, userId],
    (err, result) => {
      if (err) {
        console.error("Error adding expense:", err);
        res.status(500).send(err);
      } else {
        res.json({ message: "Expense added successfully ✅", id: result.insertId });
      }
    }
  );
});

// DELETE only user's own expense
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.query("DELETE FROM expenses WHERE id = ? AND user_id = ?", [id, userId], (err, result) => {
    if (err) {
      console.error("Error deleting expense:", err);
      res.status(500).send(err);
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Expense not found or unauthorized" });
      } else {
        res.json({ message: "Expense deleted successfully 🗑️" });
      }
    }
  });
});

// UPDATE only user's own expense
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;
  const userId = req.user.id;

  db.query(
    "UPDATE expenses SET title = ?, amount = ? WHERE id = ? AND user_id = ?",
    [title, amount, id, userId],
    (err, result) => {
      if (err) {
        console.error("Error updating expense:", err);
        res.status(500).send(err);
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: "Expense not found or unauthorized" });
        } else {
          res.json({ message: "Expense updated successfully 🔄" });
        }
      }
    }
  );
});

module.exports = router;