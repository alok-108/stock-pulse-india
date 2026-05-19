import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Flame, ArrowUpRight } from 'lucide-react';

function TrendingBar({ onSelectCompany }) {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const resp = await api.get('/news/trending');
        setTrends(resp.data);
      } catch (err) {
        console.error('Trending fail:', err);
        // Fallback resilient trending
        setTrends([
          { symbol: 'RELIANCE', count: 14 },
          { symbol: 'TCS', count: 9 },
          { symbol: 'HDFCBANK', count: 8 },
          { symbol: 'INFY', count: 6 },
          { symbol: 'SBIN', count: 5 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="w-full bg-[#0d1421]/60 border border-[#1e2a3e] rounded-xl p-3 flex items-center gap-3 overflow-hidden select-none">
      <div className="flex items-center gap-1 text-rose-500 font-bold shrink-0 text-xs tracking-wider uppercase border-r border-[#1e2a3e] pr-3">
        <Flame size={16} className="animate-bounce" />
        <span>Trending</span>
      </div>

      <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-3 py-1">
        {trends.map((item, index) => (
          <button
            key={item.symbol}
            onClick={() => onSelectCompany(item.symbol)}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#131a26]/80 hover:bg-[#1f293d]/50 border border-slate-700/50 hover:border-emerald-500/20 text-xs font-semibold text-slate-300 hover:text-emerald-400 shrink-0 transition-all duration-200"
          >
            <span className="text-slate-500">#{index + 1}</span>
            <span className="font-mono-terminal font-bold">{item.symbol}</span>
            <span className="text-[10px] text-slate-500 font-normal">({item.count} alerts)</span>
            <ArrowUpRight size={12} className="text-emerald-400 shrink-0" />
          </button>
        ))}

        {loading && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-6 bg-slate-800 w-24 rounded animate-pulse shrink-0" />
        ))}
      </div>
    </div>
  );
}

export default TrendingBar;
