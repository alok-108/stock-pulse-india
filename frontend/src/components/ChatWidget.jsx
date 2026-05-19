import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import { MessageSquare, X, Send, Bot, ShieldAlert, AlertTriangle } from 'lucide-react';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '🤖 Hello! I am PulseAI, your financial market terminal assistant. Ask me anything about specific stocks (e.g. "TCS", "RELIANCE") to extract verified database reports.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || loading) return;

    // Add user message
    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInputValue('');
    setLoading(true);

    try {
      // Map history to server spec
      const historyPayload = messages
        .filter(m => m.role !== 'assistant' || !m.content.startsWith('🤖'))
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      const resp = await api.post('/chat', {
        message: text,
        history: historyPayload
      });

      setMessages(prev => [...prev, { role: 'assistant', content: resp.data.reply }]);
    } catch (err) {
      console.error('Chat failed:', err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '⚠️ Terminal connection error. Database AI engine failed to respond. (Verify backend configuration)' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-40 select-none">
      
      {/* Floating Action Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 animate-bounce"
          aria-label="Open PulseAI Chat Terminal"
          id="chat-toggle-widget"
        >
          <MessageSquare size={22} className="md:size-24 shrink-0" />
        </button>
      )}

      {/* Expandable Chat window container */}
      {isOpen && (
        <div className="w-[320px] sm:w-[380px] h-[450px] bg-[#0d1421] border border-[#1e2a3e] rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-fade-in">
          
          {/* Header */}
          <div className="p-4 border-b border-[#1e2a3e] bg-[#131A26]/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Bot size={16} className="text-emerald-400" />
              </div>
              <div>
                <span className="font-['Outfit'] font-bold text-xs tracking-wide block">PulseAI Terminal</span>
                <span className="text-[9px] text-slate-500 flex items-center gap-0.5">
                  <ShieldAlert size={8} /> Verified DB Context Grounding
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded bg-slate-800/40 hover:bg-slate-800 text-slate-400"
            >
              <X size={14} />
            </button>
          </div>

          {/* Messages Body */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 font-mono-terminal text-[11px] leading-relaxed max-h-[340px]"
          >
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`p-2.5 rounded-lg max-w-[85%] select-text ${
                  m.role === 'user'
                    ? 'bg-slate-800 text-slate-100 border border-slate-700/50 self-end'
                    : 'bg-[#131a26] text-slate-300 border border-emerald-500/10 self-start shadow-sm'
                }`}
              >
                {m.content}
              </div>
            ))}
            
            {loading && (
              <div className="p-2.5 rounded-lg bg-[#131a26] border border-emerald-500/10 text-emerald-400 self-start animate-pulse">
                Thinking and fetching database context...
              </div>
            )}
          </div>

          {/* Anti-Hallucination warning ticker */}
          <div className="bg-amber-500/5 border-t border-b border-amber-500/10 px-3 py-1 flex items-center gap-1.5 text-[9px] text-amber-500">
            <AlertTriangle size={10} className="shrink-0" />
            <span>Anti-Hallucination Active: Verified records search constrained.</span>
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSubmit} className="p-2.5 border-t border-[#1e2a3e] bg-[#0d1421] flex gap-1.5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about TCS, RELIANCE..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:border-emerald-500 font-mono-terminal"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-black px-3 rounded shrink-0 transition-colors flex items-center justify-center"
            >
              <Send size={12} />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}

export default ChatWidget;
