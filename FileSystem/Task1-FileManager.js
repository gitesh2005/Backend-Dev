const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];
const target = args[1];
const extra = args[2];

async function run() {
    switch (command) {

        // read a file
        case "read":
            try {
                const data = await fs.promises.readFile(target, "utf8");
                console.log(data);
            } catch (err) {
                handleErr(err, target);
            }
            break;

        // write a file
        case "write":
            try {
                await fs.promises.writeFile(target, extra || "");
                console.log(`Written to ${target}`);
            } catch (err) {
                handleErr(err, target);
            }
            break;

        // append logs
        case "append":
            try {
                await fs.promises.appendFile(target, extra || "" + "\n");
                console.log(`Appended to ${target}`);
            } catch (err) {
                handleErr(err, target);
            }
            break;

        // copy a file
        case "copy":
            try {
                const dest = args[2];
                await fs.promises.copyFile(target, dest);
                console.log(`Copied ${target} → ${dest}`);
            } catch (err) {
                handleErr(err, target);
            }
            break;

        // delete a file
        case "delete":
            try {
                await fs.promises.rm(target);
                console.log(`Deleted ${target}`);
            } catch (err) {
                handleErr(err, target);
            }
            break;

        // list files in a directory
        case "list":
            try {
                const files = await fs.promises.readdir(target || ".");
                for (let file of files) console.log(file);
            } catch (err) {
                handleErr(err, target);
            }
            break;

        default:
            console.log("Unknown command");
            console.log("Commands: read | write | append | copy | delete | list");
            break;
    }
}

function handleErr(err, file) {
    if (err.code === 'ENOENT') {
        console.log(`Not found: ${file}`);
    } else if (err.code === 'EACCES') {
        console.log(`Permission denied: ${file}`);
    } else {
        console.log(`Error: ${err.message}`);
    }
}

run();
