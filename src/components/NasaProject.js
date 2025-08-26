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

  // liten hjelpefunksjon for å sjekke om "other" faktisk er en video
  const isOtherVideo =
    data.media_type === "other" &&
    data.url &&
    (data.url.includes("youtube.com") || data.url.includes("vimeo.com"));

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

      {(data.media_type === "video" || isOtherVideo) && (
        <iframe
          src={data.url}
          title={data.title}
          className={styles.nasaVideo}
          frameBorder="0"
          allow="encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        />
      )}

      {data.media_type !== "image" &&
        !(data.media_type === "video" || isOtherVideo) && (
          <p className={styles.nasaFallback}>
            This media is not an image or video.{" "}
            {data.url ? (
              <>
                You can view it here:{" "}
                <a href={data.url} target="_blank" rel="noopener noreferrer">
                  {data.url}
                </a>
              </>
            ) : (
              <>
                No direct media URL available for this APOD. Check the official
                page{" "}
                <a
                  href={`https://apod.nasa.gov/apod/ap${data.date
                    .replace(/-/g, "")
                    .slice(2)}.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HERE
                </a>
                .
              </>
            )}
          </p>
        )}

      <p>{data.explanation}</p>
      <small>{data.date}</small>

      {/* 👇 Rå JSON-visning for demo */}
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "0.5rem",
          fontSize: "0.75rem",
          overflowX: "auto",
          marginTop: "1rem",
          borderRadius: "6px",
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
