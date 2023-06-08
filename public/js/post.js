const commentFormHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector(".comment-description").value.trim()
    const id = event.target.getAttribute("data-id")

    if (description) {
        const response = await fetch(`/api/posts/${id}`, {
            method: "POST",
            body: JSON.stringify({ description }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response);

        if (response.ok) {
            document.location.replace(`/post/${id}`)
        }
        else {
            alert("Failed to create comment")
        }
    }
};

document.querySelector(".comment-submit").addEventListener("click", commentFormHandler);