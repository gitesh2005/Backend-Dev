const express = require("express");
const path = require("path");
const app = express();

const logger = require("./middleware/logger");

// middleware
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// ---------------- USERS FILTER ----------------

const users = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Gitesh" },
  { id: 3, name: "Aman" },
  { id: 4, name: "Rohit" }
];

app.get("/users", (req, res) => {
  const name = req.query.name;

  if (!name) return res.json(users);

  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(filtered);
});

// ---------------- CONTACT FORM ----------------

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  const { name, message } = req.body;
  res.send(`Thank you ${name}, we received: ${message}`);
});

// ---------------- GALLERY ----------------

app.get("/gallery", (req, res) => {
  const images = ["1.jpg", "2.jpg", "3.jpg"];
  res.render("gallery", { images });
});

// ---------------- BLOG SYSTEM ----------------

let posts = [
  { id: 1, title: "First Post", content: "Hello World" }
];

// list
app.get("/posts", (req, res) => {
  res.render("posts", { posts });
});

// new form
app.get("/posts/new", (req, res) => {
  res.render("newpost");
});

// create   -> banane ke liye
app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  posts.push({
    id: posts.length + 1,
    title,
    content
  });

  res.redirect("/posts");
});

// view single  -> dekh ne ke liye ise use karenge
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);

  if (!post) return res.render("404");

  res.render("post", { post });
});

// ---------------- 404 ----------------

app.use((req, res) => {
  res.status(404).render("404");
});

// start server
app.listen(3000, () => console.log("Server running on port 3000"));
