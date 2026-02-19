const express = require("express");

const booksRoutes = require("./routes/books.routes");
const authorsRoutes = require("./routes/authors.routes");

const app = express();

app.use(express.json());

// routes
app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
