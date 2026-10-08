import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";

export default function FeedbackBoard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("/api/feedback");
        const data = await res.json();
        console.log("FEEDBACK DATA:", data);
        setFeedbacks(data.feedbacks || []);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        setFeedbacks((prev) => [
          { message, createdAt: new Date().toISOString() },
          ...prev,
        ]);
        setMessage("");
      } else {
        console.error("Failed to save feedback");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
    setLoading(false);
  };

  return (
    <div
      className={styles.feedbackBoard}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "relative",
        zIndex: 20,
        padding: "10px",
        fontFamily: "inherit",
      }}
    >
      <h4
        style={{
          marginBottom: "18px",
          fontSize: "20px",
        }}
      >
        Leave feedback
      </h4>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "25px",
        }}
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback..."
          style={{
            padding: "11px 14px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "inherit",
            outline: "none",
            fontSize: "14px",
            fontFamily: "inherit",
            minHeight: "90px",
            resize: "vertical",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            alignSelf: "flex-start",
            padding: "11px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: loading ? "default" : "pointer",
            fontWeight: "600",
            fontSize: "14px",
            background: "rgba(255,255,255,0.12)",
            color: "inherit",
            transition: "all 0.2s ease",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {feedbacks.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedbacks.map((fb, i) => (
            <div
              key={i}
              style={{
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
                fontSize: "14px",
              }}
            >
              {fb.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
