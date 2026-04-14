const express = require("express");

const session = require("express-session");



const mongoose = require("mongoose");
const app = express();
// Middleware -->

app.use(express.json());

const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/session-cookie");
        console.log("MongoDB is connected to Session-cookie");
    }
    catch (err){
        console.log("error" , err);

        process.exit(1);


    }
}


connectDB();


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true
    },

    password : {
        type : String,
        required : true
    },
}) 

const user = model.Schema("user" , userSchema);









// Session Setup

app.use(
    session({
        secret:"my-secret-key2005", // encrypted session id --> 
        resave : false,
        saveUninitialized : false,
        cookie :{
            maxAge : 60 * 60 * 1000 , // 1 Hour
            httpOnly : true,
        },

    })
);


//Register -->

app.post("/register" , async (req , res) =>{
    try{
        const {username , password} = req.body || {};

        if(!username || !password){
            return res.status(400).json({
                msg : "usernama or password is required"
            })
        }
        const existingUser = await user.findOne({username});

        if(existingUser){
            return res.status(400).json({
                msg: "User already Exist"
            })
        }

        const newUser = new User({
            username,
            password
        });

    }
})
// Login (Create Session) -->

app.post("/login" , (req , res) =>{
    const {username , password} = req.body;
    // Dummy Authantication -->

    if(username === "admin" && password === "123"){
        req.session.user = {
            username: username,
            role : "admin",
        };

        return res.json({
            msg: "Login Successfull",
            sessionId : req.session.id,
        });
    }

    res.status(401).json({msg : "Invalid credentials"});
});


// Profile(Protected Route) -->

app.get("/profile" , (req , res) =>{
    if(!req.session.user){
        return res.status(401).json({msg : "please login first"})
    }
    res.json({
        msg : "User Profile",
        user: req.session.user,
    });
});



// Dashboard(Protected Routing) -->

app.get("/dashboard" , (req , res) =>{
    if(!req.session.user){
        return res.status(401).json({
            msg : "Unauthorised"
        });
    }

    res.send(`Welcome ${req.session.user.username}`)
});


//Logout Button (Destroy Session) --->

app.get("/logout" , (req , res) =>{
    req.session.destroy((err) =>{
        if(err){
            return res.status(500).send("Error Logging Out");
        }

        res.clearCookie("connect.sid");   // default cookie name
        res.send("Logged out Successfully")
    });
});


// Check Session

app.get("/check-session" , (req , res) =>{
    if(req.session.user){
        res.json({
            msg : "Session Active",
            user: req.session.user,
        });
    }
    else{
        res.json({
            msg : "No Active Session"
        })
    }
});



app.listen(2300, ()=>{
    console.log("server is running at 2300")
})