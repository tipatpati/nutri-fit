import { useNavigate } from "react-router-dom";
import { HeroContent } from "./HeroContent";
import { HeroSocialProof } from "./HeroSocialProof";

export const Hero = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order");
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Subtle background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url(/lovable-uploads/ff5ffe15-1c41-47b5-92cd-30cb2ecf8549.png)'
        }}
      />
      
      {/* Minimal gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-500/5" />
      
      {/* Single subtle glow effect */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-16 lg:gap-20 items-center">
          <HeroContent onOrderClick={handleOrderClick} />
          <HeroSocialProof />
        </div>
      </div>
    </section>
  );
};
