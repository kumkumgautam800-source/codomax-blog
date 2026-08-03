const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

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

// DELETE Blog
app.delete("/blogs/:id", (req, res) => {

    const id = Number(req.params.id);

    blogs = blogs.filter(blog => blog.id !== id);

    res.json({
        message: "Blog Deleted Successfully"
    });

});

// PUT - Update Blog
app.put("/blogs/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const blog = blogs.find(b => b.id === id);

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    blog.title = req.body.title;
    blog.author = req.body.author;
    blog.category = req.body.category;
    blog.content = req.body.content;

    res.json({
        message: "Blog Updated Successfully",
        blog
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});