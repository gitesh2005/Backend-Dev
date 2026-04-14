const mongoose = require("mongoose");

const Todo = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },

    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },

    dueDate: {
        type: Date
    }

},
{
    timestamps: true
}
);

module.exports = mongoose.model("Task", Todo);