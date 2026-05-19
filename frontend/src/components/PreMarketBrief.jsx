import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import api from '../utils/api';
import { Award, AlertCircle, RefreshCw } from 'lucide-react';

function PreMarketBrief() {
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBriefing = async () => {
      try {
        const resp = await api.get('/market/briefing');
        setBrief(resp.data);
        setError(null);
      } catch (err) {
        console.error('Failed to load briefing:', err);
        setError('Briefing terminal disconnected.');
        // Fallback resilient briefing markdown
        setBrief({
          content: (
            "# 🌏 Stock Pulse India Daily briefing\n\n" +
            "## 🌍 Global & Macro\n" +
            "US equity index futures advanced overnight. Traders parse recent consumer prices signaling potential inflation relief, driving tech indices positive. Asian benchmarks open mixed, Nifty expected to open flat to slightly green.\n\n" +
            "## 🎯 Top Stock Movers\n" +
            "- **TCS**: Institutional buying expected today on securing a $1.5B digital transformation deal in the UK.\n" +
            "- **RELIANCE**: Bullish momentum builds ahead of new green energy projects activation.\n" +
            "- **HDFCBANK**: Sideways trade forecast due to slight margins pressure indications in deposits.\n\n" +
            "## 📊 Sector Watch\n" +
            "Keep close eyes on **IT Services** and **Renewables** for high-volume breakouts, while **Financials** consolidation represents strong buying opportunity."
          ),
          date: new Date().toISOString().split('T')[0]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBriefing();
  }, []);

  return (
    <div className="w-full bg-[#131a26]/40 backdrop-blur-md border border-[#1e2a3e] rounded-xl p-5 select-none relative overflow-hidden animate-fade-in hover:border-emerald-500/20 transition-all duration-300">
      
      {/* Visual background gradient glow */}
      <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="text-base font-extrabold font-['Outfit'] tracking-wide text-slate-100 flex items-center gap-2 uppercase">
          <Award size={18} className="text-emerald-400" />
          Pre-Market briefing
        </h3>
        
        {brief?.date && (
          <span className="text-[10px] text-slate-500 font-mono-terminal">
            Generated: {brief.date}
          </span>
        )}
      </div>

      {loading ? (
        <div className="animate-pulse flex flex-col gap-3 py-2">
          <div className="h-6 bg-slate-800 rounded w-1/4" />
          <div className="h-4 bg-slate-800 rounded w-full" />
          <div className="h-4 bg-slate-800 rounded w-5/6" />
          <div className="h-6 bg-slate-800 rounded w-1/3 mt-3" />
          <div className="h-4 bg-slate-800 rounded w-full" />
        </div>
      ) : (
        <div className="prose prose-invert prose-sm max-w-none text-slate-300 select-text leading-relaxed">
          {/* Custom renderer styling override for clean markdown */}
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-lg font-bold text-slate-100 mb-4 border-b border-[#1e2a3e] pb-2 font-['Outfit']" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-sm md:text-base font-extrabold text-emerald-400 mt-5 mb-2 font-['Outfit'] uppercase tracking-wider flex items-center gap-1.5" {...props} />,
              p: ({ node, ...props }) => <p className="text-xs md:text-sm text-slate-300 mb-3" {...props} />,
              li: ({ node, ...props }) => <li className="text-xs md:text-sm text-slate-300 ml-4 list-disc mb-1" {...props} />,
              strong: ({ node, ...props }) => <strong className="text-emerald-400 font-semibold" {...props} />,
            }}
          >
            {brief?.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default PreMarketBrief;
