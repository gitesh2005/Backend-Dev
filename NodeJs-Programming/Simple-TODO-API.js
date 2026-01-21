const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let id = 1;

app.post('/tasks', (req, res) => {
    const task = { id: id++, title: req.body.title };
    tasks.push(task);
    res.send(task);
});

app.get('/tasks', (req, res) => {
    res.send(tasks);
});

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (!task) return res.status(404).send("Task not found");
    task.title = req.body.title;
    res.send(task);
});

app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.send("Task deleted");
});

app.listen(3000, () => console.log('Server running on 3000'));
