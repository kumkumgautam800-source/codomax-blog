const form = document.getElementById("blogForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const category = document.getElementById("category").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title === "" || author === "" || category === "" || content === "") {
        alert("Please fill all fields.");
        return;
    }

    alert("Blog Published Successfully!");

});