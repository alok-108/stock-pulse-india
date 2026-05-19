import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ShieldAlert } from 'lucide-react';

// Shared event emitter pattern for cross-component communication (watchlist filters news)
export const filterEventEmitter = {
  listeners: [],
  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  },
  emit(symbol) {
    this.listeners.forEach(fn => fn(symbol));
  }
};

function Watchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'SBIN'];
  });
  
  const [newTicker, setNewTicker] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const handleAddTicker = (e) => {
    e.preventDefault();
    const clean = newTicker.trim().toUpperCase();
    if (clean && !watchlist.includes(clean)) {
      setWatchlist([...watchlist, clean]);
      setNewTicker('');
    }
  };

  const handleRemoveTicker = (sym, e) => {
    e.stopPropagation(); // Avoid triggering filter on click
    setWatchlist(watchlist.filter((item) => item !== sym));
    if (activeFilter === sym) {
      handleFilterClick(null);
    }
  };

  const handleFilterClick = (sym) => {
    const nextFilter = activeFilter === sym ? null : sym;
    setActiveFilter(nextFilter);
    filterEventEmitter.emit(nextFilter);
  };

  return (
    <div className="py-4 flex flex-col h-full select-none">
      <h3 className="font-['Outfit'] font-bold text-xs tracking-wider text-slate-400 uppercase mb-3 flex items-center gap-2">
        <ShieldAlert size={14} className="text-emerald-500" /> Watchlist
      </h3>

      {/* Input Box */}
      <form onSubmit={handleAddTicker} className="flex gap-1 mb-4">
        <input
          type="text"
          value={newTicker}
          onChange={(e) => setNewTicker(e.target.value)}
          placeholder="Add Ticker..."
          className="flex-1 bg-slate-900 border border-slate-700/60 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-black p-1 rounded shrink-0 transition-colors"
        >
          <Plus size={14} />
        </button>
      </form>

      {/* Watchlist Items */}
      <div className="flex flex-col gap-1.5 max-h-[300px] overflow-y-auto">
        {watchlist.map((sym) => {
          const isActive = activeFilter === sym;
          return (
            <div
              key={sym}
              onClick={() => handleFilterClick(sym)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border text-xs transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/40 text-slate-300'
              }`}
            >
              <span className="font-semibold tracking-wide font-mono-terminal">{sym}</span>
              <button
                onClick={(e) => handleRemoveTicker(sym, e)}
                className="text-slate-500 hover:text-rose-500 p-0.5 transition-colors"
              >
                <Trash2 size={12} />
              </button>
            </div>
          );
        })}
        {watchlist.length === 0 && (
          <span className="text-xs text-slate-500 italic text-center py-4">No stocks tracked</span>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
