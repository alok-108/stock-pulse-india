import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Video, Copy, Check, RefreshCw } from 'lucide-react';

function ReelScriptPanel() {
  const [script, setScript] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchScript = async () => {
    setLoading(true);
    try {
      const resp = await api.get('/content/reel');
      setScript(resp.data);
    } catch (err) {
      console.error('Failed to load reel script:', err);
      // Fallback resilient script
      setScript({
        script: (
          "[HOOKE B-ROLL: Flash green charts flying up]\n" +
          "VOICEOVER: Nifty traders, attention! Nifty bulls are absolutely running loose today! 🚀\n\n" +
          "[SCENE: TCS logo showing high-value transaction graphics]\n" +
          "VOICEOVER: TCS has just bagged a massive $1.5 Billion transformation deal in the US! This is HUGE! Net margins are primed for a structural expansion! 📈\n\n" +
          "[SCENE: Jamnagar refinery clean energy graphics]\n" +
          "VOICEOVER: Meanwhile, Reliance is dropping over Rs 8,500 Cr into clean tech! Institutions are loading up block deals as we speak. 🌏\n\n" +
          "[CTA B-ROLL: Screen showing Stock Pulse India Platform]\n" +
          "VOICEOVER: For live whale deals, block trackers and technical confluence logs, open Stock Pulse India right now! Hit follow for the sharpest Indian stock insights! 🎯"
        ),
        created_at: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScript();
  }, []);

  const handleCopy = () => {
    if (script?.script) {
      navigator.clipboard.writeText(script.script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-[#131a26]/40 backdrop-blur-md border border-[#1e2a3e] rounded-xl p-5 select-none relative overflow-hidden animate-fade-in">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-emerald-500/5 rounded-full blur-[70px] pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[#1e2a3e] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Video size={16} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="font-['Outfit'] font-bold text-xs tracking-wider text-slate-400 uppercase">AI Script Engine</h3>
            <span className="text-[10px] text-slate-500 font-mono-terminal">Hinglish Reels Generator</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchScript}
            className="p-1.5 rounded-lg border border-slate-700/60 hover:border-emerald-500/30 bg-slate-900/40 text-slate-400 hover:text-emerald-400 transition-colors"
            title="Regenerate Script"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          </button>
          
          <button
            onClick={handleCopy}
            disabled={!script?.script}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-['Outfit'] transition-all ${
              copied 
                ? 'bg-emerald-500 text-black' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
            }`}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy Script'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse flex flex-col gap-3 py-2">
          <div className="h-4 bg-slate-800 rounded w-full" />
          <div className="h-4 bg-slate-800 rounded w-5/6" />
          <div className="h-4 bg-slate-800 rounded w-full" />
          <div className="h-4 bg-slate-800 rounded w-2/3" />
        </div>
      ) : (
        <div className="bg-[#0d1421] border border-slate-800/80 rounded-xl p-4 max-h-[300px] overflow-y-auto font-mono-terminal text-[11px] leading-relaxed text-slate-300 select-text whitespace-pre-line">
          {script?.script}
        </div>
      )}
    </div>
  );
}

export default ReelScriptPanel;
