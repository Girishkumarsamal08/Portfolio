"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMitoResponse, Message } from "../lib/mitoEngine";

export default function MitoCompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Listen to open from Live Preview clicks on portfolio
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-mito-companion", handleOpen);
    return () => window.removeEventListener("open-mito-companion", handleOpen);
  }, []);

  // Welcome message when opened the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            sender: "mito",
            text: "Hello! 🌙 I am MITO, Girish's digital AI companion. I inhabit this cosmic space to help you navigate his portfolio. Ask me about his projects, skills, or experience!",
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    if (!textToSend) {
      setInputValue("");
    }

    const userMsg: Message = {
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const replyText = await getMitoResponse(text, messages);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "mito",
          text: replyText,
          timestamp: new Date(),
        },
      ]);
      setHasNewMessage(true);
    } catch (error) {
      setIsTyping(false);
      console.error(error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const suggestedQuestions = [
    "Who is Girish?",
    "Show his projects",
    "What are his skills?",
    "Tell me about MITO",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans pointer-events-auto">
      <AnimatePresence>
        {/* Floating Moon Orb (Collapsed State) */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[#0c0c1e] to-[#040409] border border-white/10 shadow-[0_0_20px_rgba(124,140,248,0.2),inset_0_0_12px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(124,140,248,0.4),inset_0_0_15px_rgba(255,255,255,0.1)] group transition-all duration-300"
          >
            {/* Breathing Ambient Glow */}
            <div className="absolute inset-0 rounded-full bg-[#7c8cf8]/10 blur-md group-hover:bg-[#7c8cf8]/25 transition-all duration-300 animate-pulse" />

            {/* Orbiting Staggered Particles */}
            <div className="absolute inset-0 rounded-full pointer-events-none">
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full bg-[#b8c4ff] shadow-[0_0_8px_#7c8cf8] -translate-x-1/2 animate-[mito-orbit_8s_linear_infinite]" style={{ transformOrigin: "0 32px" }} />
              <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-[#7c8cf8] shadow-[0_0_6px_#7c8cf8] -translate-x-1/2 animate-[mito-orbit_12s_linear_infinite_reverse]" style={{ transformOrigin: "0 32px", animationDelay: "-2s" }} />
            </div>

            {/* Glowing Waning Gibbous Moon SVG inside the Orb */}
            <svg
              className="w-7 h-7 text-[#e0e0e8] group-hover:text-white transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M 12,3 A 9,9 0 0 0 12,21 A 4.5,9 0 0 0 12,3 Z"
              />
            </svg>

            {/* Subtle Pulse Badge if unread / starting */}
            {hasNewMessage && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#7c8cf8] border-2 border-[#040409] animate-bounce" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Compact elegant chat interface (Expanded State) */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[360px] md:w-[380px] h-[520px] max-h-[85vh] rounded-2xl flex flex-col bg-[#08080f]/95 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(124,140,248,0.15)] backdrop-blur-xl overflow-hidden"
          >
            {/* Elegant Header with Animated Holographic AI Face Fragment */}
            <div className="relative px-5 py-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#0c0c1e] to-[#08080f]">
              <div className="absolute inset-0 bg-[#7c8cf8]/5 pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10">
                {/* Holographic AI Silhouette Avatar */}
                <div className="relative w-10 h-10 rounded-full border border-[#7c8cf8]/30 flex items-center justify-center bg-black/40 overflow-hidden shadow-[0_0_12px_rgba(124,140,248,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#7c8cf8]/20 to-transparent animate-pulse" />
                  
                  {/* Glowing Ring */}
                  <div className="absolute inset-0.5 rounded-full border border-dashed border-[#7c8cf8]/40 animate-[spin_10s_linear_infinite]" />

                  {/* Minimal Holographic Face Contour Fragment SVG */}
                  <svg className="w-6 h-6 text-[#7c8cf8]/80 animate-pulse" viewBox="0 0 100 100" fill="currentColor">
                    {/* Celestial orbits and abstract facial fragments */}
                    <circle cx="50" cy="42" r="1.5" className="fill-white" />
                    <circle cx="42" cy="45" r="1" className="fill-[#b8c4ff]" />
                    <circle cx="58" cy="45" r="1" className="fill-[#b8c4ff]" />
                    <path d="M42 58 Q50 63 58 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M25 50 Q50 35 75 50 Q50 38 25 50" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
                    <path d="M30 65 A 25 25 0 0 1 70 65" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="2 3" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-[#e0e0e8] font-serif text-base tracking-wide flex items-center gap-1.5">
                    MITO
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                  </h3>
                  <p className="text-[10px] text-[#666680] uppercase tracking-widest font-medium">Portfolio Companion</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setHasNewMessage(false);
                }}
                className="relative z-10 w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-[#666680] hover:text-[#e0e0e8] hover:bg-white/5 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages Log */}
            <div
              ref={chatContainerRef}
              className="flex-grow overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#18182f] text-[#e0e0e8] border border-[#7c8cf8]/20 shadow-[0_2px_8px_rgba(124,140,248,0.05)]"
                        : "bg-white/[0.03] text-[#cccccc] border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing Animation dots */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7c8cf8] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7c8cf8] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7c8cf8] animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested quick links (Only shown if history is low to welcome them) */}
            {messages.length <= 1 && (
              <div className="px-5 pb-3">
                <p className="text-[10px] text-[#666680] uppercase tracking-wider mb-2 font-medium">Ask about...</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[#9999aa] hover:text-white hover:border-[#7c8cf8]/40 hover:bg-[#7c8cf8]/5 transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Message Box */}
            <div className="p-4 border-t border-white/5 bg-black/20 flex gap-2 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask MITO about Girish's work..."
                className="flex-grow bg-white/[0.03] border border-white/5 rounded-full px-4 py-2.5 text-sm text-[#e0e0e8] placeholder-[#555566] focus:outline-none focus:border-[#7c8cf8]/35 transition-all"
              />
              <button
                onClick={() => handleSend()}
                className="w-10 h-10 rounded-full bg-[#7c8cf8]/10 border border-[#7c8cf8]/30 flex items-center justify-center text-[#7c8cf8] hover:bg-[#7c8cf8] hover:text-black transition-all duration-200"
              >
                <svg className="w-4 h-4 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
