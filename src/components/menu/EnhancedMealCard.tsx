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
    <GlassCard elevated className="overflow-hidden group transition-all duration-500 hover:scale-[1.02]">
      {meal.image_url && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={meal.image_url}
            alt={meal.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Meal name overlay */}
          <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl font-['Space_Grotesk'] pr-4">
            {meal.name}
          </h3>

          {/* Badges */}
          {meal.badge && (
            <Badge className="absolute top-4 left-4 glass-surface-light text-[#2B3210] border border-white/20">
              {meal.badge}
            </Badge>
          )}
          {meal.premium && (
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white">
              Premium
            </Badge>
          )}
        </div>
      )}
      
      <div className="p-8 space-y-6">
        <p className="text-base text-[#505631] line-clamp-2 font-['DM_Sans']">{meal.description}</p>

        {primaryIngredients.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#505631] uppercase tracking-wide">Composition:</p>
            <div className="flex flex-wrap gap-2">
              {primaryIngredients.map(mi => {
                const quantity = selectedCategory === 'equilibre' 
                  ? mi.quantity_equilibre 
                  : selectedCategory === 'perte_poids' 
                  ? mi.quantity_perte_poids 
                  : mi.quantity_prise_masse;

                return (
                  <Badge key={mi.id} className="glass-surface-light text-[#2B3210] text-sm py-1.5 px-3">
                    <span className="mr-1">{NUTRIENT_ICONS[mi.nutrient_type as keyof typeof NUTRIENT_ICONS]}</span>
                    {mi.ingredient.name} ({quantity}g)
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        <div className="glass-surface-light rounded-xl p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <Flame className="w-6 h-6 text-[#DE6E27] mb-2" />
              <span className="text-xs text-[#505631] mb-1">Calories</span>
              <span className="text-lg font-bold text-[#2B3210]">{nutrition.calories}</span>
            </div>
            <div className="flex flex-col items-center">
              <Activity className="w-6 h-6 text-[#DE6E27] mb-2" />
              <span className="text-xs text-[#505631] mb-1">Protéines</span>
              <span className="text-lg font-bold text-[#2B3210]">{nutrition.protein}g</span>
            </div>
            <div className="flex flex-col items-center">
              <Wheat className="w-6 h-6 text-[#DE6E27] mb-2" />
              <span className="text-xs text-[#505631] mb-1">Glucides</span>
              <span className="text-lg font-bold text-[#2B3210]">{nutrition.carbs}g</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button variant="outlined" className="flex-1" size="default">
                Détails
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-['Space_Grotesk']">{meal.name}</DialogTitle>
                <DialogDescription className="text-base">{meal.description}</DialogDescription>
              </DialogHeader>
              <MealNutritionalInfo mealId={meal.id} mealName={meal.name} />
            </DialogContent>
          </Dialog>

          {onAddToCart && (
            <Button 
              onClick={onAddToCart} 
              variant="filled" 
              className="flex-1 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] hover:shadow-xl shadow-[#DE6E27]/30" 
              size="default"
            >
              Ajouter
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default EnhancedMealCard;
