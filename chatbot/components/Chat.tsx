"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll zum letzten Nachrichtenelement
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto h-[90vh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Stelle eine Frage, um mit Claude zu chatten
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                } break-words whitespace-pre-wrap overflow-x-hidden`}
              >
                {message.role === "user" ? "User: " : "AI: "}
                {message.parts && message.parts.map((part, index) => {
                  // text parts:
                  if (part.type === "text") {
                    return <div key={index} className="whitespace-pre-wrap break-words">{part.text}</div>;
                  }
                  // reasoning parts:
                  if (part.type === "reasoning") {
                    return (
                      <pre key={index} className="whitespace-pre-wrap break-words overflow-x-auto">
                        {part.details.map((detail, idx) =>
                          detail.type === "text" ? (
                            <span key={idx} className="whitespace-pre-wrap break-words">
                              {detail.text}
                            </span>
                          ) : (
                            "<redacted>"
                          )
                        )}
                      </pre>
                    );
                  }
                  return null; // Für andere Part-Typen
                })}
                {/* Fallback für Abwärtskompatibilität, falls message.content noch verwendet wird */}
                {!message.parts && message.content && (
                  <div className="whitespace-pre-wrap break-words">{message.content}</div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            name="prompt"
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Schreibe eine Nachricht..."
            className="flex-1 rounded-md border border-input p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
