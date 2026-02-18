const express = require("express");

const app = express();

// Serve file from the 'public' directory ....

// absolute Path --> full path.. C:/Users/Dell/Desktop/..

// Relative Path --> ./public

// const staticPath = _dirname + "/public " ;

//const fullPath = 


app.use(express.static("public"));

app.listen(7800 , () => console.log("Server Running"))

