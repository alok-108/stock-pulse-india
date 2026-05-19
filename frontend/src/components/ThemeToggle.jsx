import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { Sun, Moon } from 'lucide-react';

function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-800/50 dark:bg-slate-900/50 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-slate-700/50 transition-all duration-300 hover:scale-105"
      aria-label="Toggle Theme"
      id="theme-toggle-btn"
    >
      {darkMode ? <Sun size={18} className="animate-pulse" /> : <Moon size={18} />}
    </button>
  );
}

export default ThemeToggle;
