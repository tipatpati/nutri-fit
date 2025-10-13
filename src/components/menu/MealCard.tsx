
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
    <Card 
      className="overflow-hidden group w-full md-state-layer relative hover:md-elevation-3 transition-all duration-md-medium4 ease-md-emphasized"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'} 
            alt={meal.name}
            className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-transform duration-md-medium4 ease-md-emphasized group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-md-short4 ease-md-standard" />
          {meal.badge && (
            <div 
              className="absolute top-md-2 left-md-2 px-md-2 py-md-1 rounded-md-full md-label-small text-white backdrop-blur-sm md-elevation-1"
              style={{ backgroundColor: getCategoryColor(meal.category).hex }}
            >
              {meal.badge}
            </div>
          )}
          {meal.premium && (
            <div className="absolute top-md-2 right-md-2 bg-md-tertiary text-md-tertiary-on px-md-2 py-md-1 rounded-md-full md-label-small md-elevation-1">
              Premium
            </div>
          )}
          
          {/* Quick Add Actions */}
          {showActions && (
            <div className="absolute bottom-md-3 left-md-3 right-md-3 flex items-center gap-md-2 bg-md-surface rounded-md-md p-md-2 shadow-lg">
              <Button
                size="sm"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(Math.max(1, quantity - 1));
                }}
                className="h-8 w-8 p-0"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="md-body-medium font-semibold text-md-on-surface flex-1 text-center">
                {quantity}
              </span>
              <Button
                size="sm"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(quantity + 1);
                }}
                className="h-8 w-8 p-0"
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
                className="flex-1"
              >
                <ShoppingCart className="w-4 h-4 mr-md-1" />
                Ajouter
              </Button>
            </div>
          )}
        </div>
        <div className="p-md-3">
          <h3 className="md-title-medium text-md-surface-on-surface group-hover:text-md-primary transition-colors duration-md-short4 ease-md-standard line-clamp-2">
            {meal.name}
          </h3>
          <p className="md-body-medium text-md-primary font-semibold mt-md-2">
            {meal.premium ? '15.99' : '12.99'}€
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;
