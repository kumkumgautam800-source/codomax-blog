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

            </div>
        `;

    });

});

function editBlog(id){

    // Blog ID save karo
    localStorage.setItem("editBlogId", id);

    // Add Blog page open karo
    window.location.href = "add-blog.html";

}