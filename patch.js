const express = require("express");
const app = express();

app.use(express.json());

// Fake database
let students = [
    { id: 1, name: "gitu", marks: 98, city: "HR-30" },
    { id: 2, name: "rahul", marks: 83, city: "HR-30" }
];

app.get("/", (req, res) => {
    res.send("Server running...");
});

app.get("/students", (req, res) => {
    res.json(students);
});

app.patch("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const updates = req.body;

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    // partial update
    Object.assign(student, updates);

    res.json({
        message: "Student updated successfully",
        student
    });
});

app.listen(8800, () => {
    console.log("Server running on http://localhost:8800");
});
