import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Video, Clock, Activity, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Watchlist from './Watchlist';

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [istTime, setIstTime] = useState('');
  const [marketStatus, setMarketStatus] = useState({ text: 'Closed', color: 'bg-slate-500' });
  const location = useLocation();

  // Update IST Clock
  useEffect(() => {
    const updateTime = () => {
      const utc = new Date();
      // IST is UTC + 5:30
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istDate = new Date(utc.getTime() + istOffset);
      
      const hrs = String(istDate.getUTCHours()).padStart(2, '0');
      const mins = String(istDate.getUTCMinutes()).padStart(2, '0');
      const secs = String(istDate.getUTCSeconds()).padStart(2, '0');
      
      setIstTime(`${hrs}:${mins}:${secs} IST`);

      // Detect market phase
      const day = istDate.getUTCDay(); // 0 = Sun, 6 = Sat
      const hrsMins = istDate.getUTCHours() * 100 + istDate.getUTCMinutes();
      
      if (day === 0 || day === 6) {
        setMarketStatus({ text: 'Market Closed', color: 'bg-rose-500' });
      } else if (hrsMins >= 800 && hrsMins < 915) {
        setMarketStatus({ text: 'Pre-Market', color: 'bg-amber-500' });
      } else if (hrsMins >= 915 && hrsMins < 1530) {
        setMarketStatus({ text: 'Market Live', color: 'bg-emerald-500 market-pulse-dot' });
      } else if (hrsMins >= 1530 && hrsMins < 1700) {
        setMarketStatus({ text: 'Post-Market', color: 'bg-indigo-500' });
      } else {
        setMarketStatus({ text: 'Market Closed', color: 'bg-rose-500' });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <Home size={18} /> },
    { name: 'Sector Heatmap', path: '/heatmap', icon: <BarChart2 size={18} /> },
    { name: 'Content Engine', path: '/content-engine', icon: <Video size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Sidebar for Desktop */}
      <aside className={`fixed md:sticky top-0 h-screen z-30 transition-all duration-300 flex flex-col bg-[#0d1421] border-r border-[#1e2a3e] ${
        sidebarOpen ? 'w-64' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'
      }`}>
        <div className="p-4 border-b border-[#1e2a3e] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
              <Activity size={18} className="text-black font-bold" />
            </div>
            {sidebarOpen && (
              <span className="font-['Outfit'] font-extrabold text-lg bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-wide select-none">
                STOCK PULSE
              </span>
            )}
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'text-slate-400 border-transparent hover:bg-slate-800/40 hover:text-slate-100'
                }`}
              >
                <span className={active ? 'text-emerald-400' : 'text-slate-500'}>{link.icon}</span>
                {sidebarOpen && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Watchlist Section */}
        {sidebarOpen && (
          <div className="flex-1 overflow-y-auto px-4 py-2 border-t border-[#1e2a3e]">
            <Watchlist />
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-[#090d16]/80 backdrop-blur-md border-b border-[#1e2a3e] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300"
            >
              <Menu size={18} />
            </button>
            <h1 className="text-base font-bold font-['Outfit'] hidden sm:block tracking-wide">
              {location.pathname === '/' && 'Terminal Dashboard'}
              {location.pathname === '/heatmap' && 'Sector Sentiment Map'}
              {location.pathname === '/content-engine' && 'Auto Content Reels'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Market Status pulsing badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-[#1e2a3e] text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${marketStatus.color}`} />
              <span className="text-slate-400 hidden lg:inline">Status:</span>
              <span className="font-semibold text-slate-300">{marketStatus.text}</span>
            </div>

            {/* Indian Standard Clock */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-[#1e2a3e] text-xs text-slate-300 font-mono-terminal">
              <Clock size={14} className="text-emerald-400 shrink-0" />
              <span>{istTime}</span>
            </div>

            <ThemeToggle />
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto pb-24 md:pb-6">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tab Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d1421]/90 backdrop-blur-lg border-t border-[#1e2a3e] px-6 py-2 flex items-center justify-around">
        {navLinks.map((link) => {
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium transition-all ${
                active ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={active ? 'text-emerald-400 scale-110' : 'text-slate-500'}>{link.icon}</span>
              <span>{link.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Layout;
