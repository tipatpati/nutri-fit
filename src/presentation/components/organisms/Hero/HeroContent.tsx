import { AnimatedClock, AnimatedHeart } from "@/components/ui/animated-icon";
import { QuickOrderSection } from "../../molecules/Hero/QuickOrderSection";
import { TrustBadge } from "../../atoms/Badge/TrustBadge";
import { Icon } from "@/components/ui/icon";
import { GlassCard } from "@/components/ui/glass-card";

interface HeroContentProps {
  onOrderClick: () => void;
}

export const HeroContent = ({ onOrderClick }: HeroContentProps) => {
  const trustIndicators = [
    { icon: AnimatedHeart, label: "100% Frais", color: "text-md-secondary" },
    { iconComponent: <Icon name="leaves" size={20} className="text-md-tertiary" />, label: "Bio & Local", color: "" },
    { icon: AnimatedClock, label: "Prêt en 2min", color: "text-md-secondary" },
    { iconComponent: <Icon name="delivery-truck" size={20} className="text-md-tertiary" />, label: "Livraison rapide", color: "" }
  ];

  return (
    <div className="space-y-12 md:space-y-16 text-center max-w-5xl mx-auto relative">
      {/* Premium badge */}
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#DE6E27] rounded-full animate-scale-in shadow-lg">
        <Icon name="stopwatch" size={16} className="text-white" />
        <span className="text-white font-semibold text-sm">Livraison express en 30 min</span>
      </div>
      
      {/* Hero heading with modern typography */}
      <div className="space-y-6 px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-[#2B3210]">
          <span className="font-heading block">
            Repas Santé
          </span>
          <span className="font-script bg-gradient-to-r from-[#DE6E27] via-[#DE6E27] to-[#505631] bg-clip-text text-transparent block mt-2">
            Premium
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-[#505631] leading-relaxed max-w-3xl mx-auto">
          Des repas équilibrés, préparés par des chefs passionnés et livrés directement chez vous.
        </p>
      </div>

      {/* CTA Section - Premium Glass Card */}
      <GlassCard variant="floating" className="p-8 md:p-10 space-y-6 animate-fade-in max-w-2xl mx-auto">
        <QuickOrderSection onOrderClick={onOrderClick} />
      </GlassCard>

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 max-w-4xl mx-auto px-4">
        {trustIndicators.map((indicator, index) => (
          <div 
            key={index} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <TrustBadge {...indicator} />
          </div>
        ))}
      </div>
    </div>
  );
};
