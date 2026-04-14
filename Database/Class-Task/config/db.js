const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        await mongoose.connect("mongodb://127.0.0.1:27017/todo");

        console.log("MongoDB Connected to TODO DB");

    } catch (error) {

        console.log("DB ERROR:", error);

        process.exit(1);
    }
};

module.exports = connectDB;