import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMealIngredients } from "@/hooks/useMealIngredients";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MealNutritionalInfo from "./MealNutritionalInfo";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group glass rounded-2xl overflow-hidden shadow-lg"
    >
      {meal.image_url && (
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={meal.image_url}
            alt={meal.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/90 via-olive-dark/30 to-transparent" />
          
          {/* Meal name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-heading text-2xl font-bold text-cream leading-tight">
              {meal.name}
            </h3>
          </div>

          {/* Badges */}
          {meal.badge && (
            <Badge className="absolute top-4 left-4 glass-strong text-olive-dark border-none">
              {meal.badge}
            </Badge>
          )}
          {meal.premium && (
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-primary to-orange-light text-white border-none">
              Premium
            </Badge>
          )}
        </div>
      )}
      
      <div className="p-8 space-y-6">
        <p className="text-base text-olive-muted line-clamp-2 leading-relaxed">{meal.description}</p>

        {primaryIngredients.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-olive-muted uppercase tracking-wide">Composition:</p>
            <div className="flex flex-wrap gap-2">
              {primaryIngredients.map(mi => {
                const quantity = selectedCategory === 'equilibre' 
                  ? mi.quantity_equilibre 
                  : selectedCategory === 'perte_poids' 
                  ? mi.quantity_perte_poids 
                  : mi.quantity_prise_masse;

                return (
                  <Badge key={mi.id} className="glass text-olive-dark text-sm py-1.5 px-3 border-none">
                    <span className="mr-1">{NUTRIENT_ICONS[mi.nutrient_type as keyof typeof NUTRIENT_ICONS]}</span>
                    {mi.ingredient.name} ({quantity}g)
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        <div className="glass rounded-xl p-6">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-olive-dark"></span>
              <span className="text-olive-muted font-medium">{nutrition.calories} cal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-primary"></span>
              <span className="text-olive-muted font-medium">{nutrition.protein}g protein</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-info"></span>
              <span className="text-olive-muted font-medium">{nutrition.carbs}g carbs</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button variant="outlined" className="flex-1 border-2 border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white" size="default">
                Détails
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading">{meal.name}</DialogTitle>
                <DialogDescription className="text-base">{meal.description}</DialogDescription>
              </DialogHeader>
              <MealNutritionalInfo mealId={meal.id} mealName={meal.name} />
            </DialogContent>
          </Dialog>

          {onAddToCart && (
            <Button 
              onClick={onAddToCart} 
              variant="filled" 
              className="flex-1 bg-gradient-to-r from-orange-primary to-orange-light hover:shadow-xl shadow-orange-primary/30 hover:-translate-y-1" 
              size="default"
            >
              Ajouter
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedMealCard;
