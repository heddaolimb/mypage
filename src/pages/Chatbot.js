import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "⚠️The backend is deployed on Render’s free plan. It may take up to 20-30s to respond the first time as the server wakes up. After that, the bot works normally. This is not a bug.",
    },
  ]);

  const [input, setInput] = useState("");

  // 👇 logger hvilken backend-URL som brukes
  console.log(
    "🌟 TEST BACKEND URL:",
    process.env.NEXT_PUBLIC_BACKEND_URL || "NOT FOUND"
  );

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Could not reach chatbot backend." },
      ]);
    }

    setInput("");
  };

  return (
    <div
      style={{
        padding: "1rem",
        background: "#161624",
        borderRadius: "12px",
        color: "white",
        marginTop: "2rem",
      }}
    >
      <div
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          marginBottom: "1rem",
          border: "3px solid #bcbcbcff",
          borderRadius: "8px",
          padding: "0.5rem",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.sender === "user" ? "right" : "left",
              margin: "0.3rem 0",
            }}
          >
            <strong>{m.sender === "user" ? "You: " : "Bot: "}</strong>
            {m.text}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a message..."
        style={{
          width: "80%",
          marginRight: "0.5rem",
          padding: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #555",
          background: "#1f1f2e",
          color: "white",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          background: "#ff6e20ff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}
