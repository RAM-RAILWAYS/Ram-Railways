document.getElementById("passengerCount").addEventListener("change", function () {
  const count = parseInt(this.value);
  const container = document.getElementById("passengerFields");
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const group = document.createElement("div");
    group.className = "passenger-group";
    group.innerHTML = `
      <h4>Passenger ${i + 1}</h4>
      <label>Name:</label><input type="text" class="name" required />
      <label>Age:</label><input type="number" class="age" required />
      <label>Date of Birth:</label><input type="date" class="dob" required />
    `;
    container.appendChild(group);
  }
});

document.getElementById("bookingForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").value;
  const trainClass = document.getElementById("class").value;
  const email = document.getElementById("email").value;
  const count = parseInt(document.getElementById("passengerCount").value);

  const names = document.querySelectorAll(".name");
  const ages = document.querySelectorAll(".age");
  const dobs = document.querySelectorAll(".dob");

  const passengers = [];

  for (let i = 0; i < count; i++) {
    passengers.push({
      name: names[i].value,
      age: ages[i].value,
      dob: dobs[i].value,
    });
  }

  const data = {
    from,
    to,
    date,
    trainClass,
    email,
    passengers,
  };

  console.log("🚀 Sending booking data to backend:", data); // Logging data

  try {
      await fetch("http://192.168.0.17:8080/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Status ${res.status}: ${text}`);
    }

    const result = await res.json();
    alert(result.message);
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    alert("Booking failed. Error: " + err.message);
  }
});
