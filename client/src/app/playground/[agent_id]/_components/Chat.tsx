"use client";

import { Button } from "@/components/ui/button";
import { agents } from "@/generated/prisma";
import { useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import { Input } from "@/components/ui/input";

const Chat = ({ agent }: { agent: agents }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "agent", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { id: Date.now(), sender: "user", text: input };
      setMessages([...messages, userMessage]);
      setInput("");

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_AGENT_BASE}:${3000 + agent.id}/chat`,
          { prompt: input }
        );
        const agentMessage = {
          id: Date.now() + 1,
          sender: "agent",
          text: response.data.response,
        };
        setMessages((prevMessages) => [...prevMessages, agentMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage = {
          id: Date.now() + 1,
          sender: "agent",
          text: "Sorry, there was an error processing your request.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  return (
    <div className="relative flex flex-col h-[calc(100dvh-4rem)] p-4 rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 rounded-lg shadow-inner mb-24">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <Markdown>{message.text}</Markdown>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSend}
        className="absolute bottom-0 left-0 w-full flex items-center gap-4 p-4 bg-white"
      >
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="resize-none h-12"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default Chat;
