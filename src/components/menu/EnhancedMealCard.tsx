import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {meal.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={meal.image_url}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
          {meal.badge && (
            <Badge className="absolute top-2 right-2 bg-primary/90">
              {meal.badge}
            </Badge>
          )}
          {meal.premium && (
            <Badge className="absolute top-2 left-2 bg-amber-500">
              Premium
            </Badge>
          )}
        </div>
      )}
      
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{meal.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{meal.description}</p>
        </div>

        {primaryIngredients.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Composition:</p>
            <div className="flex flex-wrap gap-2">
              {primaryIngredients.map(mi => {
                const quantity = selectedCategory === 'equilibre' 
                  ? mi.quantity_equilibre 
                  : selectedCategory === 'perte_poids' 
                  ? mi.quantity_perte_poids 
                  : mi.quantity_prise_masse;

                return (
                  <Badge key={mi.id} variant="outline" className="text-xs">
                    <span className="mr-1">{NUTRIENT_ICONS[mi.nutrient_type as keyof typeof NUTRIENT_ICONS]}</span>
                    {mi.ingredient.name} ({quantity}g)
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 pt-2 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-orange-600">
              <Flame className="h-3 w-3" />
              <span className="text-xs font-semibold">{nutrition.calories}</span>
            </div>
            <p className="text-xs text-muted-foreground">kcal</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-red-600">
              <Activity className="h-3 w-3" />
              <span className="text-xs font-semibold">{nutrition.protein}g</span>
            </div>
            <p className="text-xs text-muted-foreground">protéines</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-amber-600">
              <Wheat className="h-3 w-3" />
              <span className="text-xs font-semibold">{nutrition.carbs}g</span>
            </div>
            <p className="text-xs text-muted-foreground">glucides</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1" size="sm">
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
            <Button onClick={onAddToCart} className="flex-1" size="sm">
              Ajouter
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedMealCard;
