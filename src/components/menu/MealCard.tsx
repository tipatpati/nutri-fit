
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
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
      className="overflow-hidden group w-full glass-card rounded-[var(--organic-radius)] hover:scale-[1.02] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      role="article"
      aria-label={`Plat: ${meal.name}`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'} 
          alt={`Photo de ${meal.name}`}
          className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B3210]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
        {meal.badge && (
          <div 
            className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-medium text-white glass-surface-light border border-white/20"
            role="status"
            aria-label={`Badge: ${meal.badge}`}
          >
            {meal.badge}
          </div>
        )}
        {meal.premium && (
          <div 
            className="absolute top-3 right-3 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg"
            role="status"
            aria-label="Plat premium"
          >
            Premium
          </div>
        )}
        
        {/* Quick Add Actions */}
        {showActions && (
          <div 
            className="absolute bottom-3 left-3 right-3 flex items-center gap-2 glass-surface-light rounded-xl p-2 shadow-xl border border-white/20 animate-slide-in-up"
            role="group"
            aria-label="Actions d'ajout au panier"
          >
            <Button
              size="sm"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(Math.max(1, quantity - 1));
              }}
              className="h-8 w-8 p-0 rounded-full"
              aria-label="Diminuer la quantité"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span 
              className="text-sm font-bold text-[#2B3210] flex-1 text-center"
              role="status"
              aria-live="polite"
              aria-label={`Quantité: ${quantity}`}
            >
              {quantity}
            </span>
            <Button
              size="sm"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(quantity + 1);
              }}
              className="h-8 w-8 p-0 rounded-full"
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
              className="flex-1 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] hover:shadow-lg"
              aria-label={`Ajouter ${quantity} ${meal.name} au panier`}
            >
              <ShoppingCart className="w-4 h-4 mr-1" aria-hidden="true" />
              Ajouter
            </Button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#2B3210] group-hover:text-[#DE6E27] transition-colors duration-300 line-clamp-2">
          {meal.name}
        </h3>
        <p className="text-base font-bold text-[#DE6E27] mt-2" aria-label={`Prix: ${meal.premium ? '15.99' : '12.99'} Dinars Algériens`}>
          {meal.premium ? '15.99' : '12.99'} DA
        </p>
      </div>
    </div>
  );
};

export default MealCard;
