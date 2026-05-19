import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Flame, Info } from 'lucide-react';

function FOMOMeter({ onSelectCompany }) {
  const [fomo, setFomo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFomo = async () => {
      try {
        const resp = await api.get('/market/fomo');
        setFomo(resp.data);
      } catch (err) {
        console.error('FOMO fetch failed:', err);
        // Fallback mock FOMO tickers
        setFomo([
          { symbol: 'RELIANCE', mentions: 18 },
          { symbol: 'TCS', mentions: 12 },
          { symbol: 'HDFCBANK', mentions: 10 },
          { symbol: 'SBIN', mentions: 8 },
          { symbol: 'INFY', mentions: 5 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchFomo();
  }, []);

  const maxMentions = fomo.length > 0 ? Math.max(...fomo.map(f => f.mentions)) : 10;

  return (
    <div className="w-full bg-[#131a26]/40 backdrop-blur-md border border-[#1e2a3e] rounded-xl p-5 select-none hover:border-emerald-500/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-extrabold font-['Outfit'] tracking-wide text-slate-100 flex items-center gap-2 uppercase">
          <Flame size={18} className="text-rose-500 animate-bounce" />
          Retail FOMO Meter
        </h3>
        
        {/* Help Info Tooltip */}
        <div className="relative group">
          <Info size={14} className="text-slate-500 hover:text-slate-300 cursor-pointer" />
          <div className="absolute right-0 bottom-6 hidden group-hover:block w-48 p-2 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-400 leading-normal z-10 shadow-lg">
            Tracks ticker mention counts on Reddit's r/IndianStreetBets to evaluate retail momentum levels.
          </div>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse flex flex-col gap-3 py-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-6 bg-slate-800 rounded w-full" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {fomo.map((item) => {
            // Compute percentage width for bar chart fill
            const pct = Math.round((item.mentions / maxMentions) * 100);
            return (
              <div 
                key={item.symbol} 
                className="flex items-center justify-between gap-3 cursor-pointer"
                onClick={() => onSelectCompany(item.symbol)}
              >
                {/* Symbol Chip */}
                <span className="w-20 font-mono-terminal font-bold text-xs text-slate-200 hover:text-emerald-400 transition-colors">
                  {item.symbol}
                </span>

                {/* Progress bar */}
                <div className="flex-1 h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-600 to-rose-500 rounded-full transition-all duration-500" 
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Mentions counter */}
                <div className="flex items-center gap-1 shrink-0 w-16 justify-end text-xs font-semibold text-slate-300">
                  <span>{item.mentions}</span>
                  <span className="text-[10px] text-slate-500">mentions</span>
                </div>
              </div>
            );
          })}
          
          {fomo.length === 0 && (
            <span className="text-xs text-slate-500 italic text-center py-4">No retail metrics logged</span>
          )}
        </div>
      )}
    </div>
  );
}

export default FOMOMeter;
