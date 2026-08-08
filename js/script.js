const form = document.getElementById("blogForm");
const submitBtn = document.getElementById("submitBtn");

// ================= IMAGE ELEMENTS =================

const imageInput = document.getElementById("image");
const previewImage = document.getElementById("previewImage");

let blogImage = "";


// ================= EDIT MODE =================

const editBlogId = localStorage.getItem("editBlogId");

if (editBlogId) {

    submitBtn.textContent = "Update Blog";

    fetch("/blogs")

        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load blog");
            }

            return response.json();

        })

        .then(blogs => {

            const blog = blogs.find(
                b => b.id == editBlogId
            );

            if (blog) {

                document.getElementById("title").value =
                    blog.title || "";

                document.getElementById("author").value =
                    blog.author || "";

                document.getElementById("category").value =
                    blog.category || "";

                document.getElementById("content").value =
                    blog.content || "";


                // Existing Image

                blogImage = blog.image || "";

                if (blogImage) {

                    previewImage.src = blogImage;

                    previewImage.style.display = "block";

                }

            }

        })

        .catch(error => {

            console.log(error);

            alert("Unable to load blog.");

        });

}


// ================= IMAGE PREVIEW =================

if (imageInput) {

    imageInput.addEventListener("change", function () {

        const file = imageInput.files[0];

        if (!file) {
            return;
        }


        // Optional size check
        if (file.size > 2 * 1024 * 1024) {

            alert("Please select an image smaller than 2MB.");

            imageInput.value = "";

            return;

        }


        const reader = new FileReader();


        reader.onload = function (event) {

            blogImage = event.target.result;

            previewImage.src = blogImage;

            previewImage.style.display = "block";

        };


        reader.readAsDataURL(file);

    });

}


// ================= FORM SUBMIT =================

form.addEventListener("submit", function (event) {

    event.preventDefault();


    const title =
        document.getElementById("title").value.trim();

    const author =
        document.getElementById("author").value.trim();

    const category =
        document.getElementById("category").value.trim();

    const content =
        document.getElementById("content").value.trim();


    // ================= VALIDATION =================

    if (
        title === "" ||
        author === "" ||
        category === "" ||
        content === ""
    ) {

        alert("Please fill all fields.");

        return;

    }


    // ================= LOADING =================

    submitBtn.disabled = true;

    submitBtn.textContent =
        editBlogId
            ? "Updating..."
            : "Publishing...";


    // ================= UPDATE BLOG =================

    if (editBlogId) {

        fetch(`/blogs/${editBlogId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                title: title,

                author: author,

                category: category,

                content: content,

                image: blogImage

            })

        })

        .then(response => {

            if (!response.ok) {

                throw new Error("Update failed");

            }

            return response.json();

        })

        .then(data => {

            alert("Blog Updated Successfully!");

            localStorage.removeItem("editBlogId");

            window.location.href = "index.html";

        })

        .catch(error => {

            console.log(error);

            alert("Server Error!");

            submitBtn.disabled = false;

            submitBtn.textContent = "Update Blog";

        });

    }


    // ================= NEW BLOG =================

    else {

        fetch("/blogs", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                title: title,

                author: author,

                category: category,

                content: content,

                image: blogImage

            })

        })

        .then(response => {

            if (!response.ok) {

                throw new Error("Publish failed");

            }

            return response.json();

        })

        .then(data => {

            alert("Blog Published Successfully!");

            form.reset();

            blogImage = "";

            previewImage.src = "";

            previewImage.style.display = "none";

            window.location.href = "index.html";

        })

        .catch(error => {

            console.log(error);

            alert("Server Error!");

            submitBtn.disabled = false;

            submitBtn.textContent = "Publish Blog";

        });

    }

});