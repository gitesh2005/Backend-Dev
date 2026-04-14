const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();

//built-in middleware
app.use(express.json());

//session configuration
app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000   // 1 Day
        },
    }),
);

//dummy database
const users = [];

//password validation
function validatePassword(password) {
    const errors = [];

    if (password.length < 8) errors.push("Min 8 characters required");
    if (!/[A-Z]/.test(password)) errors.push("1 uppercase required");
    if (!/[a-z]/.test(password)) errors.push("1 lowercase required");
    if (!/[0-9]/.test(password)) errors.push("1 number required");
    if (!/[!@#$^&*]/.test(password)) errors.push("1 special character required");

    return {
        isValid: errors.length === 0,
        errors,
    };
}

// check login
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    return res.status(401).json({ message: "login required" });
}

// check role
function requiredRole(role) {
    return (req, res, next) => {
        const foundUser = users.find((u) => u.id === req.session.userId);
        if (!foundUser || foundUser.role !== role) {
            return res.status(403).json({ message: "access denied" });
        }
        next();
    };
}

// Register page
app.post("/register", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: "user already exists" });
        }

        const validation = validatePassword(password);
        if (!validation.isValid) {
            return res.status(400).json({ errors: validation.errors });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashPassword,
            role: role || "user",
        };

        users.push(newUser);

        res.status(201).json({
            message: "user registered successfully",
            user: {
                id: newUser.id,
                username,
                email,
                role: newUser.role
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: "error" });
    }
});

//Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = users.find((u) => u.email === email);
        if (!user) return res.status(401).json({ message: "invalid email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "invalid password" });

        // create session
        req.session.userId = user.id;

        res.json({
            message: "login success",
            user: { id: user.id, username: user.username, role: user.role },
        });
    }
    catch (err) {
        res.status(500).json({ message: "error" });
    }
});

// profile (protected)
app.get("/profile", isAuthenticated, (req, res) => {
    const foundUser = users.find((u) => u.id === req.session.userId);

    res.json({
        message: "profile data",
        user: {
            id: foundUser.id,
            username: foundUser.username,
            role: foundUser.role
        }
    });
});

//admin route
app.get("/admin", isAuthenticated, requiredRole("admin"), (req, res) => {
    res.json({ message: "welcome admin" });
});

//logout route
app.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "logged out" });
    });
});

app.listen(3000, () => {
    console.log("server started");
});