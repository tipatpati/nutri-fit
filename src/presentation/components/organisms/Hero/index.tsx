import { useNavigate } from "react-router-dom";
import { HeroContent } from "./HeroContent";
import { HeroSocialProof } from "./HeroSocialProof";

export const Hero = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order");
  };

  return (
    <section 
      className="relative min-h-[100vh] md:min-h-screen flex items-center overflow-hidden py-16 md:py-20"
      style={{
        background: `linear-gradient(135deg, 
          hsl(var(--md-sys-color-surface)) 0%, 
          hsl(var(--md-sys-color-surface-dim)) 100%)`
      }}
    >
      {/* Animated orbs */}
      <div 
        className="absolute top-[10%] right-[15%] w-[400px] h-[400px] rounded-full blur-3xl opacity-30 animate-float"
        style={{
          background: `radial-gradient(circle, hsl(var(--md-sys-color-secondary)) 0%, transparent 70%)`,
          animationDelay: '0s',
          animationDuration: '20s'
        }}
      />
      <div 
        className="absolute top-[60%] left-[10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-25 animate-float"
        style={{
          background: `radial-gradient(circle, hsl(var(--md-sys-color-tertiary)) 0%, transparent 70%)`,
          animationDelay: '7s',
          animationDuration: '25s'
        }}
      />
      <div 
        className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full blur-2xl opacity-20 animate-float"
        style={{
          background: `radial-gradient(circle, hsl(var(--md-sys-color-primary)) 0%, transparent 70%)`,
          animationDelay: '14s',
          animationDuration: '18s'
        }}
      />
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-40 animate-float"
          style={{
            background: i % 3 === 0 
              ? 'hsl(var(--md-sys-color-secondary))' 
              : i % 3 === 1 
              ? 'hsl(var(--md-sys-color-tertiary))' 
              : 'hsl(var(--md-sys-color-primary))',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      ))}
      
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-center">
          <HeroContent onOrderClick={handleOrderClick} />
        </div>
      </div>
    </section>
  );
};
