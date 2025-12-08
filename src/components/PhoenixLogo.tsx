const PhoenixLogo = ({ className = "", size = 40 }: { className?: string; size?: number }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="phoenixBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(199, 89%, 48%)" />
          <stop offset="50%" stopColor="hsl(220, 85%, 55%)" />
          <stop offset="100%" stopColor="hsl(45, 100%, 51%)" />
        </linearGradient>
        <linearGradient id="phoenixRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(45, 100%, 60%)" />
          <stop offset="100%" stopColor="hsl(45, 100%, 51%)" />
        </linearGradient>
      </defs>
      
      <circle 
        cx="65" 
        cy="50" 
        r="32" 
        stroke="url(#phoenixRingGradient)" 
        strokeWidth="3.5" 
        fill="none"
        opacity="0.9"
      />
      
      <path 
        d="M 30 25 Q 35 18, 40 15 L 42 20 Q 38 23, 35 28 Z" 
        fill="url(#phoenixBodyGradient)"
      />
      <path 
        d="M 35 30 Q 38 22, 42 18 L 44 23 Q 41 28, 38 33 Z" 
        fill="url(#phoenixBodyGradient)"
      />
      <path 
        d="M 40 35 Q 42 27, 45 22 L 47 27 Q 45 32, 43 37 Z" 
        fill="url(#phoenixBodyGradient)"
      />
      <path 
        d="M 45 40 Q 46 32, 48 27 L 50 32 Q 49 37, 48 42 Z" 
        fill="url(#phoenixBodyGradient)"
      />
      <path 
        d="M 50 45 Q 50 37, 51 32 L 53 37 Q 53 42, 53 47 Z" 
        fill="url(#phoenixBodyGradient)"
      />
      
      <ellipse 
        cx="50" 
        cy="50" 
        rx="18" 
        ry="22" 
        fill="url(#phoenixBodyGradient)"
      />
      
      <path 
        d="M 48 48 Q 50 52, 52 55 L 50 58 Q 47 55, 45 52 Z" 
        fill="url(#phoenixBodyGradient)"
      />
      
      <circle cx="47" cy="46" r="1.5" fill="white" />
      
      <path 
        d="M 55 65 Q 60 70, 68 73 L 66 77 Q 58 74, 53 70 Z" 
        fill="url(#phoenixBodyGradient)"
      />
      <path 
        d="M 58 70 Q 64 74, 72 77 L 70 81 Q 62 78, 56 74 Z" 
        fill="url(#phoenixBodyGradient)"
      />
      <path 
        d="M 61 74 Q 68 78, 76 80 L 74 84 Q 66 81, 59 78 Z" 
        fill="url(#phoenixBodyGradient)"
      />
      <path 
        d="M 64 77 Q 72 81, 80 83 L 78 87 Q 70 84, 62 81 Z" 
        fill="url(#phoenixBodyGradient)"
      />
      <path 
        d="M 67 80 Q 76 84, 85 85 L 83 89 Q 74 87, 65 84 Z" 
        fill="url(#phoenixBodyGradient)"
      />
      
      <path 
        d="M 45 38 Q 42 35, 38 33 L 40 30 Q 44 32, 47 35 Z" 
        fill="hsl(199, 89%, 48%)"
      />
      <path 
        d="M 42 43 Q 38 40, 34 38 L 36 35 Q 40 37, 44 40 Z" 
        fill="hsl(199, 89%, 48%)"
      />
      
      <path 
        d="M 32 60 L 34 58 Q 38 62, 42 65 L 40 67 Q 36 64, 32 60 Z" 
        fill="hsl(199, 89%, 55%)"
      />
      <path 
        d="M 36 64 L 38 62 Q 42 66, 46 69 L 44 71 Q 40 68, 36 64 Z" 
        fill="hsl(199, 89%, 55%)"
      />
    </svg>
  );
};

export default PhoenixLogo;
