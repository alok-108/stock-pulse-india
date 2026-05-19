import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function SentimentChart({ data }) {
  // Custom interactive tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      const scoreLabel = val >= 0.7 
        ? '🔥 Strong Bullish' 
        : val >= 0.5 
          ? '🟢 Bullish' 
          : val >= 0.45 
            ? '🟡 Neutral / Sideways' 
            : '🚨 Bearish';
            
      return (
        <div className="bg-slate-900 border border-slate-700/60 p-2.5 rounded-lg shadow-xl text-[10px] font-mono-terminal">
          <p className="text-slate-400 font-bold mb-1">{label}</p>
          <p className="text-emerald-400">Score: {val}</p>
          <p className="text-slate-200 mt-1 font-semibold">{scoreLabel}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-48 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f293d/30" vertical={false} />
          
          <XAxis 
            dataKey="date" 
            stroke="#475569" 
            tick={{ fontSize: 9, fontFamily: 'monospace' }} 
            tickLine={false}
          />
          
          <YAxis 
            domain={[0.0, 1.0]} 
            stroke="#475569" 
            tick={{ fontSize: 9, fontFamily: 'monospace' }} 
            tickLine={false}
            ticks={[0.0, 0.25, 0.5, 0.75, 1.0]}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Line 
            type="monotone" 
            dataKey="sentiment" 
            stroke="#10b981" 
            strokeWidth={3} 
            dot={{ r: 4, stroke: '#090d16', strokeWidth: 1.5, fill: '#10b981' }}
            activeDot={{ r: 6, stroke: '#090d16', strokeWidth: 2, fill: '#34d399' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SentimentChart;
