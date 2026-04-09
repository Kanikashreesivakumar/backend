const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all expenses
router.get("/", (req, res) => {
  db.query("SELECT * FROM expenses ORDER BY id DESC", (err, result) => {
    if (err) {
      console.error("Error fetching expenses:", err);
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

// ADD expense
router.post("/", (req, res) => {
  const { title, amount } = req.body;

  db.query(
    "INSERT INTO expenses (title, amount) VALUES (?, ?)",
    [title, amount],
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

// DELETE expense
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM expenses WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting expense:", err);
      res.status(500).send(err);
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Expense not found" });
      } else {
        res.json({ message: "Expense deleted successfully 🗑️" });
      }
    }
  });
});

module.exports = router;