import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-arabic-gold to-primary flex items-center justify-center shadow-lg">
        <div className="text-white text-2xl font-bold">
          <svg viewBox="0 0 100 100" className="w-16 h-16 fill-current">
            <circle cx="50" cy="30" r="12" />
            <path d="M50 45 L30 65 L35 70 L50 55 L65 70 L70 65 Z" />
            <circle cx="35" cy="75" r="8" />
            <circle cx="65" cy="75" r="8" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Logo;