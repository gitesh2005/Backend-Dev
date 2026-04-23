require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/health", require("./routes/health"));

// Sample route
app.get("/", (req, res) => {
  res.send("Transaction System Running 🚀");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);