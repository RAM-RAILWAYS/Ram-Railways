document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.ticket-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const from = document.querySelector('input[placeholder="From"]').value.trim().toLowerCase();
    const to = document.querySelector('input[placeholder="To"]').value.trim().toLowerCase();
    const date = document.querySelector('input[type="date"]').value;
    const selectedClass = document.querySelectorAll('select')[0].value.trim(); // No mapping needed

    const resultSection = document.getElementById('results');
    resultSection.innerHTML = '';

    const trains = [
      { name: 'Ram Express', from: 'Madurai', to: 'Chennai', date, departure: '06:30 AM', arrival: '10:45 AM', duration: '4h 15m', availableClasses: ['Sleeper', 'AC', 'General'] },
    { name: 'Sita Superfast', from: 'Chennai', to: 'Madurai', date, departure: '12:00 PM', arrival: '04:20 PM', duration: '4h 20m', availableClasses: ['AC', 'General', 'Sleeper'] },
    { name: 'Hanuman Local', from: 'Madurai', to: 'Chennai', date, departure: '05:45 PM', arrival: '10:00 PM', duration: '4h 15m', availableClasses: ['Sleeper', 'General'] },
    { name: 'Lakshman Express', from: 'Chennai', to: 'Bangalore', date, departure: '07:00 AM', arrival: '11:30 AM', duration: '4h 30m', availableClasses: ['Sleeper', 'AC'] },
    { name: 'Rama Janmabhoomi', from: 'Ayodhya', to: 'Delhi', date, departure: '05:00 AM', arrival: '02:00 PM', duration: '9h', availableClasses: ['Sleeper', 'AC', 'General'] },
    { name: 'Ganga Superfast', from: 'Varanasi', to: 'Kolkata', date, departure: '09:00 AM', arrival: '05:00 PM', duration: '8h', availableClasses: ['AC', 'General'] },
    { name: 'Kaveri Intercity', from: 'Chennai', to: 'Mysore', date, departure: '06:00 AM', arrival: '02:00 PM', duration: '8h', availableClasses: ['AC', 'General'] },
    { name: 'Shiv Ganga Express', from: 'Delhi', to: 'Varanasi', date, departure: '06:55 PM', arrival: '05:00 AM', duration: '10h 5m', availableClasses: ['Sleeper', 'AC'] },
    { name: 'Vaigai Express', from: 'Madurai', to: 'Chennai', date, departure: '07:05 AM', arrival: '01:30 PM', duration: '6h 25m', availableClasses: ['AC', 'General'] },
    { name: 'Palani Express', from: 'Chennai', to: 'Palani', date, departure: '11:00 PM', arrival: '05:45 AM', duration: '6h 45m', availableClasses: ['Sleeper', 'General'] },
    { name: 'Tamil Nadu Express', from: 'Delhi', to: 'Chennai', date, departure: '10:30 AM', arrival: '06:00 AM (next day)', duration: '19h 30m', availableClasses: ['AC', 'Sleeper'] },
    { name: 'Godavari Express', from: 'Hyderabad', to: 'Visakhapatnam', date, departure: '05:15 AM', arrival: '01:45 PM', duration: '8h 30m', availableClasses: ['AC', 'General'] },
    { name: 'Duronto Express', from: 'Mumbai', to: 'Howrah', date, departure: '05:45 PM', arrival: '06:50 PM (next day)', duration: '25h 5m', availableClasses: ['AC'] },
    { name: 'Pamban Special', from: 'Rameswaram', to: 'Chennai', date, departure: '08:00 PM', arrival: '08:30 AM', duration: '12h 30m', availableClasses: ['Sleeper', 'General'] },
    { name: 'Navjeevan Express', from: 'Ahmedabad', to: 'Chennai', date, departure: '06:30 AM', arrival: '04:00 PM (next day)', duration: '33h 30m', availableClasses: ['AC', 'Sleeper'] },
    { name: 'Yuva Express', from: 'Delhi', to: 'Lucknow', date, departure: '03:00 PM', arrival: '08:00 PM', duration: '5h', availableClasses: ['General', 'AC'] },
    { name: 'Himsagar Express', from: 'Jammu', to: 'Kanyakumari', date, departure: '03:45 AM', arrival: '11:00 PM (next day)', duration: '43h 15m', availableClasses: ['AC', 'Sleeper'] },
    { name: 'Charminar Express', from: 'Hyderabad', to: 'Chennai', date, departure: '06:00 AM', arrival: '02:30 PM', duration: '8h 30m', availableClasses: ['AC', 'General'] },
    { name: 'Nilgiri Mountain', from: 'Mettupalayam', to: 'Ooty', date, departure: '07:10 AM', arrival: '10:30 AM', duration: '3h 20m', availableClasses: ['General'] },
    { name: 'Gitanjali Express', from: 'Mumbai', to: 'Kolkata', date, departure: '06:00 AM', arrival: '08:00 AM (next day)', duration: '26h', availableClasses: ['Sleeper', 'AC'] },
  { name: 'Andaman Express', from: 'Chennai', to: 'Jammu', date, departure: '05:45 AM', arrival: '07:30 AM (2 days later)', duration: '49h 45m', availableClasses: ['AC', 'Sleeper'] },
  { name: 'Mandovi Express', from: 'Goa', to: 'Mumbai', date, departure: '07:10 AM', arrival: '07:00 PM', duration: '11h 50m', availableClasses: ['AC', 'General'] },
  { name: 'Rani Chennamma', from: 'Bangalore', to: 'Hubli', date, departure: '09:00 PM', arrival: '05:45 AM', duration: '8h 45m', availableClasses: ['Sleeper', 'AC'] },
  { name: 'Sanghamitra Express', from: 'Bangalore', to: 'Patna', date, departure: '09:00 AM', arrival: '05:00 PM (next day)', duration: '32h', availableClasses: ['AC', 'Sleeper'] },
  { name: 'Island Express', from: 'Kanyakumari', to: 'Bangalore', date, departure: '12:15 PM', arrival: '07:00 AM (next day)', duration: '18h 45m', availableClasses: ['Sleeper', 'AC'] },
  { name: 'Pune Intercity', from: 'Mumbai', to: 'Pune', date, departure: '06:30 AM', arrival: '09:15 AM', duration: '2h 45m', availableClasses: ['AC', 'General'] },
  { name: 'Rajasthan Queen', from: 'Delhi', to: 'Jaipur', date, departure: '04:00 PM', arrival: '08:30 PM', duration: '4h 30m', availableClasses: ['AC', 'General'] },
  { name: 'Deccan Express', from: 'Mumbai', to: 'Pune', date, departure: '07:10 AM', arrival: '10:45 AM', duration: '3h 35m', availableClasses: ['Sleeper', 'AC'] },
  { name: 'Kalinga Utkal Express', from: 'Puri', to: 'Haridwar', date, departure: '07:00 AM', arrival: '03:00 PM (next day)', duration: '32h', availableClasses: ['Sleeper', 'AC'] },
  { name: 'Secunderabad Duronto', from: 'Secunderabad', to: 'Delhi', date, departure: '06:45 PM', arrival: '08:00 AM (next day)', duration: '13h 15m', availableClasses: ['AC'] },
  { name: 'Gorakhpur Express', from: 'Kolkata', to: 'Gorakhpur', date, departure: '05:00 PM', arrival: '08:30 AM (next day)', duration: '15h 30m', availableClasses: ['Sleeper', 'General'] },
  { name: 'Howrah Mail', from: 'Chennai', to: 'Howrah', date, departure: '07:00 PM', arrival: '08:00 AM (next day)', duration: '13h', availableClasses: ['AC', 'Sleeper'] },
  { name: 'Ernakulam Express', from: 'Bangalore', to: 'Ernakulam', date, departure: '06:00 AM', arrival: '02:30 PM', duration: '8h 30m', availableClasses: ['AC', 'General'] },
  { name: 'Shalimar Express', from: 'Delhi', to: 'Shalimar', date, departure: '04:30 PM', arrival: '11:45 AM (next day)', duration: '19h 15m', availableClasses: ['AC', 'Sleeper'] },
  { name: 'Tirupati Express', from: 'Hyderabad', to: 'Tirupati', date, departure: '10:00 PM', arrival: '05:30 AM', duration: '7h 30m', availableClasses: ['Sleeper', 'General'] },
  { name: 'Ajmer Shatabdi', from: 'Delhi', to: 'Ajmer', date, departure: '06:10 AM', arrival: '12:30 PM', duration: '6h 20m', availableClasses: ['AC'] },
  { name: 'Vivek Express', from: 'Dibrugarh', to: 'Kanyakumari', date, departure: '07:00 AM', arrival: '07:00 AM (3 days later)', duration: '72h', availableClasses: ['Sleeper', 'AC'] },
  { name: 'Mysore Express', from: 'Chennai', to: 'Mysore', date, departure: '11:30 PM', arrival: '08:15 AM', duration: '8h 45m', availableClasses: ['Sleeper', 'General'] },
  { name: 'Rajdhani Express', from: 'Mumbai', to: 'Delhi', date, departure: '05:00 PM', arrival: '08:30 AM (next day)', duration: '15h 30m', availableClasses: ['AC'] },
  { name: 'Konkan Kanya Express', from: 'Mumbai', to: 'Goa', date, departure: '11:00 PM', arrival: '08:00 AM', duration: '9h', availableClasses: ['Sleeper', 'General'] }
    ];

    const matchingTrains = trains.filter(train =>
      train.from.toLowerCase() === from &&
      train.to.toLowerCase() === to &&
      (selectedClass === 'All Classes' || train.availableClasses.includes(selectedClass))
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
  });
});
