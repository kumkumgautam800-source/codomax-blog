const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;


// =========================
// BLOGS JSON FILE
// =========================

const BLOG_FILE = path.join(__dirname, "blogs.json");


// =========================
// LOAD BLOGS
// =========================

let blogs = [];

if (fs.existsSync(BLOG_FILE)) {

    const data = fs.readFileSync(BLOG_FILE, "utf-8");

    if (data.trim() !== "") {
        blogs = JSON.parse(data);
    }

}


// =========================
// MIDDLEWARE
// =========================

app.use(express.json({
    limit: "20mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "20mb"
}));

app.use(express.static(__dirname));


// =========================
// GET ALL BLOGS
// =========================

app.get("/blogs", (req, res) => {

    res.json(blogs);

});


// =========================
// ADD BLOG
// =========================

app.post("/blogs", (req, res) => {

    const newBlog = {

        id: Date.now(),

        title: req.body.title,

        author: req.body.author,

        category: req.body.category,

        content: req.body.content,

        image: req.body.image || ""

    };


    blogs.push(newBlog);


    // Save to JSON

    fs.writeFileSync(

        BLOG_FILE,

        JSON.stringify(blogs, null, 2)

    );


    res.status(201).json({

        message: "Blog Added Successfully",

        blog: newBlog

    });

});


// =========================
// UPDATE BLOG
// =========================

app.put("/blogs/:id", (req, res) => {

    const id = Number(req.params.id);

    const blog = blogs.find(
        b => b.id === id
    );


    if (!blog) {

        return res.status(404).json({

            message: "Blog Not Found"

        });

    }


    blog.title = req.body.title;

    blog.author = req.body.author;

    blog.category = req.body.category;

    blog.content = req.body.content;

    blog.image = req.body.image || blog.image || "";


    // Save updated data

    fs.writeFileSync(

        BLOG_FILE,

        JSON.stringify(blogs, null, 2)

    );


    res.json({

        message: "Blog Updated Successfully",

        blog

    });

});


// =========================
// DELETE BLOG
// =========================

app.delete("/blogs/:id", (req, res) => {

    const id = Number(req.params.id);


    const oldLength = blogs.length;


    blogs = blogs.filter(

        blog => blog.id !== id

    );


    if (blogs.length === oldLength) {

        return res.status(404).json({

            message: "Blog Not Found"

        });

    }


    // Save updated data

    fs.writeFileSync(

        BLOG_FILE,

        JSON.stringify(blogs, null, 2)

    );


    res.json({

        message: "Blog Deleted Successfully"

    });

});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

    console.log(
        `Server Running on http://localhost:${PORT}`
    );

});