require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

const app = express();
const port = 3000;

// ✅ Set your SendGrid API key from .env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// ✅ Booking endpoint
app.post('/booking', (req, res) => {
  const {
    from,
    to,
    date,
    trainClass,
    email,
    passengers,
    train
  } = req.body;

  const bookingTime = new Date().toLocaleString();
  const pnr = Math.floor(1000000000 + Math.random() * 9000000000);

  const msg = {
    to: email,
    from: '22csec53@gmail.com',
    subject: 'Your Ram Railways Ticket Confirmation',
    html: `
      <h2 style="color: #2d5be3;">Ram Railways - Ticket Confirmation</h2>
      <p>Dear Passenger,</p>
      <p>Your train booking is confirmed. Below are your journey details:</p>
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><th align="left">PNR</th><td>${pnr}</td></tr>
        <tr><th align="left">Train</th><td>${train.name}</td></tr>
        <tr><th align="left">From</th><td>${from}</td></tr>
        <tr><th align="left">To</th><td>${to}</td></tr>
        <tr><th align="left">Date of Journey</th><td>${date}</td></tr>
        <tr><th align="left">Departure</th><td>${train.departure}</td></tr>
        <tr><th align="left">Arrival</th><td>${train.arrival}</td></tr>
        <tr><th align="left">Duration</th><td>${train.duration}</td></tr>
        <tr><th align="left">Class</th><td>${trainClass}</td></tr>
        <tr><th align="left">Booking Time</th><td>${bookingTime}</td></tr>
      </table>
      <br/>
      <h3>Passenger Details</h3>
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><th>S.No</th><th>Name</th><th>Age</th><th>Date of Birth</th></tr>
        ${passengers.map((p, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.dob}</td>
          </tr>
        `).join('')}
      </table>
      <br/>
      <p style="color: red; font-weight: bold;">
        ⚠️ NOTE: This ticket is valid only for Ram Railways. It will not be accepted by IRCTC or any other railway service provider. ⚠️
      </p>
      <p>Thank you for booking with <strong>Ram Railways</strong>! Have a pleasant journey.</p>
    `
  };

  sgMail.send(msg)
    .then(() => {
      console.log('✅ Email sent successfully!');
      res.status(200).json({ message: 'Booking email sent successfully!' });
    })
    .catch(error => {
      console.error('❌ Email error:', error);
      res.status(500).json({ message: 'Booking failed. Please try again.' });
    });
});

// ✅ Train search endpoint - now with 20 entries
app.post('/api/search-trains', (req, res) => {
  const { from, to, date } = req.body;

  const trains = [
    { name: 'Ram Express', from: 'Madurai', to: 'Chennai', date, departure: '06:30 AM', arrival: '10:45 AM', duration: '4h 15m', availableClasses: ['Sleeper', 'AC', 'General'] },
    { name: 'Sita Superfast', from: 'Chennai', to: 'Madurai', date, departure: '12:00 PM', arrival: '04:20 PM', duration: '4h 20m', availableClasses: ['AC', 'General'] },
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

  // Optional: Filter by route and date (if needed)
 const searchFrom = from.toLowerCase();
  const searchTo = to.toLowerCase();
  const searchDate = date;

  const results = trains.filter(train =>
    train.from.toLowerCase() === searchFrom &&
    train.to.toLowerCase() === searchTo &&
    train.date === searchDate
  );

  if (!results || results.length === 0) {
    res.status(404).json({ message: '❌ No trains found for the given route and date.' });
  } else {
    res.status(200).json(results);
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
