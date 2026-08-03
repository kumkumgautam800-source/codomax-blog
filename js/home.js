fetch("http://localhost:3000/blogs")
.then(response => response.json())
.then(blogs => {

    const container = document.getElementById("blogContainer");

    blogs.forEach(blog => {

        container.innerHTML += `
            <div class="blog-card">

                <h3>${blog.title}</h3>

                <p><strong>Author:</strong> ${blog.author}</p>

                <p><strong>Category:</strong> ${blog.category}</p>

                <p>${blog.content}</p>

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

});

// Edit Blog
function editBlog(id){

    localStorage.setItem("editBlogId", id);

    window.location.href = "add-blog.html";

}

// Delete Blog
function deleteBlog(id){

    const confirmDelete = confirm("Are you sure you want to delete this blog?");

    if(!confirmDelete){
        return;
    }

    fetch(`http://localhost:3000/blogs/${id}`, {

        method: "DELETE"

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        location.reload();

    });

}