import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css"; // merk aliasen

export default function FeedbackBoard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Hent eksisterende feedbacks når komponenten laster
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("/api/feedback");
        const data = await res.json();
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
        // legg til ny melding i listen uten å refetche alt
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
    <div className={styles.feedbackBoard}>
      <h4 className={styles.feedbackTitle}>Leave feedback</h4>

      <form onSubmit={handleSubmit} className={styles.feedbackForm}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback..."
          className={styles.feedbackTextarea}
        />
        <button
          type="submit"
          className={styles.feedbackButton}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      <div className={styles.feedbackList}>
        {feedbacks.length === 0 ? (
          <p className={styles.feedbackEmpty}>No feedback yet.</p>
        ) : (
          feedbacks.map((fb, i) => (
            <div key={i} className={styles.feedbackItem}>
              {fb.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
