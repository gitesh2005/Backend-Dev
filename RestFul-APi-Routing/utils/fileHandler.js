const fs = require("fs");

function readData(path) {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
}

function writeData(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
