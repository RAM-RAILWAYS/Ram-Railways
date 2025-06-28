document.getElementById("signup-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const message = document.getElementById("signup-message");

  if (password !== confirmPassword) {
    message.innerHTML = "<p style='color: red;'>Passwords do not match.</p>";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const result = await res.json();

    if (res.ok) {
      message.innerHTML = "<p style='color: green;'>" + result.message + "</p>";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } else {
      message.innerHTML = "<p style='color: red;'>" + result.message + "</p>";
    }
  } catch (err) {
    console.error("❌ Signup error:", err);
    message.innerHTML = "<p style='color: red;'>Server error. Try again later.</p>";
  }
});
