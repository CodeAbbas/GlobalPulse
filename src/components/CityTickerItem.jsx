import React, { useState, useEffect } from 'react';

const CityTickerItem = ({ city }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const cityTimeStr = now.toLocaleString('en-US', { timeZone: city.region, hour12: false });
      const cityTime = new Date(cityTimeStr);
      const isPast = cityTime.getFullYear() >= 2026 || (cityTime.getMonth() === 0 && cityTime.getDate() === 1);
      
      if (isPast) {
        setStatus({ done: true });
      } else {
        const target = new Date(cityTime);
        target.setHours(24, 0, 0, 0); 
        const diff = Math.ceil((target - cityTime) / (1000 * 60 * 60));
        setStatus({ done: false, diff });
      }
    };
    check();
  }, [city.region]);

  if (!status) return null;

  return (
    <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{city.name}</span>
      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
        status.done 
        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' 
        : 'border-slate-700 text-slate-500'
      }`}>
        {status.done ? '2026' : `-${status.diff}h`}
      </span>
    </div>
  );
};

export default CityTickerItem;