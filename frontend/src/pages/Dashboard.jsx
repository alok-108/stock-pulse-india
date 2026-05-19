import React, { useState } from 'react';
import TrendingBar from '../components/TrendingBar';
import PreMarketBrief from '../components/PreMarketBrief';
import NewsFeed from '../components/NewsFeed';
import FII_DII_Card from '../components/FII_DII_Card';
import FOMOMeter from '../components/FOMOMeter';
import WhaleActivity from '../components/WhaleActivity';
import ChatWidget from '../components/ChatWidget';
import StockModal from '../components/StockModal';

function Dashboard() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [feedTab, setFeedTab] = useState('all'); // all / filings

  const handleSelectCompany = (sym) => {
    setSelectedStock(sym);
  };

  const handleCloseModal = () => {
    setSelectedStock(null);
  };

  return (
    <div className="flex flex-col gap-6 select-none pb-12">
      {/* Dynamic top ticker trending bar */}
      <TrendingBar onSelectCompany={handleSelectCompany} />

      {/* Main Grid: Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Columns (2/3 width) - Focus Content: Market Briefing and News Feeds */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <PreMarketBrief />
          
          {/* Custom Tabs for News Feed filter */}
          <div className="bg-[#0d1421]/60 border border-[#1e2a3e] rounded-xl p-1.5 flex gap-1 w-full max-w-sm">
            <button
              onClick={() => setFeedTab('all')}
              className={`flex-1 py-2 text-xs font-bold font-['Outfit'] rounded-lg tracking-wide uppercase transition-all ${
                feedTab === 'all'
                  ? 'bg-emerald-500 text-black shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Signals
            </button>
            <button
              onClick={() => setFeedTab('filings')}
              className={`flex-1 py-2 text-xs font-bold font-['Outfit'] rounded-lg tracking-wide uppercase transition-all ${
                feedTab === 'filings'
                  ? 'bg-emerald-500 text-black shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Corporate Filings
            </button>
          </div>

          <NewsFeed activeTab={feedTab} onSelectCompany={handleSelectCompany} />
        </div>

        {/* Right Column (1/3 width) - Side widgets: FII/DII, FOMO, Block Deals */}
        <div className="flex flex-col gap-6">
          <FII_DII_Card />
          <FOMOMeter onSelectCompany={handleSelectCompany} />
          <WhaleActivity onSelectCompany={handleSelectCompany} />
        </div>

      </div>

      {/* Floating terminal bot interaction widget */}
      <ChatWidget />

      {/* Interactive Stock report details popup */}
      {selectedStock && (
        <StockModal symbol={selectedStock} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Dashboard;
