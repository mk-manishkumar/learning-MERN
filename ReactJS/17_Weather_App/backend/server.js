import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.json());

const apiKey = process.env.OPENWEATHERMAP_API_KEY;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Weather API!' });
})

app.post('/api/v1/weather-report', async (req, res) => {
  const city = req.body.city;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const weather = response.data;

    if (!weather.main) {
      return res.status(404).json({ error: 'Weather data not found' });
    }

    const weatherTextExpanded = `It's ${weather.main.temp} degrees, with ${weather.main.humidity}% humidity in ${weather.name}!`;
    res.status(200).json({ weather: weatherTextExpanded });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error fetching weather data, please try again' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
