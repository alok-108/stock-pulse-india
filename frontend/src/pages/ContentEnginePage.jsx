import React from 'react';
import ReelScriptPanel from '../components/ReelScriptPanel';
import { Video, Award, Star } from 'lucide-react';

function ContentEnginePage() {
  const videoTips = [
    {
      title: "Pacing & Delivery",
      desc: "Deliver lines with high energy and speed. Keep the audio track punching with zero dead air. Use aggressive caption fonts."
    },
    {
      title: "Visual Overlays",
      desc: "Overlay screen recordings of Stock Pulse India confluence dashboards when mentioning TCS or Reliance to establish clinical authority."
    },
    {
      title: "Audio Backing",
      desc: "Back the Hinglish voiceover with deep, ticking electronic background loops or trending high-tempo synthesizer scores to drive completion rates."
    }
  ];

  return (
    <div className="flex flex-col gap-6 select-none pb-12 animate-fade-in">
      {/* Intro Header */}
      <div className="p-5 rounded-xl bg-[#131a26]/40 backdrop-blur-md border border-[#1e2a3e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Video size={20} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-black font-['Outfit'] tracking-wide">Automated AI Content Reels</h2>
            <span className="text-xs text-slate-400">Generate viral Hinglish scripts matching database market triggers instantly</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Script Panel */}
        <div className="lg:col-span-2">
          <ReelScriptPanel />
        </div>

        {/* Right Side: Pro Video Tips */}
        <div className="p-5 rounded-xl bg-[#131a26]/40 border border-[#1e2a3e] flex flex-col gap-4">
          <h3 className="text-sm font-extrabold font-['Outfit'] tracking-wide text-slate-100 flex items-center gap-2 uppercase">
            <Star size={16} className="text-emerald-400 animate-pulse" />
            Viral Production Checklist
          </h3>

          <div className="flex flex-col gap-4 text-xs leading-relaxed">
            {videoTips.map((tip, index) => (
              <div key={index} className="p-3 bg-[#0d1421]/60 border border-slate-800 rounded-lg flex flex-col gap-1">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Award size={12} /> {tip.title}
                </span>
                <p className="text-slate-400">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentEnginePage;
