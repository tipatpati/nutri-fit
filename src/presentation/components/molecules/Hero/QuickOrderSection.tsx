import { Button } from "@/components/ui/button";
import { Truck, Heart } from "lucide-react";
import { AnimatedArrowRight } from "@/components/ui/animated-icon";
import { CategoryBadge } from "../../atoms/Badge/CategoryBadge";

interface QuickOrderSectionProps {
  onOrderClick: () => void;
}

export const QuickOrderSection = ({ onOrderClick }: QuickOrderSectionProps) => {
  const categories = [
    { emoji: "💪", label: "Prise de masse", gradient: "from-orange-500/20 to-orange-600/20" },
    { emoji: "🏃", label: "Perte de poids", gradient: "from-emerald-500/20 to-emerald-600/20" },
    { emoji: "⚖️", label: "Équilibré", gradient: "from-yellow-500/20 to-yellow-600/20" },
  ];

  return (
    <div className="md-surface-container-low/10 backdrop-blur-xl border border-md-outline-variant/20 rounded-xl lg:rounded-[24px] p-md-4 sm:p-md-6 lg:p-md-8 md-elevation-2">
      <h3 className="text-white md-title-large mb-md-4 lg:mb-md-6 flex items-center justify-center lg:justify-start">
        <span className="w-2 h-2 bg-orange-400 rounded-full mr-md-3 animate-pulse-subtle"></span>
        Commande express
      </h3>
      
      <div className="grid grid-cols-3 gap-md-3 lg:gap-md-4 mb-md-4 lg:mb-md-6">
        {categories.map((category, index) => (
          <CategoryBadge key={index} {...category} />
        ))}
      </div>
      
      <Button 
        onClick={onOrderClick}
        variant="filled"
        size="lg"
        className="w-full md-elevation-1 hover:md-elevation-2"
      >
        Commander maintenant
        <AnimatedArrowRight className="ml-2" size={20} />
      </Button>
      
      <div className="flex items-center justify-center mt-md-3 lg:mt-md-4 space-x-md-4 lg:space-x-md-6 md-label-medium text-gray-300">
        <div className="flex items-center">
          <Truck className="w-3 h-3 lg:w-4 lg:h-4 mr-md-1 lg:mr-md-2 text-emerald-400" />
          Livraison gratuite
        </div>
        <div className="flex items-center">
          <Heart className="w-3 h-3 lg:w-4 lg:h-4 mr-md-1 lg:mr-md-2 text-orange-400" />
          Sans compte requis
        </div>
      </div>
    </div>
  );
};
