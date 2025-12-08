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
        <linearGradient id="phoenixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(199, 89%, 48%)" />
          <stop offset="100%" stopColor="hsl(45, 100%, 51%)" />
        </linearGradient>
      </defs>
      
      <path 
        d="M50 15 C40 20, 35 30, 35 40 L35 50 C35 55, 30 60, 25 65 C30 70, 40 75, 50 75 C60 75, 70 70, 75 65 C70 60, 65 55, 65 50 L65 40 C65 30, 60 20, 50 15 Z" 
        fill="url(#phoenixGradient)" 
        opacity="0.3"
      />
      
      <path 
        d="M35 45 Q30 50, 25 55 Q20 60, 15 70 C18 65, 22 62, 25 60 Q30 55, 35 52" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      
      <path 
        d="M65 45 Q70 50, 75 55 Q80 60, 85 70 C82 65, 78 62, 75 60 Q70 55, 65 52" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      
      <ellipse 
        cx="50" 
        cy="40" 
        rx="12" 
        ry="15" 
        fill="url(#phoenixGradient)"
      />
      
      <path 
        d="M50 30 L45 50 L50 45 L55 50 Z" 
        fill="url(#phoenixGradient)"
      />
      
      <path 
        d="M38 48 Q35 55, 30 62 Q28 68, 25 75" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
      />
      
      <path 
        d="M62 48 Q65 55, 70 62 Q72 68, 75 75" 
        stroke="url(#phoenixGradient)" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
      />
      
      <circle cx="45" cy="38" r="2" fill="white" opacity="0.9" />
      <circle cx="55" cy="38" r="2" fill="white" opacity="0.9" />
      
      <path 
        d="M40 75 Q45 82, 50 85 Q55 82, 60 75" 
        stroke="hsl(45, 100%, 51%)" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
      
      <path 
        d="M35 80 Q40 85, 45 88 M55 88 Q60 85, 65 80" 
        stroke="hsl(45, 100%, 51%)" 
        strokeWidth="1.5" 
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
};

export default PhoenixLogo;
