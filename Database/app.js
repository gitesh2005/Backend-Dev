import express from 'express';
import mg from 'mongoose';
const app = express();
app.use(express.json());
mg.connect("mongodb://127.0.0.1:27017/student")
.then(() => console.log("connected to database"))
.catch((err) => console.log(err));
const studentSchema = new mg.Schema({
    name: String,
    age: Number,
    email: Stringt
});
const Student = mg.model("Student", studentSchema);
const getStudent = async (req, res) => {
    try {
        const data = await Student.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const postStudent = async (req, res) => {
    try {
        const { name, age, email } = req.body;
        const newStudent = new Student({
            name,
            age,
            email
        });
await newStudent.save();
res.status(201).json({
            message: "Student saved",
            student: newStudent
        });
} catch (err) {
        res.status(400).json({ error: err.message });
    }
};
app.get("/students", getStudent);
app.post("/students", postStudent);
app.listen(3000, () => {console.log("server is running on port 3000");});