const express = require("express");

const app = express();

app.use(express.json());

let  students = [
    {id:1 , name : 'gitu' , marks:90 , city:'palwal'},
    {id:2 , name : 'pawan' , marks:80 , city:'palwal'},
    {id:3 , name : 'Vipul' , marks:60 , city:'faridabad'}
]

app.get("/" , (req , res) => {
    res.send("server running...")
})


app.get("/students", (req , res) => {
    res.json(students);
});

// DELETE Method --> remove student by id ..

app.delete("/students/:id" , (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex((s) => s.id === id);
    
    if(index == -1){
        return res.status(404).json({message : "Student not found"});

    }

    const student = students[index];

    if(student.marks >= 70){
        return res.status(400).json({message : "Stundent have marks greater than 70",
            studentMarks: student.marks
        })
    }
    const deleteStudent = students.splice(index , 1);
    console.log(deleteStudent);
    res.json({
        message: "Student deleted successfully",
        deleteStudent : deleteStudent[0],
    });
});

app.listen(9100, () => {
        console.log("Surever running successfully..");
    });



