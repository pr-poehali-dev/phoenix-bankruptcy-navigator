const PhoenixLogo = ({ className = "", size = 64 }: { className?: string; size?: number }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="phoenixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(199, 89%, 48%)" />
          <stop offset="100%" stopColor="hsl(45, 100%, 51%)" />
        </linearGradient>
      </defs>
      
      {/* Верхние крылья - левое */}
      <path 
        d="M 50 60 Q 30 40, 20 30 Q 25 35, 35 45 Q 45 55, 50 60 Z" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M 60 70 Q 40 50, 30 35 Q 35 40, 50 55 Q 60 65, 60 70 Z" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Верхние крылья - правое */}
      <path 
        d="M 150 60 Q 170 40, 180 30 Q 175 35, 165 45 Q 155 55, 150 60 Z" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M 140 70 Q 160 50, 170 35 Q 165 40, 150 55 Q 140 65, 140 70 Z" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Голова и шея */}
      <path 
        d="M 100 50 Q 95 45, 90 40 Q 92 38, 95 40 Q 100 35, 105 40 Q 108 38, 110 40 Q 105 45, 100 50 Z" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Нижние крылья - левое */}
      <path 
        d="M 70 120 Q 40 110, 20 100 Q 30 105, 50 115 Q 65 120, 70 120 Z" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M 80 130 Q 50 125, 30 115 Q 40 120, 60 128 Q 75 132, 80 130 Z" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Нижние крылья - правое */}
      <path 
        d="M 130 120 Q 160 110, 180 100 Q 170 105, 150 115 Q 135 120, 130 120 Z" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M 120 130 Q 150 125, 170 115 Q 160 120, 140 128 Q 125 132, 120 130 Z" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Огненные перья по центру - левая сторона */}
      <path 
        d="M 75 140 L 60 155 L 70 150 Z" 
        fill="url(#phoenixGradient)"
      />
      <path 
        d="M 85 145 L 70 160 L 80 155 Z" 
        fill="url(#phoenixGradient)"
      />
      <path 
        d="M 95 148 L 82 163 L 90 158 Z" 
        fill="url(#phoenixGradient)"
      />
      
      {/* Огненные перья по центру - правая сторона */}
      <path 
        d="M 125 140 L 140 155 L 130 150 Z" 
        fill="url(#phoenixGradient)"
      />
      <path 
        d="M 115 145 L 130 160 L 120 155 Z" 
        fill="url(#phoenixGradient)"
      />
      <path 
        d="M 105 148 L 118 163 L 110 158 Z" 
        fill="url(#phoenixGradient)"
      />
      
      {/* Хвост - переплетенная форма */}
      <path 
        d="M 95 160 Q 90 170, 88 180 Q 92 175, 95 170 Q 98 165, 100 160" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="5" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M 105 160 Q 110 170, 112 180 Q 108 175, 105 170 Q 102 165, 100 160" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="5" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M 88 180 Q 85 190, 83 200" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M 112 180 Q 115 190, 117 200" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M 100 165 L 100 195" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="6" 
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PhoenixLogo;
