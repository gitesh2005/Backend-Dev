const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "UP",
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

module.exports = router;