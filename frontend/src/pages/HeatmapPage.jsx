import React from 'react';
import SectorHeatmap from '../components/SectorHeatmap';
import { Info, BarChart2 } from 'lucide-react';

function HeatmapPage() {
  return (
    <div className="flex flex-col gap-6 select-none pb-12 animate-fade-in">
      {/* Intro Header */}
      <div className="p-5 rounded-xl bg-[#131a26]/40 backdrop-blur-md border border-[#1e2a3e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <BarChart2 size={20} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-black font-['Outfit'] tracking-wide">Sector Sentiment Heatmap</h2>
            <span className="text-xs text-slate-400">Aggregating real-time stock sentiments across core Nifty index categories</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-400 max-w-sm">
          <Info size={14} className="text-emerald-400 shrink-0" />
          <span>Colors reflect normalized news and regulatory filing sentiment calculated by Google Gemini over the last 24 hours.</span>
        </div>
      </div>

      {/* Primary Heatmap Grid */}
      <SectorHeatmap />
    </div>
  );
}

export default HeatmapPage;
