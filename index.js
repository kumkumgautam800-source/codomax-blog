const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Codomax Blog API 🚀");
});

// GET Route
app.get("/blogs", (req, res) => {
    res.json([
        {
            id: 1,
            title: "JavaScript Basics",
            author: "Kumkum"
        }
    ]);
});

// POST Route
app.post("/blogs", (req, res) => {

    const blog = req.body;

    res.json({
        message: "Blog Added Successfully",
        data: blog
    });

});

// Server Start
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});