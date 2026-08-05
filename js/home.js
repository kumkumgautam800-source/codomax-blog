fetch("http://localhost:3000/blogs")
.then(response => response.json())
.then(blogs => {

    const container = document.getElementById("blogContainer");

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
                    src="https://picsum.photos/400/250?random=${blog.id}"
                    alt="Blog Image">

                <h3>${blog.title}</h3>

                <p><strong>Author:</strong> ${blog.author}</p>

                <p><strong>Category:</strong> ${blog.category}</p>

                <p>${blog.content}</p>

                <p style="color:gray;font-size:14px;">
                    📅 ${new Date().toLocaleDateString()}
                </p>

                <button class="btn">
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

    alert("Unable to load blogs.");

});

// Search Function
const searchInput = document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("keyup", function(){

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".blog-card");

        cards.forEach(card=>{

            const text = card.innerText.toLowerCase();

            if(text.includes(value)){
                card.style.display="block";
            }else{
                card.style.display="none";
            }

        });

    });

}

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

    fetch(`http://localhost:3000/blogs/${id}`,{

        method:"DELETE"

    })

    .then(response=>response.json())

    .then(data=>{

        alert(data.message);

        location.reload();

    })

    .catch(error=>{

        console.log(error);

        alert("Delete Failed!");

    });

}