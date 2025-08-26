import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function SentimentProject() {
  const [text, setText] = useState("");
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setEntities([]);

    try {
      const res = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      console.log("NER raw response:", data);

      if (res.ok) {
        // ✅ merge tokens
        const merged = [];
        let current = null;

        for (const ent of data) {
          if (ent.word.startsWith("##")) {
            if (current) {
              current.word += ent.word.replace("##", "");
              current.end = ent.end;
              current.score = Math.max(current.score, ent.score);
            }
          } else {
            if (current) merged.push(current);
            current = { ...ent };
          }
        }
        if (current) merged.push(current);

        setEntities(merged);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to fetch entities");
    } finally {
      setLoading(false);
    }
  };

  const colorMap = {
    PER: "#4caf50", // grønn for personer
    ORG: "#2196f3", // blå for organisasjoner
    LOC: "#ff9800", // oransje for steder
    MISC: "#9c27b0", // lilla for diverse
  };

  return (
    <div className={styles.sentimentBox}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a sentence..."
        className={styles.sentimentInput}
      />
      <button
        onClick={analyze}
        disabled={loading}
        className={styles.sentimentBtn}
      >
        {loading ? "Analyzing..." : "Extract Entities"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {entities.length > 0 && (
        <div className={styles.sentimentResult}>
          <p>Recognized entities:</p>
          <p>
            {entities.map((ent, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: colorMap[ent.entity_group] || "#eee",
                  color: "#000",
                  padding: "0.2rem 0.4rem",
                  margin: "0 0.2rem",
                  borderRadius: "0.3rem",
                  fontWeight: "bold",
                }}
              >
                {ent.word} ({ent.entity_group})
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
