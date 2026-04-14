require("dotenv").config();

const express = require("express");
const cors = require("cors");


const connectDB = require("./config/db");

const taskRoutes = require("./routes/task.routes");

const app = express();


// Connect Database
connectDB();


// Middleware
app.use(cors());

app.use(express.json());


// Routes
app.use("/api/tasks", taskRoutes);


// Default Route
app.get("/", (req, res) => {

    res.send("Todo API Running");

});


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});