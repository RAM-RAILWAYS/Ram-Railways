document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.ticket-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const from = document.querySelector('input[placeholder="From"]').value.trim().toLowerCase();
    const to = document.querySelector('input[placeholder="To"]').value.trim().toLowerCase();
    const date = document.querySelector('input[type="date"]').value;
    const selectedClass = document.querySelectorAll('select')[0].value.trim(); // No mapping needed

    const resultSection = document.getElementById('results');
    resultSection.innerHTML = '';

    fetch('http://localhost:3000/api/search-trains', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ from, to, date })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('No matching trains found.');
        }
        return response.json();
      })
      .then(data => {
        const matchingTrains = data.filter(train =>
          selectedClass === 'All Classes' || train.availableClasses.includes(selectedClass)
        );

        if (matchingTrains.length === 0) {
          resultSection.innerHTML = '<p>No matching trains found.</p>';
          return;
        }

        matchingTrains.forEach(train => {
          const trainCard = document.createElement('div');
          trainCard.className = 'train-card';
          trainCard.style.border = "1px solid #ccc";
          trainCard.style.padding = "15px";
          trainCard.style.marginBottom = "10px";
          trainCard.style.backgroundColor = "#f9f9f9";

          const encodedTrain = encodeURIComponent(JSON.stringify(train));
          trainCard.innerHTML = `
            <h3>${train.name}</h3>
            <p><strong>From:</strong> ${train.from.toUpperCase()} | <strong>To:</strong> ${train.to.toUpperCase()}</p>
            <p><strong>Departure:</strong> ${train.departure} | <strong>Arrival:</strong> ${train.arrival}</p>
            <p><strong>Duration:</strong> ${train.duration}</p>
            <p><strong>Available Classes:</strong> ${train.availableClasses.join(', ')}</p>
            <button onclick="window.location.href='booking.html?train=${encodedTrain}'">Book Now</button>
          `;
          resultSection.appendChild(trainCard);
        });
      })
      .catch(error => {
        resultSection.innerHTML = `<p style="color:red;">${error.message}</p>`;
      });
  });
});
