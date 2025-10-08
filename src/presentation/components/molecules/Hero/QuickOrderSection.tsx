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
      
      {/* CTA Button */}
      <Button 
        onClick={onOrderClick}
        size="lg"
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-6 rounded-xl transition-all duration-200"
      >
        Commander maintenant
        <AnimatedArrowRight className="ml-2" size={20} />
      </Button>
      
      {/* Benefits */}
      <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Icon name="delivery-truck" size={16} className="brightness-0 invert opacity-60" />
          <span>Livraison gratuite</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="heart-health" size={16} className="brightness-0 invert opacity-60" />
          <span>Sans inscription</span>
        </div>
      </div>
    </div>
  );
};
