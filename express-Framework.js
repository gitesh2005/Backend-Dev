const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();

    const log = `${Date.now()} : ${req.method} ${req.url} New Request Received\n`;
    const myUrl = url.parse(req.url, true);

    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            res.end("Error logging request");
            return;
        }

        switch (myUrl.pathname) {

            case "/":
                if (req.method === "GET") {
                    res.end("Home Page");
                }
                break;

            case "/about":
                if (req.method === "GET") {
                    const username = myUrl.query.myname;
                    res.end(`Hi, ${username}`);
                }
                break;

            case "/search":
                if (req.method === "GET") {
                    const search = myUrl.query.search_query;
                    res.end("Here are your results for " + search);
                }
                break;

            case "/signup":

                if (req.method === "GET") {
                    res.end("This is a signup form");
                }

                else if (req.method === "POST") {
                    res.end("Signup Success");
                }

                else if (req.method === "PATCH") {
                    res.end("User updated successfully");
                }

                else if (req.method === "DELETE") {
                    res.end("User deleted successfully");
                }

                else {
                    res.end("Method Not Allowed");
                }
                break;

            default:
                res.end("404 Not Found");
        }
    });
});

myServer.listen(8000, () => console.log("Server Started on port 8000"));

