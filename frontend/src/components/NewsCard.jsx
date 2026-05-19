import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Award, TrendingUp, TrendingDown, BookOpen, AlertCircle } from 'lucide-react';

function NewsCard({ article, onSelectCompany }) {
  const {
    title,
    summary,
    source,
    company,
    company_name,
    sentiment,
    confidence,
    corporate_action,
    published_at,
    stock_impact
  } = article;

  // Format relative timestamp
  const getRelativeTime = (isoString) => {
    try {
      return formatDistanceToNow(parseISO(isoString), { addSuffix: true });
    } catch (e) {
      return 'just now';
    }
  };

  // Determine sentiment border/badge style
  const isBullish = sentiment === 'positive';
  const isBearish = sentiment === 'negative';
  
  const borderStyle = isBullish 
    ? 'hover:border-emerald-500/30 hover:shadow-emerald-500/5' 
    : isBearish 
      ? 'hover:border-rose-500/30 hover:shadow-rose-500/5' 
      : 'hover:border-slate-500/30';

  const badgeColors = isBullish
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    : isBearish
      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      : 'bg-slate-800 text-slate-400 border-slate-700';

  const impactColors = stock_impact === 'likely_up'
    ? 'text-emerald-400 font-semibold'
    : stock_impact === 'likely_down'
      ? 'text-rose-400 font-semibold'
      : 'text-slate-400';

  return (
    <div className={`p-5 rounded-xl bg-[#131A26]/40 backdrop-blur-md border border-[#1e2a3e] flex flex-col justify-between transition-all duration-300 shadow-md ${borderStyle} animate-fade-in hover:-translate-y-0.5`}>
      <div>
        {/* Top badges and metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            {/* Sentiment badge */}
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border tracking-wider uppercase ${badgeColors}`}>
              {sentiment} ({Math.round(confidence * 100)}%)
            </span>
            
            {/* Corporate action tag */}
            {corporate_action && (
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 tracking-wider uppercase flex items-center gap-1">
                <Award size={10} /> Official Filing 📜
              </span>
            )}
          </div>
          
          <span className="text-[10px] text-slate-500 font-mono-terminal">
            {getRelativeTime(published_at)}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-sm md:text-base font-bold font-['Outfit'] text-slate-100 mb-2 leading-snug tracking-wide line-clamp-2 select-text">
          {title}
        </h4>

        {/* Snippet summary */}
        <p className="text-xs md:text-sm text-slate-400 mb-4 leading-relaxed line-clamp-3 select-text">
          {summary}
        </p>
      </div>

      {/* Footer controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1e2a3e]">
        {/* Company ticker trigger chip */}
        <button
          onClick={() => onSelectCompany(company)}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#0d1421] border border-slate-700/50 hover:border-emerald-500/30 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-all duration-200"
        >
          <span className="font-mono-terminal font-bold text-emerald-400">{company}</span>
          <span className="text-[10px] text-slate-500 border-l border-slate-800 pl-1.5 hidden sm:inline">{company_name.split(' ')[0]}</span>
        </button>

        {/* Impact signal indicator */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500">Impact:</span>
          <span className={`flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase ${impactColors}`}>
            {stock_impact === 'likely_up' && <TrendingUp size={14} className="text-emerald-400" />}
            {stock_impact === 'likely_down' && <TrendingDown size={14} className="text-rose-400" />}
            {stock_impact === 'likely_up' ? 'LIKELY UP' : stock_impact === 'likely_down' ? 'LIKELY DOWN' : 'NO CHANGE'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
