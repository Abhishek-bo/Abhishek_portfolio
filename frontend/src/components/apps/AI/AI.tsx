
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Send,
  Bot,
  User,
  Sparkles,
} from "lucide-react";

interface Message {
  role: "ai" | "user";
  text: string;
}

const API_URL =
  "https://abhishek-portfolio-cf75.onrender.com";

const cleanAIResponse = (text: string) => {
  const trimmed = text.trim();

  // If the complete response is a JSON string such as:
  // "Abhishek is a software developer."
  // remove the surrounding quotes safely.
  if (
    trimmed.length >= 2 &&
    trimmed.startsWith('"') &&
    trimmed.endsWith('"')
  ) {
    try {
      const parsed = JSON.parse(trimmed);

      if (typeof parsed === "string") {
        return parsed;
      }
    } catch {
      return trimmed.slice(1, -1);
    }
  }

  return text;
};

const AI = () => {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello! I'm Abhishek's AI assistant. Ask me about his skills, projects, education, or experience.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const chatContainerRef =
    useRef<HTMLDivElement>(null);

  // Auto-scroll chat to the latest message
  useEffect(() => {
    const container =
      chatContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Warm up the backend when the AI window opens
  useEffect(() => {
    fetch(`${API_URL}/warmup`).catch(() => {
      // Backend may still be waking up.
      // No visible error is needed.
    });
  }, []);

  const handleSend = async () => {
    const userMessage = input.trim();

    if (!userMessage || loading) return;

    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
      {
        role: "ai",
        text: "",
      },
    ]);

    try {
      const conversation = messages.map(
        (message) => ({
          role:
            message.role === "ai"
              ? "assistant"
              : "user",
          content: message.text,
        })
      );

      const response = await fetch(
        `${API_URL}/chat/stream`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            question: userMessage,
            conversation,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Backend request failed"
        );
      }

      if (!response.body) {
        throw new Error(
          "Streaming is not supported"
        );
      }

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let accumulatedText = "";

      while (true) {
        const {
          value,
          done,
        } = await reader.read();

        if (done) break;

        const chunk =
          decoder.decode(value, {
            stream: true,
          });

        accumulatedText += chunk;

        const displayText =
          cleanAIResponse(
            accumulatedText
          );

        setMessages((prev) => {
          const updated = [...prev];

          const lastIndex =
            updated.length - 1;

          if (
            lastIndex >= 0 &&
            updated[lastIndex].role ===
              "ai"
          ) {
            updated[lastIndex] = {
              ...updated[lastIndex],
              text: displayText,
            };
          }

          return updated;
        });
      }

      const remaining =
        decoder.decode();

      if (remaining) {
        accumulatedText += remaining;
      }

      const finalText =
        cleanAIResponse(
          accumulatedText
        );

      setMessages((prev) => {
        const updated = [...prev];

        const lastIndex =
          updated.length - 1;

        if (
          lastIndex >= 0 &&
          updated[lastIndex].role ===
            "ai"
        ) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            text:
              finalText.trim() ||
              "I don't have enough information to answer that.",
          };
        }

        return updated;
      });
    } catch (error) {
      console.error(
        "AI request failed:",
        error
      );

      setMessages((prev) => {
        const updated = [...prev];

        const lastIndex =
          updated.length - 1;

        if (
          lastIndex >= 0 &&
          updated[lastIndex].role ===
            "ai"
        ) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            text:
              "I'm unable to connect to my AI backend right now. Please try again in a moment.",
          };
        }

        return updated;
      });
    } finally {
      setLoading(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "rgba(15, 23, 42, 0.18)",
        color: "white",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "rgba(139, 92, 246, 0.25)",
            border:
              "1px solid rgba(167, 139, 250, 0.3)",
            boxShadow:
              "0 0 25px rgba(139, 92, 246, 0.15)",
          }}
        >
          <Sparkles size={23} />
        </div>

        <div>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Ask My AI
          </h1>

          <p
            style={{
              fontSize: "12px",
              color: "#cbd5e1",
              margin: "4px 0 0",
            }}
          >
            Abhishek's Personal AI Assistant
          </p>
        </div>
      </div>

      {/* CHAT AREA */}
      <div
        ref={chatContainerRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          marginTop: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          paddingRight: "6px",
          scrollBehavior: "smooth",
        }}
      >
        {messages.map(
          (message, index) => {
            const isAI =
              message.role === "ai";

            const isLatest =
              index ===
              messages.length - 1;

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems:
                    "flex-start",
                  gap: "10px",
                  justifyContent: isAI
                    ? "flex-start"
                    : "flex-end",
                }}
              >
                {isAI && (
                  <Bot
                    size={20}
                    style={{
                      marginTop: "10px",
                      flexShrink: 0,
                    }}
                  />
                )}

                <div
                  style={{
                    maxWidth: "75%",
                    padding:
                      "12px 15px",
                    borderRadius:
                      "14px",
                    background: isAI
                      ? "rgba(255,255,255,0.10)"
                      : "rgba(99,102,241,0.65)",
                    border:
                      "1px solid rgba(255,255,255,0.12)",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    whiteSpace:
                      "pre-wrap",
                    minHeight:
                      isAI &&
                      !message.text
                        ? "20px"
                        : undefined,
                  }}
                >
                  {message.text}

                  {isAI &&
                    loading &&
                    isLatest &&
                    !message.text && (
                      <span
                        style={{
                          display:
                            "inline-flex",
                          gap: "4px",
                          marginLeft:
                            "2px",
                        }}
                      >
                        <span className="ai-dot">
                          •
                        </span>

                        <span className="ai-dot">
                          •
                        </span>

                        <span className="ai-dot">
                          •
                        </span>
                      </span>
                    )}
                </div>

                {!isAI && (
                  <User
                    size={20}
                    style={{
                      marginTop: "10px",
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
            );
          }
        )}
      </div>

      {/* INPUT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
          padding: "8px",
          borderRadius: "14px",
          background:
            "rgba(255,255,255,0.08)",
          border:
            "1px solid rgba(255,255,255,0.18)",
          backdropFilter:
            "blur(16px)",
          WebkitBackdropFilter:
            "blur(16px)",
        }}
      >
        <input
          ref={inputRef}
          value={input}
          disabled={loading}
          onChange={(event) =>
            setInput(event.target.value)
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey
            ) {
              event.preventDefault();
              handleSend();
            }
          }}
          placeholder={
            loading
              ? "AI is responding..."
              : "Ask about Abhishek..."
          }
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background:
              "transparent",
            color: "white",
            padding: "10px",
            fontSize: "13px",
          }}
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={
            loading ||
            !input.trim()
          }
          aria-label="Send message"
          style={{
            width: "38px",
            height: "38px",
            border: "none",
            borderRadius: "10px",
            background:
              loading ||
              !input.trim()
                ? "rgba(99,102,241,0.35)"
                : "#6366f1",
            color: "white",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            cursor:
              loading ||
              !input.trim()
                ? "not-allowed"
                : "pointer",
            opacity:
              loading ||
              !input.trim()
                ? 0.6
                : 1,
            transition:
              "transform 0.2s ease, background 0.2s ease",
          }}
        >
          <Send size={17} />
        </button>
      </div>

      <style>
        {`
          .ai-dot {
            animation: aiTyping 1.2s infinite ease-in-out;
            opacity: 0.35;
          }

          .ai-dot:nth-child(2) {
            animation-delay: 0.15s;
          }

          .ai-dot:nth-child(3) {
            animation-delay: 0.3s;
          }

          @keyframes aiTyping {
            0%, 60%, 100% {
              opacity: 0.25;
              transform: translateY(0);
            }

            30% {
              opacity: 1;
              transform: translateY(-2px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AI;
