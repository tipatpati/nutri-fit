import { useNavigate } from "react-router-dom";
import { HeroContent } from "./HeroContent";
import { HeroSocialProof } from "./HeroSocialProof";

export const Hero = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url(/lovable-uploads/ff5ffe15-1c41-47b5-92cd-30cb2ecf8549.png)'
        }}
      />
      
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-orange-500/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="relative z-10 container mx-auto px-md-4 sm:px-md-6 lg:px-md-8 py-md-12 sm:py-md-20">
        <div className="grid lg:grid-cols-2 gap-md-8 lg:gap-md-16 items-center">
          <HeroContent onOrderClick={handleOrderClick} />
          <HeroSocialProof />
        </div>
      </div>
    </section>
  );
};
