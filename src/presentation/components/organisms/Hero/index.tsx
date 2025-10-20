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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          hsl(var(--md-sys-color-surface)) 0%, 
          hsl(var(--md-sys-color-surface-dim)) 100%)`
      }}
    >
      {/* Background image with organic treatment */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: 'url(/lovable-uploads/ff5ffe15-1c41-47b5-92cd-30cb2ecf8549.png)'
        }}
      />
      
      {/* Warm overlay gradient */}
      <div className="absolute inset-0" 
        style={{
          background: 'linear-gradient(135deg, hsla(40, 50%, 96%, 0.9) 0%, hsla(40, 18%, 87%, 0.95) 100%)'
        }}
      />
      
      {/* Organic blob shapes */}
      <div 
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle, hsl(var(--md-sys-color-secondary)) 0%, transparent 70%)`
        }}
      />
      <div 
        className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
        style={{
          background: `radial-gradient(circle, hsl(var(--md-sys-color-tertiary)) 0%, transparent 70%)`
        }}
      />
      
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-[24px] sm:px-[32px] lg:px-[48px] py-[80px] lg:py-[128px]">
        <div className="flex items-center justify-center">
          <HeroContent onOrderClick={handleOrderClick} />
        </div>
      </div>
    </section>
  );
};
