import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Activity, Wheat } from "lucide-react";
import { useMealIngredients } from "@/hooks/useMealIngredients";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MealNutritionalInfo from "./MealNutritionalInfo";

interface EnhancedMealCardProps {
  meal: {
    id: string;
    name: string;
    description: string;
    category: string;
    image_url?: string;
    badge?: string;
    premium: boolean;
  };
  selectedCategory?: 'equilibre' | 'perte_poids' | 'prise_masse';
  onAddToCart?: () => void;
}

const NUTRIENT_ICONS = {
  protein: '🥩',
  carbs: '🌾',
  vegetables: '🥗',
};

const EnhancedMealCard = ({ meal, selectedCategory = 'equilibre', onAddToCart }: EnhancedMealCardProps) => {
  const { data: mealIngredients = [] } = useMealIngredients(meal.id);
  const [showDetails, setShowDetails] = useState(false);

  const calculateQuickNutrition = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;

    mealIngredients.forEach(mi => {
      const quantity = selectedCategory === 'equilibre' 
        ? mi.quantity_equilibre 
        : selectedCategory === 'perte_poids' 
        ? mi.quantity_perte_poids 
        : mi.quantity_prise_masse;

      if (mi.ingredient.nutritional_info && quantity) {
        const nutrition = mi.ingredient.nutritional_info as any;
        const multiplier = quantity / 100;
        totalCalories += (nutrition.calories || 0) * multiplier;
        totalProtein += (nutrition.protein || 0) * multiplier;
        totalCarbs += (nutrition.carbs || 0) * multiplier;
      }
    });

    return {
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein * 10) / 10,
      carbs: Math.round(totalCarbs * 10) / 10,
    };
  };

  const nutrition = calculateQuickNutrition();
  const primaryIngredients = mealIngredients.filter(mi => mi.is_primary);

  return (
    <GlassCard elevated className="overflow-hidden group transition-all duration-md-medium2 hover:md-elevation-3 hover:scale-[1.02]">
      {meal.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={meal.image_url}
            alt={meal.name}
            className="w-full h-full object-cover transition-transform duration-md-long1 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-md-surface/80 via-transparent to-transparent" />
          {meal.badge && (
            <Badge className="absolute top-md-2 right-md-2 glass-surface text-md-on-surface">
              {meal.badge}
            </Badge>
          )}
          {meal.premium && (
            <Badge className="absolute top-md-2 left-md-2 glass-surface text-md-on-surface">
              Premium
            </Badge>
          )}
        </div>
      )}
      
      <div className="p-md-6 space-y-md-4">
        <div>
          <h3 className="md-title-large text-md-on-surface mb-md-2">{meal.name}</h3>
          <p className="md-body-medium text-md-on-surface-variant line-clamp-2">{meal.description}</p>
        </div>

        {primaryIngredients.length > 0 && (
          <div className="space-y-md-2">
            <p className="md-label-medium text-md-on-surface-variant">Composition:</p>
            <div className="flex flex-wrap gap-md-2">
              {primaryIngredients.map(mi => {
                const quantity = selectedCategory === 'equilibre' 
                  ? mi.quantity_equilibre 
                  : selectedCategory === 'perte_poids' 
                  ? mi.quantity_perte_poids 
                  : mi.quantity_prise_masse;

                return (
                  <Badge key={mi.id} className="glass-surface text-md-on-surface md-label-small">
                    <span className="mr-1">{NUTRIENT_ICONS[mi.nutrient_type as keyof typeof NUTRIENT_ICONS]}</span>
                    {mi.ingredient.name} ({quantity}g)
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        <div className="glass-surface rounded-md-lg p-md-4">
          <div className="grid grid-cols-3 gap-md-4">
            <div className="flex flex-col items-center">
              <Flame className="w-5 h-5 text-md-tertiary mb-md-1" />
              <span className="md-label-small text-md-on-surface-variant">Calories</span>
              <span className="md-label-large text-md-on-surface">{nutrition.calories}</span>
            </div>
            <div className="flex flex-col items-center">
              <Activity className="w-5 h-5 text-md-primary mb-md-1" />
              <span className="md-label-small text-md-on-surface-variant">Protéines</span>
              <span className="md-label-large text-md-on-surface">{nutrition.protein}g</span>
            </div>
            <div className="flex flex-col items-center">
              <Wheat className="w-5 h-5 text-md-secondary mb-md-1" />
              <span className="md-label-small text-md-on-surface-variant">Glucides</span>
              <span className="md-label-large text-md-on-surface">{nutrition.carbs}g</span>
            </div>
          </div>
        </div>

        <div className="flex gap-md-2 pt-md-2">
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button variant="outlined" className="flex-1" size="sm">
                Détails
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{meal.name}</DialogTitle>
                <DialogDescription>{meal.description}</DialogDescription>
              </DialogHeader>
              <MealNutritionalInfo mealId={meal.id} mealName={meal.name} />
            </DialogContent>
          </Dialog>

          {onAddToCart && (
            <Button onClick={onAddToCart} variant="filled" className="flex-1" size="sm">
              Ajouter
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default EnhancedMealCard;
