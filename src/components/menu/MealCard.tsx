
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Flame, Activity, Wheat } from "lucide-react";
import { useCartStore } from "@/shared/stores/useCartStore";
import { useState } from "react";

interface MealCardProps {
  meal: {
    id: string;
    name: string;
    image_url: string | null;
    category: string;
    premium: boolean;
    badge?: string;
  };
  getCategoryColor: (category: string) => { bg: string; text: string; hex: string };
}

const MealCard = ({ meal, getCategoryColor }: MealCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showActions, setShowActions] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const today = new Date().toISOString().split('T')[0];
    const price = meal.premium ? 15.99 : 12.99;
    
    addItem({
      mealId: meal.id,
      mealName: meal.name,
      quantity,
      date: today,
      price,
    });
    
    setQuantity(1);
    setShowActions(false);
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl glass-card hover:scale-[1.02] transition-all duration-500"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      role="article"
      aria-label={`Plat: ${meal.name}`}
    >
      {/* Image with gradient overlay */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'} 
          alt={`Photo de ${meal.name}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Meal name overlay */}
        <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl font-['Space_Grotesk'] pr-4">
          {meal.name}
        </h3>

        {/* Price badge - floating top right */}
        <div className="absolute top-4 right-4 glass-surface-light backdrop-blur-xl px-4 py-2 rounded-full border border-[#DE6E27]/20">
          <span className="text-[#2B3210] font-bold text-lg font-['Space_Grotesk']">
            {meal.premium ? '15.99' : '12.99'} DA
          </span>
        </div>

        {meal.badge && (
          <div className="absolute top-4 left-4 glass-surface-light backdrop-blur-xl px-3 py-1.5 rounded-full text-sm font-medium text-[#2B3210] border border-white/20">
            {meal.badge}
          </div>
        )}

        {meal.premium && (
          <div className="absolute top-16 left-4 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            Premium
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="p-6">
        {/* Horizontal nutritional info */}
        <div className="flex justify-between mb-6">
          <div className="flex items-center gap-2 text-[#505631]">
            <Flame className="w-4 h-4 text-[#DE6E27]" />
            <span className="text-sm font-medium">450 cal</span>
          </div>
          <div className="flex items-center gap-2 text-[#505631]">
            <Activity className="w-4 h-4 text-[#DE6E27]" />
            <span className="text-sm font-medium">35g</span>
          </div>
          <div className="flex items-center gap-2 text-[#505631]">
            <Wheat className="w-4 h-4 text-[#DE6E27]" />
            <span className="text-sm font-medium">45g</span>
          </div>
        </div>

        {/* Quick Add Actions */}
        {showActions ? (
          <div className="flex items-center gap-2 animate-slide-in-up">
            <Button
              size="sm"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(Math.max(1, quantity - 1));
              }}
              className="h-10 w-10 p-0 rounded-full"
              aria-label="Diminuer la quantité"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-lg font-bold text-[#2B3210] flex-1 text-center min-w-[40px]">
              {quantity}
            </span>
            <Button
              size="sm"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(quantity + 1);
              }}
              className="h-10 w-10 p-0 rounded-full"
              aria-label="Augmenter la quantité"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="filled"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="flex-1 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] hover:shadow-xl shadow-[#DE6E27]/30"
              aria-label={`Ajouter ${quantity} ${meal.name} au panier`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
        ) : (
          <Button
            variant="outlined"
            className="w-full glass-surface-light border-2 border-[#DE6E27] text-[#DE6E27] hover:bg-[#DE6E27] hover:text-white transition-all duration-300"
            onClick={() => setShowActions(true)}
          >
            Commander
          </Button>
        )}
      </div>
    </div>
  );
};

export default MealCard;
