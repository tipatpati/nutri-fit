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
    { icon: "running", label: "Minceur", gradient: "from-emerald-500/20 to-emerald-600/20" },
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
      
      {/* CTA Button - Premium Orange with hover lift */}
      <Button 
        onClick={onOrderClick}
        size="lg"
        variant="filled"
        className="w-full bg-[#DE6E27] hover:bg-[#DE6E27]/90 text-white font-bold py-7 rounded-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden group text-lg"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Commander maintenant
          <AnimatedArrowRight className="ml-2" size={22} />
        </span>
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
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
