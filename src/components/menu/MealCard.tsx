
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
      className="group relative overflow-hidden rounded-2xl glass hover:scale-[1.02] hover:shadow-2xl transition-all duration-500"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      role="article"
      aria-label={`Plat: ${meal.name}`}
    >
      {/* Image with gradient overlay */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'} 
          alt={`Photo de ${meal.name}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Bottom Gradient for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/90 via-olive-dark/30 to-transparent" />
        
        {/* Meal name overlay (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-heading text-2xl font-bold text-cream leading-tight">
            {meal.name}
          </h3>
        </div>

        {/* Floating Price Badge (Top Right) */}
        <div className="absolute top-4 right-4 glass-strong px-4 py-2 rounded-full backdrop-blur-xl">
          <span className="font-heading text-lg font-bold text-olive-dark">
            {meal.premium ? '15.99' : '12.99'} DA
          </span>
        </div>

        {meal.badge && (
          <div className="absolute top-4 left-4 glass-strong px-3 py-1.5 rounded-full text-sm font-medium text-olive-dark">
            {meal.badge}
          </div>
        )}

        {meal.premium && (
          <div className="absolute top-16 left-4 bg-gradient-to-r from-orange-primary to-orange-light text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            Premium
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="p-6 space-y-4">
        {/* Horizontal nutritional info */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-olive-dark"></span>
            <span className="text-olive-muted font-medium">450 cal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-primary"></span>
            <span className="text-olive-muted font-medium">35g protein</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-info"></span>
            <span className="text-olive-muted font-medium">45g carbs</span>
          </div>
        </div>

        {/* Quick Add Actions */}
        {showActions ? (
          <div className="flex items-center gap-2 animate-fade-in">
            <Button
              size="sm"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(Math.max(1, quantity - 1));
              }}
              className="h-10 w-10 p-0 rounded-full border-2 border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white"
              aria-label="Diminuer la quantité"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-lg font-bold text-olive-dark flex-1 text-center min-w-[40px]">
              {quantity}
            </span>
            <Button
              size="sm"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(quantity + 1);
              }}
              className="h-10 w-10 p-0 rounded-full border-2 border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white"
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
              className="flex-1 bg-gradient-to-r from-orange-primary to-orange-light hover:shadow-xl shadow-orange-primary/30"
              aria-label={`Ajouter ${quantity} ${meal.name} au panier`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
        ) : (
          <button className="w-full glass border-2 border-orange-primary text-orange-primary font-semibold py-3 rounded-xl hover:bg-orange-primary hover:text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            Commander
          </button>
        )}
      </div>
    </div>
  );
};

export default MealCard;
