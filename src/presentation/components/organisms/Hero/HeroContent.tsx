import { Clock, Truck, Heart } from "lucide-react";
import { AnimatedClock, AnimatedHeart } from "@/components/ui/animated-icon";
import { QuickOrderSection } from "../../molecules/Hero/QuickOrderSection";
import { TrustBadge } from "../../atoms/Badge/TrustBadge";
import { Icon } from "@/components/ui/icon";

interface HeroContentProps {
  onOrderClick: () => void;
}

export const HeroContent = ({ onOrderClick }: HeroContentProps) => {
  const trustIndicators = [
    { icon: AnimatedHeart, label: "100% Frais", color: "text-md-error" },
    { iconComponent: <Icon name="leaves" size={20} className="brightness-0 invert" />, label: "Bio & Local", color: "" },
    { icon: AnimatedClock, label: "Prêt en 2min", color: "text-md-tertiary" },
    { icon: Truck, label: "Livraison rapide", color: "text-md-secondary" }
  ];

  return (
    <div className="space-y-md-6 lg:space-y-md-8 text-center lg:text-left">
      <div className="space-y-md-4 lg:space-y-md-6">
        <div className="inline-flex items-center px-md-3 sm:px-md-4 py-md-2 bg-md-primary/10 border border-md-primary/20 rounded-full backdrop-blur-sm">
          <Icon name="stopwatch" size={16} className="mr-2 brightness-0 invert opacity-70" />
          <span className="text-orange-300 md-label-medium">Nouveau - Livraison express en 30 min</span>
        </div>
        
        <h1 className="md-display-large lg:text-[64px] lg:leading-[72px]">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Repas
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent font-bold">
            santé & saveur
          </span>
        </h1>
        
        <p className="md-body-large lg:md-body-large text-gray-200 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          Des repas équilibrés, préparés par des chefs et livrés directement chez vous.
          <span className="block mt-md-2 text-orange-300 md-label-large font-medium">Commandez en 30 secondes, sans inscription</span>
        </p>
      </div>

      <QuickOrderSection onOrderClick={onOrderClick} />

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md-4 lg:gap-md-6">
        {trustIndicators.map((indicator, index) => (
          <TrustBadge key={index} {...indicator} />
        ))}
      </div>
    </div>
  );
};
