const express = require("express");
const fs = require("fs");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// function to read users every time (NO CACHE)
const getUsers = () => JSON.parse(fs.readFileSync("./MOCK_DATA.json", "utf-8"));

const saveUsers = (data, res, successMessage, extra = {}) => {
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "File write error" });
        }
        return res.json({ message: successMessage, ...extra });
    });
};



// ================= GET ALL USERS =================
app.get("/api/users", (req, res) => {
    const users = getUsers();
    res.json(users);
});



// ================= GET SINGLE USER =================
app.get("/api/users/:id", (req, res) => {
    const users = getUsers();
    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});



// ================= CREATE USER =================
app.post("/api/users", (req, res) => {

    const users = getUsers();

    const { first_name, last_name, email, gender, job_title } = req.body;

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        first_name,
        last_name,
        email,
        gender,
        job_title,
    };

    users.push(newUser);

    saveUsers(users, res, "User created successfully", { user: newUser });
});



// ================= UPDATE USER (PATCH) =================
app.patch("/api/users/:id", (req, res) => {

    const users = getUsers();
    const id = Number(req.params.id);

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[userIndex] = {
        ...users[userIndex],
        ...req.body
    };

    saveUsers(users, res, "User updated successfully", { user: users[userIndex] });
});



// ================= DELETE USER =================
app.delete("/api/users/:id", (req, res) => {

    const users = getUsers();
    const id = Number(req.params.id);

    const filteredUsers = users.filter(u => u.id !== id);

    if (filteredUsers.length === users.length) {
        return res.status(404).json({ message: "User not found" });
    }

    saveUsers(filteredUsers, res, "User deleted successfully");
});



// ================= HTML VIEW =================
app.get("/users", (req, res) => {
    const users = getUsers();

    const html = `
    <h1>User List</h1>
    <ul>
        ${users.map(u => `<li>${u.first_name} ${u.last_name}</li>`).join("")}
    </ul>`;

    res.send(html);
});



// ================= SERVER =================
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
