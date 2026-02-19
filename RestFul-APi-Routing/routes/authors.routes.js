const express = require("express");
const router = express.Router();

const { readData, writeData } = require("../utils/fileHandler");

const FILE = "./data/authors.json";


// GET ALL AUTHORS
router.get("/", (req, res) => {
    res.json(readData(FILE));
});


// ADD AUTHOR
router.post("/", (req, res) => {

    const authors = readData(FILE);

    const newAuthor = {
        id: Date.now(),
        name: req.body.name,
        country: req.body.country
    };

    authors.push(newAuthor);
    writeData(FILE, authors);

    res.status(201).json(newAuthor);
});


// UPDATE AUTHOR
router.put("/:id", (req, res) => {

    let authors = readData(FILE);
    const id = Number(req.params.id);

    const index = authors.findIndex(a => a.id === id);

    if (index === -1)
        return res.status(404).json({ message: "Author not found" });

    authors[index] = { ...authors[index], ...req.body };

    writeData(FILE, authors);

    res.json(authors[index]);
});


// DELETE AUTHOR
router.delete("/:id", (req, res) => {

    let authors = readData(FILE);
    const id = Number(req.params.id);

    authors = authors.filter(a => a.id !== id);

    writeData(FILE, authors);

    res.json({ message: "Author deleted" });
});

module.exports = router;
