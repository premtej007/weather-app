// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const mongoose = require('mongoose'); // or use pg/mysql2

// const app = express();
// app.use(cors());
// app.use(express.json());

// const API_KEY = '86762e5fcd370ef541e7448792c04450';

// // ===== MongoDB Example =====
// // mongoose.connect('mongodb://127.0.0.1:27017/weatherApp', { useNewUrlParser: true, useUnifiedTopology: true });

// const weatherSchema = new mongoose.Schema({
//   city: String,
//   temp: Number,
//   description: String,
//   humidity: Number,
//   wind: Number,
//   time: String,
// });

// const Weather = mongoose.model('Weather', weatherSchema);

// // ===== Routes =====

// // fetch from OpenWeather + store in DB
// app.post('/api/weather', async (req, res) => {
//   try {
//     const { city } = req.body;
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
//     const response = await axios.get(url);

//     const data = response.data;
//     const weather = new Weather({
//       city: data.name,
//       temp: data.main.temp,
//       description: data.weather[0].description,
//       humidity: data.main.humidity,
//       wind: data.wind.speed,
//       time: new Date().toLocaleString(),
//     });

//     await weather.save();
//     res.json(weather);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // get all stored results
// app.get('/api/history', async (req, res) => {
//   const results = await Weather.find().sort({ _id: -1 }).limit(20);
//   res.json(results);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

// ===== MongoDB Connect =====
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");

    // Start server only after DB connects
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ===== Schema =====
const weatherSchema = new mongoose.Schema({
  city: String,
  temp: Number,
  description: String,
  humidity: Number,
  wind: Number,
  time: String,
});
const Weather = mongoose.model('Weather', weatherSchema);

// ===== Routes =====
app.post('/api/weather', async (req, res) => {
  try {
    const { city } = req.body;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);

    const data = response.data;
    const weather = new Weather({
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      time: new Date().toLocaleString(),
    });

    await weather.save();
    res.json(weather);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    const results = await Weather.find().sort({ _id: -1 }).limit(20);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// app.get("/", (req, res) => {
//   res.send("✅ Weather API backend is running");
// });

