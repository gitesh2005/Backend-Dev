const express = require("express");
// const app = express();


app.use((req, res, next)=>{
    console.log("middleware 1");
    next();
});

app.use((req, res, next)=>{
    console.log("middleware 2");
    next();
    
});

app.get("/test", (req, res)=>{
    res.send("route executed");
});

app.listen(2000, ()=>{
    console.log("server running");
});





// TYPES OF MIDDLEWARE

// application-level middleware - execute on every route only 
// when next function executes (get, put, patch, delete, post)

// const express = require("express");
// const { message } = require("statuses");
// const app = express();

// built-in middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req, res, next)=>{
    console.log("request url: ", req.url);
    console.log("request method: ", req.method);
    next();
});

app.get("/homepage", (req,res)=>{
    res.send("welcome to home page");
});

// route level middleware - logging credentials check karta hai

const checklogin = (req, res, next)=>{
    const isloggedin = true;
    if(!isloggedin){
        return res.status(404).send("please login first");
    }
    next();
};
app.get("/dashboard", checklogin, (req,res)=>{
    res.send("welcome to dashboard");
});

//authentication middleware

const authmiddleware=(req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(402).json({message: "token required"});
    };
    if(token !== "ekta"){
        return res.status(401).json({message: "invalid token"});
    }
    next();
};

app.get("/profile", authmiddleware, (req,res)=>{
    res.json({message: "profile data "});
});

//Error handling middleware-  jo request send krne me error aate hai those go into this middleware

app.get("/error", (req,res)=>{
    throw new Error ("something went wrong");
})

app.use((err,req,res,next)=>{
    console.log("Error middleware", err.message);
    res.status(500).json({message: "internal server error"});
});
app.listen(8080, ()=>{
    console.log("server started");
});






// THIRD PARTY MIDDLEWARE
// CORS = CROSS - ORIGIN RESOURCE SHARING

const express = require("express");
const cors = require("cors");
const app = express();

// ALLOW ALL ORIGIN
app.use(cors());

app.get("/data", (req,res)=>{
    res.json({message : "cors working"});
});

app.listen(8000, ()=>{
    console.log("server started");
});

// SPECIFIC FRONTEND ALLOW
// only execute REACT/VITE
app.use(
    cors({
        origin:"http://localhost:5173",
    })
);

//MMULTIPLE FRONTEND ALLOW

const alloworigins = [
    "http://localhost:5173",
    "http://localhost:8000"
];

app.use(
    cors({
        origin: alloworigins,
    })
);