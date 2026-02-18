import express from "express";
const app = express();
app.use((req,res,next) => {
    console.log("Middlewar 1");
    next();
});
app.use((req,res,next) => {
    console.log("Middlewar 2");
    next();
});


app.get("/test",(req,res) => {
    res.send("Route Executed");
});
app.listen(8000,() => console.log("Server Started"));