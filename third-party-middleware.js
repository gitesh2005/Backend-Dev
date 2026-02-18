// CORS = CROSS-ORIGIN RESOURCE SHARING



const express = require("express");
const  cors = require("cors");
const app = express();

// Allow all origin -->

app.use(cors());

app.get("/data" , (req , res) => {
    res.json({message : "Cors working"});
});

app.listen(2000 , () => console.log("Server Started.."));

// ONLY EXECUTE react/vite
app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

// Multiple frontend allow --> 

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:2712"
];

app.use(
    cors({
        origin:allowedOrigins,
    })
);

