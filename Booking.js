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

  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();
  const date = document.getElementById("date").value;
  const trainClass = document.getElementById("class").value;
  const email = document.getElementById("email").value.trim();
  const count = parseInt(document.getElementById("passengerCount").value);

  const names = document.querySelectorAll(".name");
  const ages = document.querySelectorAll(".age");
  const dobs = document.querySelectorAll(".dob");

  const passengers = [];
  for (let i = 0; i < count; i++) {
    passengers.push({
      name: names[i].value.trim(),
      age: parseInt(ages[i].value),
      dob: dobs[i].value,
    });
  }

  const selectedTrainId = document.querySelector('input[name="train"]:checked');
  if (!selectedTrainId) {
    alert("Please select a train before booking.");
    return;
  }

  let trainData;
  try {
    trainData = JSON.parse(selectedTrainId.value);  // Should be a stringified object
  } catch (e) {
    alert("Train selection is invalid.");
    return;
  }

  const bookingData = {
    from,
    to,
    date,
    trainClass,
    email,
    passengers,
    train: trainData
  };

  console.log("🚀 Sending booking data to backend:", bookingData);

  try {
    const res = await fetch("http://localhost:3000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    });

    console.log("📡 Server Response Status:", res.status);

    const responseBody = await res.text();
    let result;

    try {
      result = JSON.parse(responseBody);
    } catch (err) {
      throw new Error(`Invalid JSON from server: ${responseBody}`);
    }

    if (!res.ok) {
      console.error("❌ Server error:", result);
      alert("❌ Booking failed: " + (result.error || "Unknown error"));
      return;
    }

    console.log("✅ Booking Success:", result);
    alert("🎫 Booking Confirmed!\n" + result.message);

  } catch (err) {
    console.error("❌ Fetch/Network Error:", err);
    alert("Booking failed. Reason: " + err.message);
  }
});
