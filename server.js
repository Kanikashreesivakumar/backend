const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const expenseRoutes = require("./routes/expenses");
const salaryRoutes = require("./routes/salary");
const authRoutes = require("./routes/auth");

app.use("/expenses", expenseRoutes);
app.use("/salary", salaryRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});