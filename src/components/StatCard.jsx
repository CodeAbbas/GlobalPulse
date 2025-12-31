import React from 'react';

const StatCard = ({ value, label, highlight }) => (
  <div className={`
    flex flex-col items-center justify-center group relative
    ${highlight ? 'text-amber-400' : 'text-slate-200'}
  `}>
    <div className="text-5xl md:text-7xl font-light font-mono tracking-tighter tabular-nums relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
      {String(value).padStart(2, '0')}
    </div>
    <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-600 mt-4 group-hover:text-amber-500/50 transition-colors">
      {label}
    </div>
    
    {/* Subtle Vertical Line Separator (only visible on md+) */}
    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent last:hidden" />
  </div>
);

export default StatCard;