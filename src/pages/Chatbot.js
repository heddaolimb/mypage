import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "⚠️The backend is deployed on Render’s free plan. It may take up to 20-30s to respond the first time as the server wakes up. After that, the bot works normally. This is not a bug. You may have to wait and refresh the page.",
    },
  ]);

  const [input, setInput] = useState("");

  console.log(
    "🌟 TEST BACKEND URL:",
    process.env.NEXT_PUBLIC_BACKEND_URL || "NOT FOUND",
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
        AI Chatbot
      </h4>

      <div
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          marginBottom: "25px",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "8px",
          padding: "12px",
          background: "rgba(255,255,255,0.06)",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.sender === "user" ? "right" : "left",
              margin: "0.5rem 0",
            }}
          >
            <strong>{m.sender === "user" ? "You: " : "Bot: "}</strong>
            {m.text}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..."
          style={{
            flex: 1,
            padding: "11px 14px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "inherit",
            outline: "none",
            fontSize: "14px",
            minWidth: "180px",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "11px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            background: "rgba(255,255,255,0.12)",
            color: "inherit",
            transition: "all 0.2s ease",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
