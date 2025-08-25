import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function NasaProject() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/nasa");
        if (!res.ok) throw new Error("Failed to fetch NASA data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading NASA data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.nasaBox}>
      <h4>{data.title}</h4>
      {data.media_type === "image" && (
        <img
          src={data.url}
          alt={data.title}
          className={styles.nasaImageLarge}
        />
      )}
      <p>{data.explanation}</p>
      <small>{data.date}</small>
    </div>
  );
}
