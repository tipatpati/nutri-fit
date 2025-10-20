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
          hsl(var(--md-sys-color-primary)) 0%, 
          hsl(var(--md-sys-color-primary-container)) 50%,
          hsl(var(--md-sys-color-secondary-container)) 100%)`
      }}
    >
      {/* Background image with proper treatment */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 mix-blend-overlay"
        style={{
          backgroundImage: 'url(/lovable-uploads/ff5ffe15-1c41-47b5-92cd-30cb2ecf8549.png)'
        }}
      />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px]" 
        style={{
          background: 'linear-gradient(135deg, transparent 0%, hsla(var(--md-sys-color-surface), 0.1) 50%, hsla(var(--md-sys-color-surface), 0.2) 100%)'
        }}
      />
      
      {/* Ambient glow effect */}
      <div 
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
        style={{
          background: `radial-gradient(circle, hsl(var(--md-sys-color-secondary)) 0%, transparent 70%)`
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
