document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("login-message");

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.message === "Login successful") {
 // ✅ Store login in browser
 localStorage.setItem("loggedInUser", JSON.stringify(data.user));
            message.innerHTML = "<p style='color: green;'>Login successful! Redirecting...</p>";
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            message.innerHTML = "<p style='color: red;'>Invalid email or password.</p>";
        }
    })
    .catch((err) => {
        console.error("Login error:", err);
        message.innerHTML = "<p style='color: red;'>Server error. Try again later.</p>";
    });
});
