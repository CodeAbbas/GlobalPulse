import React, { useState, useEffect } from 'react';
import { Globe, MapPin, Sparkles } from 'lucide-react';

// Import separated components and data
// Ensure these files exist in your src folder structure
import SEO from './components/SEO';
import Background from './components/Background';
import StatCard from './components/StatCard';
import CityTickerItem from './components/CityTickerItem';
import { calculateTimeLeft } from './utils/time';
import { MAJOR_CITIES } from './data/cities';

// Ensure your styles are in src/index.css
import './index.css';

export default function App() {
  const [userTimezone, setUserTimezone] = useState('UTC');
  const [timeLeft, setTimeLeft] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimezone(detectedZone);
    } catch (e) {
      console.warn("Using UTC fallback");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(userTimezone));
    }, 1000);
    return () => clearInterval(timer);
  }, [userTimezone, mounted]);

  if (!mounted || !timeLeft) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-amber-500/50 font-mono text-xs tracking-[0.5em] animate-pulse">
      SYNCHRONIZING...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-amber-500/30 overflow-hidden relative flex flex-col">
      <SEO location={userTimezone} />
      <Background />

      {/* HEADER */}
      <header className="relative z-20 flex justify-between items-center px-6 py-8">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-amber-500/80" />
          <h1 className="text-sm font-bold tracking-[0.3em] text-slate-300">
            GLOBAL<span className="text-amber-500">PULSE</span>
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-medium tracking-wider text-amber-500/80">LIVE</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-20 flex-grow flex flex-col justify-center items-center px-4 w-full max-w-7xl mx-auto">
        
        {/* Location Badge */}
        <div className="mb-8 flex items-center gap-2 text-xs font-medium tracking-widest text-slate-500 uppercase animate-fade-in-up">
           <MapPin className="w-3 h-3 text-amber-500/60" />
           <span>{userTimezone.replace(/_/g, ' ')}</span>
        </div>

        {/* Massive Title */}
        <h2 className="text-[12vw] sm:text-[14vw] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-2xl animate-fade-in-up delay-100 select-none">
          {timeLeft.completed ? "2026" : "2026"}
        </h2>
        
        {/* Subtitle / Status */}
        <p className="text-lg sm:text-2xl font-light tracking-[0.5em] text-amber-500/80 mb-16 uppercase animate-fade-in-up delay-200">
          {timeLeft.completed ? "Has Arrived" : "Approaching"}
        </p>

        {/* Minimalist Countdown Grid */}
        {!timeLeft.completed ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-8 border-t border-white/10 pt-12 animate-fade-in-up delay-300">
             <StatCard value={timeLeft.days} label="Days" />
             <StatCard value={timeLeft.hours} label="Hours" />
             <StatCard value={timeLeft.minutes} label="Minutes" />
             <StatCard value={timeLeft.seconds} label="Seconds" highlight />
          </div>
        ) : (
           <div className="flex flex-col items-center animate-fade-in-up">
             <Sparkles className="w-12 h-12 text-amber-400 mb-4 animate-spin-slow" />
             <p className="text-slate-400 text-sm tracking-widest">Make this year count.</p>
           </div>
        )}
      </main>

      {/* FOOTER TICKER */}
      <footer className="relative z-20 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="w-full overflow-hidden py-4">
          <div className="flex items-center gap-8 animate-ticker px-4 min-w-max">
            {MAJOR_CITIES.map((city) => (
              <CityTickerItem key={city.name} city={city} />
            ))}
             {MAJOR_CITIES.map((city) => (
              <CityTickerItem key={`${city.name}-2`} city={city} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}