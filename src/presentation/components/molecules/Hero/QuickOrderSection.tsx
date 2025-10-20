import { Button } from "@/components/ui/button";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { CategoryBadge } from "../../atoms/Badge/CategoryBadge";
import { Icon } from "@/components/ui/icon";

interface QuickOrderSectionProps {
  onOrderClick: () => void;
}

export const QuickOrderSection = ({ onOrderClick }: QuickOrderSectionProps) => {
  const categories = [
    { icon: "muscle", label: "Prise de masse", gradient: "from-orange-500/20 to-orange-600/20" },
    { icon: "running", label: "Perte de poids", gradient: "from-emerald-500/20 to-emerald-600/20" },
    { icon: "scale-balance", label: "Équilibré", gradient: "from-yellow-500/20 to-yellow-600/20" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category, index) => (
          <CategoryBadge key={index} {...category} />
        ))}
      </div>
      
      {/* CTA Button - Burnt Orange Brand Color with Glass */}
      <Button 
        onClick={onOrderClick}
        size="lg"
        variant="filled"
        className="w-full bg-md-secondary hover:bg-md-secondary/90 text-on-secondary font-semibold py-6 rounded-[var(--organic-radius)] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ripple-effect relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center justify-center">
          Commander maintenant
          <AnimatedArrowRight className="ml-2" size={20} />
        </span>
        {/* Glass overlay on hover */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Button>
      
      {/* Benefits with organic icons */}
      <div className="flex items-center justify-center gap-6 text-sm text-on-surface-variant">
        <div className="flex items-center gap-2">
          <Icon name="delivery-truck" size={16} className="text-md-tertiary" />
          <span>Livraison gratuite</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="heart-health" size={16} className="text-md-tertiary" />
          <span>Sans inscription</span>
        </div>
      </div>
    </div>
  );
};
