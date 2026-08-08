// ================= LOAD BLOGS =================

fetch("/blogs")
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load blogs");
        }

        return response.json();

    })
    .then(blogs => {

        const container = document.getElementById("blogContainer");

        if (!container) {
            return;
        }

        container.innerHTML = "";

        if (blogs.length === 0) {

            container.innerHTML = `
                <h2 style="text-align:center;color:#6C63FF;">
                    No Blogs Available
                </h2>
            `;

            return;
        }

        blogs.forEach(blog => {

            container.innerHTML += `

                <div class="blog-card">

                    <img
                        src="${blog.image || 'https://via.placeholder.com/400x250?text=No+Image'}"
                        alt="Blog Image"
                    >

                    <h3>${blog.title}</h3>

                    <p>
                        <strong>Author:</strong>
                        ${blog.author}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${blog.category}
                    </p>

                    <p>
                        ${blog.content}
                    </p>

                    <p style="color:gray;font-size:14px;">
                        📅 ${new Date().toLocaleDateString()}
                    </p>

                    <button
                        class="btn"
                        onclick="readMore(${blog.id})">
                        Read More
                    </button>

                    <button
                        class="btn edit-btn"
                        onclick="editBlog(${blog.id})">
                        Edit
                    </button>

                    <button
                        class="btn delete-btn"
                        onclick="deleteBlog(${blog.id})">
                        Delete
                    </button>

                </div>

            `;

        });

    })
    .catch(error => {

        console.log(error);

        const container = document.getElementById("blogContainer");

        if (container) {

            container.innerHTML = `
                <h2 style="text-align:center;color:#ff4d4d;">
                    Unable to load blogs.
                </h2>
            `;

        }

    });


// ================= SEARCH BLOG =================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase().trim();

        const cards = document.querySelectorAll(".blog-card");

        let found = false;

        cards.forEach(card => {

            const titleElement = card.querySelector("h3");

            const paragraphs = card.querySelectorAll("p");

            const categoryElement = paragraphs[1];

            const title = titleElement
                ? titleElement.innerText.toLowerCase()
                : "";

            const category = categoryElement
                ? categoryElement.innerText.toLowerCase()
                : "";

            if (
                title.includes(value) ||
                category.includes(value)
            ) {

                card.style.display = "block";

                found = true;

            } else {

                card.style.display = "none";

            }

        });


        // ================= NO RESULT =================

        let message = document.getElementById("noResult");

        if (!found && value !== "") {

            if (!message) {

                message = document.createElement("h2");

                message.id = "noResult";

                message.innerText = "No Result Found";

                message.style.textAlign = "center";

                message.style.color = "#6C63FF";

                message.style.marginTop = "30px";

                document
                    .getElementById("blogContainer")
                    .after(message);

            }

        } else {

            if (message) {

                message.remove();

            }

        }

    });

}


// ================= EDIT BLOG =================

function editBlog(id) {

    localStorage.setItem("editBlogId", id);

    window.location.href = "add-blog.html";

}


// ================= DELETE BLOG =================

function deleteBlog(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
        return;
    }


    fetch(`/blogs/${id}`, {

        method: "DELETE"

    })

        .then(response => {

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            return response.json();

        })

        .then(data => {

            alert(data.message);

            location.reload();

        })

        .catch(error => {

            console.log(error);

            alert("Delete Failed!");

        });

}


// ================= READ MORE =================

function readMore(id) {

    localStorage.setItem("viewBlogId", id);

    window.location.href = "blog.html";

}