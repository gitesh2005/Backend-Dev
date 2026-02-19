const express = require("express");
const router = express.Router();

const { readData, writeData } = require("../utils/fileHandler");
const validateYear = require("../middleware/validateYear");

const FILE = "./data/books.json";


// ================================
// GET ALL BOOKS (Filter + Pagination)
// ================================

router.get("/", (req, res) => {

    let books = readData(FILE);

    const { author, year, page = 1, limit = 10 } = req.query;

    // Exercise 1: filtering
    if (author) {
        books = books.filter(b => b.author.toLowerCase() === author.toLowerCase());
    }

    if (year) {
        books = books.filter(b => b.year == year);
    }

    // Exercise 3: pagination
    const start = (page - 1) * limit;
    const end = start + Number(limit);

    const paginated = books.slice(start, end);

    res.json({
        total: books.length,
        page: Number(page),
        data: paginated
    });
});


// ================================
// SEARCH BOOK BY TITLE (Exercise 5)
// ================================

router.get("/search", (req, res) => {

    const { title } = req.query;
    let books = readData(FILE);

    const result = books.filter(b =>
        b.title.toLowerCase().includes(title.toLowerCase())
    );

    res.json(result);
});


// ================================
// ADD BOOK
// ================================

router.post("/", validateYear, (req, res) => {

    const books = readData(FILE);

    const newBook = {
        id: Date.now(),
        ...req.body
    };

    books.push(newBook);
    writeData(FILE, books);

    res.status(201).json(newBook);
});


// ================================
// UPDATE BOOK
// ================================

router.put("/:id", validateYear, (req, res) => {

    let books = readData(FILE);
    const id = Number(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1)
        return res.status(404).json({ message: "Book not found" });

    books[index] = { ...books[index], ...req.body };

    writeData(FILE, books);

    res.json(books[index]);
});


// ================================
// DELETE BOOK
// ================================

router.delete("/:id", (req, res) => {

    let books = readData(FILE);
    const id = Number(req.params.id);

    books = books.filter(b => b.id !== id);

    writeData(FILE, books);

    res.json({ message: "Book deleted" });
});

module.exports = router;
