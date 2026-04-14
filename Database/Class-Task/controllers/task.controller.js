const Task = require("../models/task.model");


// Create Task
exports.createTask = async (req, res) => {
    try {

        const task = await Task.create(req.body);

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};



// Get All Tasks (Filter + Sort)  sab karega ye -->
exports.getAllTasks = async (req, res) => {
    try {

        let query = {};

        // Filter by status
        if (req.query.status) {
            query.status = req.query.status;
        }

        let tasks = Task.find(query);

        // Sort by dueDate
        if (req.query.sort) {

            let sortOrder = req.query.sort === "desc" ? -1 : 1;

            tasks = tasks.sort({
                dueDate: sortOrder
            });
        }

        const result = await tasks;

        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



// Get Single Task --> KHOJ ke dega single task using the id which is generate in th mongodb


exports.getTaskById = async (req, res) => {
    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: "Invalid ID"
        });

    }
};



// Update Task  -> update karne ke liye -->

exports.updateTask = async (req, res) => {
    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};



// Delete Task    --> ISSE delete ho jayega

exports.deleteTask = async (req, res) => {
    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: "Invalid ID"
        });

    }
};