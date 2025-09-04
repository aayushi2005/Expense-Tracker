require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Routes
// const authRoutes = require("./routes/auth"); // Uncomment if you add auth later
const expenseRoutes = require("./routes/route");

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

// API Routes
// app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Serve frontend build files
app.use(express.static(path.join(__dirname, "../client/build")));

// Catch-all route for React frontend
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
