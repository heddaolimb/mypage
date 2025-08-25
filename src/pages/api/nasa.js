// pages/api/nasa.js
export default async function handler(req, res) {
  try {
    const apiKey = process.env.NASA_API_KEY; // legg inn nøkkel i .env.local
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("NASA API error:", error);
    res.status(500).json({ error: "Failed to fetch data from NASA API" });
  }
}
