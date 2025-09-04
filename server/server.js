require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//const authRoutes = require("./routes/auth"); // Auth routes for login/register
const expenseRoutes = require("./routes/route"); // Expense routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Routes
//app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

const path = require("path");

// Serve frontend build files
app.use(express.static(path.join(__dirname, "../client/build")));

// All other GET requests return the frontend's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
