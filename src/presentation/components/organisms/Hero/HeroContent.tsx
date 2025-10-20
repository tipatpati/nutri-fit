import { AnimatedClock, AnimatedHeart } from "@/components/ui/animated-icon";
import { QuickOrderSection } from "../../molecules/Hero/QuickOrderSection";
import { TrustBadge } from "../../atoms/Badge/TrustBadge";
import { Icon } from "@/components/ui/icon";

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
    <div className="space-y-10 lg:space-y-12 text-center max-w-3xl mx-auto">
      {/* Badge with organic styling */}
      <div className="inline-flex items-center gap-2 px-4 py-2 glass-card">
        <Icon name="stopwatch" size={14} className="text-md-secondary" />
        <span className="text-on-surface md-label-medium font-semibold">Livraison express en 30 min</span>
      </div>
      
      {/* Heading with serif font */}
      <div className="space-y-6">
        <h1 className="md-display-large sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-on-surface">
          <span className="text-on-surface font-serif">
            Repas
          </span>
          <br />
          <span className="font-script bg-gradient-to-r from-[hsl(var(--md-sys-color-secondary))] to-[hsl(var(--md-sys-color-tertiary))] bg-clip-text text-transparent">
            santé & saveur
          </span>
        </h1>
        
        <p className="md-title-large lg:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto font-normal">
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
