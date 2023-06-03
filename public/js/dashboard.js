const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector(".post-title").value.trim()
    const description = document.querySelector(".description").value.trim()

    if (title && description) {
        const name = title;
        console.log("request " + JSON.stringify({ name, description }))
        const response = await fetch(`/api/posts`, {
            method: "POST",
            body: JSON.stringify({ name, description }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log("post res: " + response);

        if (response.ok) {
            document.location.replace("/dashboard")
        }
        else {
            alert("Failed to Create Post")
        }
    }
};
const updateFormHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");

        const response = await fetch(`api.posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title, description })
        });

        if (response.ok) {
            document.location.replace("/dashboard")
        }
        else {
            alert("Failed to Update Project")
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id")

        const response = await fetch(`/api/posts/:id`, {
            method: "DELETE"
        });

        if (response.ok) {
            document.location.replace("/dashboard")
        }
        else {
            alert("Failed to Delete Post")
        }
    }
};

const newPost = async (event) => {
    if (event.target.hasAttribute(".post-btn")) {
        show
    }
}

document.querySelector(".post-submit").addEventListener("click", newFormHandler);

document.querySelector(".update-btn").addEventListener("click", updateFormHandler);

document.querySelector(".dele-btn").addEventListener("click", delButtonHandler);