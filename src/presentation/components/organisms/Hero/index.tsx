import { useNavigate } from "react-router-dom";
import { HeroContent } from "./HeroContent";
import { HeroSocialProof } from "./HeroSocialProof";

export const Hero = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Premium gradient background with animated orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-beige to-cream">
        {/* Large animated orbs */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-primary/20 via-orange-primary/10 to-transparent blur-3xl top-[-150px] right-[-150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-olive-muted/15 via-olive-dark/10 to-transparent blur-3xl bottom-[-100px] left-[-100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-olive-dark/5 to-transparent blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        
        {/* Medium orbs for depth */}
        <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-br from-orange-primary/15 to-transparent blur-2xl top-1/4 left-1/4 animate-pulse" style={{ animationDuration: '9s', animationDelay: '1s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-olive-muted/10 to-transparent blur-2xl bottom-1/4 right-1/4 animate-pulse" style={{ animationDuration: '11s', animationDelay: '3s' }} />
        
        {/* Small accent orbs */}
        <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-br from-orange-light/20 to-transparent blur-xl top-1/3 right-1/3 animate-pulse" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />
        <div className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-br from-orange-primary/10 to-transparent blur-xl bottom-1/3 left-1/3 animate-pulse" style={{ animationDuration: '9s', animationDelay: '2.5s' }} />
        
        {/* Floating particles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${2 + Math.random() * 5}px`,
              height: `${2 + Math.random() * 5}px`,
              backgroundColor: i % 3 === 0 ? 'rgba(222, 110, 39, 0.4)' : i % 3 === 1 ? 'rgba(80, 86, 49, 0.3)' : 'rgba(43, 50, 16, 0.25)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Subtle noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 max-w-7xl">
        <HeroContent onOrderClick={handleOrderClick} />
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="w-6 h-10 rounded-full border-2 border-olive-dark/30 flex items-start justify-center p-2 hover:border-orange-primary transition-colors duration-300">
          <div className="w-1 h-2 bg-orange-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
