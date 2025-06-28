document.getElementById("cancelForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const pnr = document.getElementById("pnr").value;
  const message = document.getElementById("cancelMessage");

  try {
    const response = await fetch("http://localhost:3000/cancel-ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pnr })
    });

    const result = await response.json();

    if (response.ok) {
      message.innerHTML = `<p style="color: green;">${result.message}</p>`;
    } else {
      message.innerHTML = `<p style="color: red;">${result.message}</p>`;
    }
  } catch (err) {
    console.error("Cancel Error:", err);
    message.innerHTML = `<p style="color: red;">Server error. Try again later.</p>`;
  }
});
