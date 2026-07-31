const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// JavaScript Array
let blogs = [
    {
        id: 1,
        title: "JavaScript Basics",
        author: "Admin",
        category: "Programming",
        content: "Learn JavaScript step by step."
    }
];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Codomax Blog API 🚀");
});

// GET All Blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// POST Blog
app.post("/blogs", (req, res) => {

    const newBlog = {
        id: blogs.length + 1,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog Added Successfully",
        blog: newBlog
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});