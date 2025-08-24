import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // legg til brukerens melding
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

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
          border: "1px solid #333",
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
          width: "70%",
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
          background: "#cd8f6d",
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
