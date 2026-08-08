// =========================
// GET BLOG ID
// =========================

const blogId = localStorage.getItem("viewBlogId");


// =========================
// CHECK BLOG ID
// =========================

if (!blogId) {

    alert("Blog not found!");

    window.location.href = "index.html";

}


// =========================
// FETCH BLOGS
// =========================

fetch("/blogs")

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to fetch blogs");

        }

        return response.json();

    })

    .then(blogs => {

        // Find selected blog

        const blog = blogs.find(
            b => b.id == blogId
        );


        // Blog not found

        if (!blog) {

            alert("Blog not found!");

            window.location.href = "index.html";

            return;

        }


        // =========================
        // SHOW BLOG DATA
        // =========================

        document.getElementById("blogTitle").innerText =
            blog.title;


        document.getElementById("blogAuthor").innerText =
            blog.author;


        document.getElementById("blogCategory").innerText =
            blog.category;


        document.getElementById("blogContent").innerText =
            blog.content;


        // Date

        document.getElementById("blogDate").innerText =
            new Date().toLocaleDateString();


        // Blog Image

        document.getElementById("blogImage").src =
            blog.image ||
            "https://via.placeholder.com/900x450?text=No+Image";

    })

    .catch(error => {

        console.log(error);

        alert("Unable to load blog.");

    });