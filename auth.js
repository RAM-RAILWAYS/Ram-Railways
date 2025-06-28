// This script handles signup and login form submissions

// SIGNUP FORM HANDLER
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value
    };

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const msg = await res.text();
      alert(msg);

      if (res.status === 201) {
        window.location.href = "login.html";
      }
    } catch (err) {
      alert("Signup failed: " + err.message);
    }
  });
}

// LOGIN FORM HANDLER
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      email: this.email.value,
      password: this.password.value
    };

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const msg = await res.text();
      alert(msg);

      if (res.status === 200) {
        window.location.href = "Booking.html";
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  });
}
