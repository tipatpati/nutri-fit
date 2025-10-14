export const FooterDecorator = () => {
  return (
    <div className="relative h-24 overflow-hidden">
      {/* Wave Pattern */}
      <svg 
        className="absolute bottom-0 w-full h-24" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--md-sys-color-primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--md-sys-color-tertiary))" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(var(--md-sys-color-primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path 
          d="M0,60 C300,90 600,30 900,60 C1050,75 1150,60 1200,50 L1200,120 L0,120 Z" 
          fill="url(#waveGradient)"
        />
        <path 
          d="M0,80 C300,50 600,100 900,70 C1050,55 1150,80 1200,75 L1200,120 L0,120 Z" 
          fill="hsl(var(--md-sys-color-surface-container-low))"
        />
      </svg>
    </div>
  );
};
