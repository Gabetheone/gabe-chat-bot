import React, { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I’m Gabriel’s AI assistant. Ask me anything about his background, skills, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = { role: "user", text: trimmed };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history: newMessages,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage = {
        role: "assistant",
        text: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
              "Sorry, something went wrong talking to Gabriel's AI. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="app-root">
        <header className="app-header">
          <h1>Ask Gabriel</h1>
          <p>Your personal AI guide to Gabriel’s background, skills, and projects.</p>
        </header>

        <main className="chat-container">
          <div className="messages">
            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`message ${
                        msg.role === "user" ? "message-user" : "message-assistant"
                    }`}
                >
                  <div className="message-bubble">{msg.text}</div>
                </div>
            ))}
          </div>

          <form className="input-row" onSubmit={handleSend}>
            <input
                type="text"
                placeholder="Ask something about Gabriel..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={!input.trim() || loading}>
              {loading ? "Thinking..." : "Send"}
            </button>
          </form>
        </main>
      </div>
  );
}

export default App;
