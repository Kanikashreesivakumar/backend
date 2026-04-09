const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all expenses
router.get("/", (req, res) => {
  db.query("SELECT * FROM expenses", (err, result) => {
    if (err) {
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
        res.status(500).send(err);
      } else {
        res.json({ message: "Expense added successfully ✅" });
      }
    }
  );
});

module.exports = router;