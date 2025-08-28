import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function WeatherWidget() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  return (
    <div className={styles.weatherWidget}>
      <h3>Weather Checker</h3>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={getWeather}>Check</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div>
          <p>
            <strong>{weather.city}</strong>: {weather.temp}°C, {weather.desc}
          </p>
          <p>
            Feels like: {weather.feels_like}°C <br />
            Humidity: {weather.humidity}% <br />
            Wind: {weather.wind} m/s
          </p>
          <p style={{ fontSize: "0.8rem", color: "#999" }}>
            (source: {weather.source})
          </p>

          {/* 👇 rå JSON som bevis */}
          {weather.raw && (
            <pre
              style={{
                fontSize: "0.7rem",
                marginTop: "1rem",
                background: "#000000ff",
                padding: "0.5rem",
                borderRadius: "8px",
                overflowX: "auto",
                color: "#1bff0bff",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {JSON.stringify(weather.raw)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
