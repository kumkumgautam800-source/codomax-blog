const form = document.getElementById("blogForm");
const submitBtn = document.getElementById("submitBtn");

// Check if Edit Mode
const editBlogId = localStorage.getItem("editBlogId");

if (editBlogId) {

    submitBtn.textContent = "Update Blog";

    fetch("http://localhost:3000/blogs")
        .then(response => response.json())
        .then(blogs => {

            const blog = blogs.find(b => b.id == editBlogId);

            if (blog) {
                document.getElementById("title").value = blog.title;
                document.getElementById("author").value = blog.author;
                document.getElementById("category").value = blog.category;
                document.getElementById("content").value = blog.content;
            }

        });

}

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const category = document.getElementById("category").value.trim();
    const content = document.getElementById("content").value.trim();

    if (
        title === "" ||
        author === "" ||
        category === "" ||
        content === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    // EDIT BLOG
    if (editBlogId) {

        fetch(`http://localhost:3000/blogs/${editBlogId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                author,
                category,
                content
            })

        })

        .then(response => response.json())

        .then(data => {

            alert("Blog Updated Successfully!");

            localStorage.removeItem("editBlogId");

            window.location.href = "index.html";

        });

    }

    // NEW BLOG
    else {

        alert("Blog Published Successfully!");

    }

});