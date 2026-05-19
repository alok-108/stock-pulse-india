import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import HeatmapPage from './pages/HeatmapPage';
import ContentEnginePage from './pages/ContentEnginePage';

// Theme Context creation
export const ThemeContext = createContext({
  darkMode: true,
  toggleTheme: () => {}
});

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default dark
  });

  useEffect(() => {
    const rootClass = window.document.documentElement.classList;
    if (darkMode) {
      rootClass.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      rootClass.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/heatmap" element={<HeatmapPage />} />
            <Route path="/content-engine" element={<ContentEnginePage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
