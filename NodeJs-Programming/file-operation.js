const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) return console.log(err);

    const words = data.split(/\s+/);
    const count = words.length;

    fs.writeFile('wordCount.txt', `word count: ${count}`, (err) => {
        if (err) return console.log(err);
        console.log('word count written to file.');
    });
});
