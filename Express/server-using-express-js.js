const http = require("http");
const express = require("express");
const app = express();
app.get("/" , (req , res) => {
    return res.send("Home page");
});
app.get("/about" , (req , res) => {
    return res.send("ABout Page");
});

app.get('/student' , (req,res) => {
    const marks = req.query.marks;
    if(marks > 40){
        return res.send('You passed the exam');
    }
    else{
        return res.send('You failed the exam');
    }

});


const myServer = http.createServer(app);
myServer.listen(8000 , () => console.log("Server Started"));