// pages/api/weather.js
export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=no`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({
        city: data.name,
        temp: data.main.temp,
        desc: data.weather[0].description,
        source: "OpenWeather",
      });
    } else {
      // 👇 fallback til wttr.in
      const wttr = await fetch(`http://wttr.in/${city}?format=j1`);
      const wttrData = await wttr.json();
      const current = wttrData.current_condition[0];
      return res.status(200).json({
        city: city,
        temp: current.temp_C,
        desc: current.weatherDesc[0].value,
        source: "wttr.in",
      });
    }
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
