import { AnimatedClock, AnimatedHeart } from "@/components/ui/animated-icon";
import { QuickOrderSection } from "../../molecules/Hero/QuickOrderSection";
import { TrustBadge } from "../../atoms/Badge/TrustBadge";
import { Icon } from "@/components/ui/icon";

interface HeroContentProps {
  onOrderClick: () => void;
}

export const HeroContent = ({ onOrderClick }: HeroContentProps) => {
  const trustIndicators = [
    { icon: AnimatedHeart, label: "100% Frais", color: "text-white" },
    { iconComponent: <Icon name="leaves" size={20} className="brightness-0 invert" />, label: "Bio & Local", color: "" },
    { icon: AnimatedClock, label: "Prêt en 2min", color: "text-white" },
    { iconComponent: <Icon name="delivery-truck" size={20} className="brightness-0 invert" />, label: "Livraison rapide", color: "" }
  ];

  return (
    <div className="space-y-10 lg:space-y-12 text-center max-w-3xl mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
        <Icon name="stopwatch" size={14} className="brightness-0 invert opacity-60" />
        <span className="text-orange-300 text-sm font-medium">Livraison express en 30 min</span>
      </div>
      
      {/* Heading */}
      <div className="space-y-6">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          <span className="text-white">
            Repas
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
            santé & saveur
          </span>
        </h1>
        
        <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Des repas équilibrés, préparés par des chefs et livrés directement chez vous.
        </p>
      </div>

      {/* CTA Section */}
      <QuickOrderSection onOrderClick={onOrderClick} />

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 max-w-2xl mx-auto">
        {trustIndicators.map((indicator, index) => (
          <TrustBadge key={index} {...indicator} />
        ))}
      </div>
    </div>
  );
};
