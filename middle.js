//Types of middleware
import express from "express";
const app = express();



//1.Built in middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));  //form data ko read karne ke liye use hota hai

//2.Application level middleware
app.use((req,res,next) => {
    console.log("Request Url : ",req.url);
    console.log("Request Method : ",req.method);
    next();
});

app.get("/home",(req,res) => {
    res.send("Home Page");
});


//3.Route level middleware
const checkLogin = (req,res,next) => {
    const isLoggedIn = true; //for testing purpose
    if(!isLoggedIn){
        return res.status(401).send("Please Login First");
    }
    next();
};

app.get("/dashboard",checkLogin,(req,res) => {
    res.send("Welcome to Dashboard Page");
});

const authentication = (req,res,next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message:"Token Required"});
    }
    if(token !== "akku"){
        return res.status(401).json({message:"Invalid Token"});
    }

    next();

};
app.get("/profile",authentication,(req,res) => {
    res.json({message:"Profile Data"});
});

//4.Error handling middleware
app.get("/error",(req,res) => {
    throw new Error("Something Went Wrong");
});
app.use((err,req,res,next) => {
    console.log("Error : ",err.message);
    res.status(500).json({message:"Internal Server Error"});
});


//5.Third party middleware
//CORS = Cross Origin Resource Sharing
import cors from "cors";

//Allow all origin
app.use(cors({
    origin:"http://localhost:3000"
}));


app.get("/get",(req,res))









app.listen(8000,() => console.log("Server Started"));