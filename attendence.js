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
    const name = req.query.name;
    const present = req.query.present;
    if(present === 'yes'){
        return res.send(`${name} is present today`);
    }
    else{
        return res.send(`${name} is absent today`);
    }

});


const myServer = http.createServer(app);
myServer.listen(8000 , () => console.log("Server Started"));