const update = document.querySelector(".update");

const updateTitle = document.querySelector(".update-title");
const updateDesc = document.querySelector(".update-post-desc");
const updateBtn = document.querySelector(".update-post-submit");

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector(".post-title").value.trim();
  const description = document.querySelector(".description").value.trim();

  if (title && description) {
    const name = title;
    console.log("request " + JSON.stringify({ name, description }));
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ name, description }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("post res: " + response);

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to Create Post");
    }
  }
};
const updateFormHandler = async (event) => {
  const name = document
    .getElementById("title-" + event.target.getAttribute("data-id"))
    .value.trim();
  const description = document
    .getElementById("desc-" + event.target.getAttribute("data-id"))
    .value.trim();
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to Update Project");
    }
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();
  console.log(event);
  console.log("DELETTTTT");
  if (event.target.hasAttribute("data-id")) {
    console.log("if block reached");
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to Delete Post");
    }
  }
};

const newPost = async (event) => {
  if (event.target.hasAttribute(".post-btn")) {
    show;
  }
};

const showUpdateForm = async (event) => {
  console.log(event);
  const element = document.getElementById(event.target.getAttribute("data-id"));
  element.classList.remove("hide");
};

document
  .querySelector(".post-submit")
  .addEventListener("click", newFormHandler);

document.querySelectorAll(".update-post-submit").forEach((i) => {
  i.addEventListener("click", updateFormHandler);
});

document.querySelectorAll(".dele-btn").forEach((i) => {
  i.addEventListener("click", delButtonHandler);
});

document.querySelectorAll(".update-btn").forEach((i) => {
  i.addEventListener("click", showUpdateForm);
});
