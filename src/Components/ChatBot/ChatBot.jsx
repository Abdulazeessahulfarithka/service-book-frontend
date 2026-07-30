import { useState } from "react";
import axios from "axios";
import "./ChatBot.css";
import API from "../../Services/api";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I am Doorstep AI. How can I help you?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post(API, {
        message,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.reply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
    setMessage("");
  };

  return (
    <>
      <button
        className="chat-btn"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {open && (
        <div className="chat-box">

          <div className="chat-header">
            🤖 Doorstep AI
          </div>

          <div className="chat-body">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "user-msg"
                    : "bot-msg"
                }
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bot-msg">
                Typing...
              </div>
            )}

          </div>

          <div className="chat-footer">

            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Ask anything..."
            />

            <button onClick={sendMessage}>
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default ChatBot;