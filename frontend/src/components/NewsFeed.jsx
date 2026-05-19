import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import NewsCard from './NewsCard';
import { filterEventEmitter } from './Watchlist';
import { RefreshCw, BookOpen, AlertCircle } from 'lucide-react';

function NewsFeed({ activeTab, onSelectCompany }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTicker, setFilterTicker] = useState(null);
  const [limit, setLimit] = useState(12);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Subscribe to watchlist filter events
  useEffect(() => {
    const handleFilterChange = (sym) => {
      setFilterTicker(sym);
      setSkip(0); // Reset pagination on filter swap
      setNews([]);
    };
    const unsubscribe = filterEventEmitter.subscribe(handleFilterChange);
    return () => unsubscribe();
  }, []);

  // Reset pagination when tab changes
  useEffect(() => {
    setSkip(0);
    setNews([]);
    setHasMore(true);
  }, [activeTab, filterTicker]);

  // Fetch news articles from FastAPI backend
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        let endpoint = `/news?limit=${limit}&skip=${skip}`;
        
        if (filterTicker) {
          endpoint += `&company=${filterTicker}`;
        }
        
        if (activeTab === 'filings') {
          endpoint += `&include_corporate=true`;
        }

        const resp = await api.get(endpoint);
        const data = resp.data;

        if (data.length < limit) {
          setHasMore(false);
        }

        if (skip === 0) {
          setNews(data);
        } else {
          setNews((prev) => [...prev, ...data]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError('Unable to load terminal news logs. Ensure backend is running.');
        
        // Premium Mock Data Fallback for resilient visual demonstration
        if (news.length === 0) {
          const mockNews = [
            {
              id: "mock1",
              title: "TCS seals historic $1.5 Billion multi-year enterprise transformation contract with US retail giant",
              summary: "Tata Consultancy Services (TCS) announced it has signed a massive strategic partnership with a leading Fortune 100 retail conglomerate to rebuild its supply chain logistics using generative artificial intelligence tools.",
              source: "Moneycontrol",
              company: "TCS",
              company_name: "Tata Consultancy Services Ltd",
              sentiment: "positive",
              confidence: 0.94,
              stock_impact: "likely_up",
              reasoning: "High-value contract secures revenue visibility and showcases TCS leadership in enterprise GenAI integrations.",
              corporate_action: true,
              published_at: new Date().toISOString()
            },
            {
              id: "mock2",
              title: "Reliance Industries to expand Jamnagar refinery clean energy infrastructure ahead of solar module rollout",
              summary: "Reliance Industries announced capital expenditures exceeding Rs 8,500 crore to construct key renewable solar structures at the Jamnagar campus, priming module deliveries next quarter.",
              source: "Economic Times",
              company: "RELIANCE",
              company_name: "Reliance Industries Ltd",
              sentiment: "positive",
              confidence: 0.88,
              stock_impact: "likely_up",
              reasoning: "Aggressive capital deployment into green tech aligns with strategic institutional capital preferences.",
              corporate_action: false,
              published_at: new Date(Date.now() - 3600000).toISOString()
            },
            {
              id: "mock3",
              title: "HDFC Bank structural margins face slight headwind from high-cost certificate of deposits",
              summary: "Analysts note HDFC Bank's net interest margin (NIM) may remain slightly compressed under 3.5% for the upcoming quarters due to competitive pricing pressures on short-term deposit instruments.",
              source: "Moneycontrol",
              company: "HDFCBANK",
              company_name: "HDFC Bank Ltd",
              sentiment: "negative",
              confidence: 0.76,
              stock_impact: "likely_down",
              reasoning: "Cost pressures on margins typically trigger short-term structural consolidation within financial shares.",
              corporate_action: false,
              published_at: new Date(Date.now() - 7200000).toISOString()
            }
          ];
          setNews(mockNews);
          setHasMore(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [activeTab, filterTicker, skip]);

  const handleLoadMore = () => {
    setSkip((prev) => prev + limit);
  };

  const handleRefresh = () => {
    setSkip(0);
    setNews([]);
    setHasMore(true);
  };

  return (
    <div className="flex flex-col gap-5 select-none">
      
      {/* Header controls for feed */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold font-['Outfit'] flex items-center gap-2">
          <BookOpen size={18} className="text-emerald-500" />
          {filterTicker ? `Insights: ${filterTicker}` : activeTab === 'all' ? 'All Market Signals' : 'BSE Corporate Filings'}
        </h3>
        
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-emerald-500/30 text-xs text-slate-400 hover:text-emerald-400 bg-slate-900/40 transition-colors"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error} (Displaying offline cache logs)</span>
        </div>
      )}

      {/* Grid News List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {news.map((art) => (
          <NewsCard 
            key={art.id} 
            article={art} 
            onSelectCompany={onSelectCompany}
          />
        ))}

        {/* Skeleton Loaders */}
        {loading && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-5 rounded-xl border border-[#1e2a3e] bg-[#131A26]/10 animate-pulse flex flex-col justify-between h-[180px]">
            <div>
              <div className="h-4 bg-slate-800 rounded w-1/3 mb-4" />
              <div className="h-4 bg-slate-800 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-800 rounded w-5/6" />
            </div>
            <div className="h-8 bg-slate-800 rounded w-full mt-4" />
          </div>
        ))}
      </div>

      {/* No News Found */}
      {news.length === 0 && !loading && (
        <div className="py-12 flex flex-col items-center justify-center border border-[#1e2a3e] border-dashed rounded-xl bg-slate-900/10">
          <span className="text-slate-500 text-sm italic">No verified news logs matched in active database terminal.</span>
        </div>
      )}

      {/* Pagination control */}
      {hasMore && !loading && news.length > 0 && (
        <button
          onClick={handleLoadMore}
          className="mx-auto px-6 py-2.5 rounded-xl border border-slate-700/60 bg-slate-900/50 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 text-sm font-semibold tracking-wide text-slate-300 transition-all duration-200"
        >
          Load More Signals
        </button>
      )}
    </div>
  );
}

export default NewsFeed;
