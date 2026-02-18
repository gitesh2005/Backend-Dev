const express = require("express");
const app = express();

app.use(express.json());

// Fake database
let students = [
    { id: 1, name: "gitu", marks: 98, city: "HR-30" },
    { id: 2, name: "rahul", marks: 83, city: "HR-30" }
];

// Home
app.get("/", (req, res) => {
    res.send("Server running...");
});

// Get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// PATCH → only marks allowed
app.patch("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    // body missing
    if (!req.body) {
        return res.status(400).json({ message: "Send JSON body" });
    }

    const keys = Object.keys(req.body);

    // empty body
    if (keys.length === 0) {
        return res.status(400).json({ message: "Send marks to update" });
    }

    // allow only marks
    if (keys.length !== 1 || keys[0] !== "marks") {
        return res.status(400).json({
            message: "Only 'marks' field is allowed"
        });
    }

    // update marks
    student.marks = req.body.marks;

    res.json({
        message: "Marks updated successfully",
        student
    });
});

// Server
app.listen(8900, () => {
    console.log("Server running on http://localhost:8900");
});
