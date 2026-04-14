import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const app = express();

const preferenceSchema = new mongoose.Schema({
    userId: { type: String, required: true },   // important field
    username: { type: String, default: "guest" },
    theme: { type: String, default: "light" },
    language: { type: String, default: "en" },
}, { timestamps: true });

const Preference = mongoose.model('Preference', preferenceSchema);
app.use(express.json());
app.use(cookieParser());


// 1. Set Cookie
app.get("/set-cookie", (req, res) => {
    res.cookie("username", "gitu", {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
    res.json({ msg: "Cookie set successfully" });
});

// 2. Get Cookie
app.get("/get-cookie", (req, res) => {
    const username = req.cookies.username;

    if (username) {
        res.json({ msg: `Hello, ${username}` });
    } else {
        res.json({ msg: "No username cookie found" });
    }
});

// 3. Delete Cookie
app.get("/delete-cookie", (req, res) => {
    res.clearCookie("username");
    res.json({ msg: "Cookie deleted successfully" });
});

// 4. Save Preferences (DB + Cookie)
app.post("/set-preferences", async (req, res) => {
    try {
        const { username, theme, language } = req.body;

        const data = {
            userId: "default", // later can replace with logged-in user id
            username: username || "guest",
            theme: theme || "light",
            language: language || "en"
        };

        const savedPref = await Preference.findOneAndUpdate(
            { userId: "default" },
            data,
            { upsert: true, new: true }
        );

        // Save in cookie also
        res.cookie("preferences", JSON.stringify(data), {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        res.json({
            msg: "Preferences saved successfully",
            data: savedPref
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error saving preferences" });
    }
});

// 5. Get Preferences
app.get("/get-preferences", async (req, res) => {
    try {
        const pref = await Preference.findOne({ userId: "default" });

        if (!pref) {
            return res.json({ msg: "No preferences found" });
        }

        res.json({
            msg: "Preferences retrieved successfully",
            preferences: {
                username: pref.username,
                theme: pref.theme,
                language: pref.language
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error fetching preferences" });
    }
});

mongoose.connect('mongodb://127.0.0.1:27017/cookies')
.then(() => {
    console.log(' Connected to MongoDB');
})
.catch(err => {
    console.error(' MongoDB connection error:', err);
});

app.listen(3000, () => {
    console.log(" Server running on port 3000");
});