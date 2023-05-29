const sighnupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector(".email-value").value.trim();
    const password = document.querySelector(".password-value").value.trim();

    if (email && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            document.location.replace("/dashboard")
        }
        else {
            alert(response.statusText)
        }
    }
};

document.querySelector(".signup").addEventListener("submit", sighnupFormHandler);