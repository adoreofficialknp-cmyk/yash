import React, { useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CaseStudyDetail from "./CaseStudyDetail";
import { MessageSquare, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility for Tailwind classes */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- CUSTOM CURSOR COMPONENT ---
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dotRef.current && outlineRef.current) {
        const { clientX, clientY } = e;
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
        outlineRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hidden md:block">
      <div 
        ref={dotRef}
        className="cursor-dot" 
        style={{ left: 0, top: 0 }} 
      />
      <div 
        ref={outlineRef}
        className="cursor-outline" 
        style={{ left: 0, top: 0 }} 
      />
    </div>
  );
};

/** AI Chat Widget Component */
const AIChatWidget = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { role: "bot", text: "Hi! I'm Yash's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", text: "That sounds interesting! Yash specializes in digital powerhouses. Would you like to book a consultation?" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="glass-dark w-80 h-96 mb-4 rounded-3xl overflow-hidden flex flex-col shadow-2xl border-white/10"
          >
            <div className="p-4 bg-gradient-to-r from-neon-purple to-neon-blue flex justify-between items-center">
              <span className="font-display font-bold text-sm">AI Assistant</span>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={cn("max-w-[80%] p-3 rounded-2xl text-xs", m.role === "bot" ? "bg-white/10 self-start" : "bg-neon-purple/20 self-end ml-auto")}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/5 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask something..."
                className="flex-1 bg-white/5 rounded-full px-4 py-2 text-xs outline-none focus:ring-1 ring-neon-purple"
              />
              <button onClick={handleSend} className="bg-neon-purple p-2 rounded-full"><ChevronRight size={16} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-neon-purple to-neon-blue rounded-full flex items-center justify-center shadow-lg shadow-neon-purple/20 hover:scale-110 transition-transform"
      >
        <MessageSquare className="text-white" />
      </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <CustomCursor />
      <AIChatWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<CaseStudyDetail />} />
      </Routes>
    </Router>
  );
}
