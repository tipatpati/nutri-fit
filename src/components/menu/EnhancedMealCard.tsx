import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMealIngredients } from "@/hooks/useMealIngredients";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MealNutritionalInfo from "./MealNutritionalInfo";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Heart, Flame, Activity, Wheat } from "lucide-react";

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
  viewMode?: 'grid' | 'list';
}

const NUTRIENT_ICONS = {
  protein: '🥩',
  carbs: '🌾',
  vegetables: '🥗',
};

const EnhancedMealCard = ({ meal, selectedCategory = 'equilibre', viewMode = 'grid' }: EnhancedMealCardProps) => {
  const { data: mealIngredients = [] } = useMealIngredients(meal.id);
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

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

  const handleAddToCart = () => {
    addItem({
      mealId: meal.id,
      mealName: meal.name,
      mealImage: meal.image_url || '/placeholder.jpg',
      category: meal.category,
      premium: meal.premium || false,
      quantity: 1,
      unitPrice: 450, // Replace with actual price from meal data
      nutritionalGoal: selectedCategory,
      nutrition: {
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbs: nutrition.carbs,
        fat: 0, // Add fat calculation if available
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -12, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group glass-strong rounded-3xl overflow-hidden shadow-xl border-2 border-transparent hover:border-[#DE6E27]/30 hover:shadow-2xl transition-all duration-500 relative"
    >
      {/* Shimmer effect */}
      <motion.div
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-10"
      />
      {meal.image_url && (
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={meal.image_url}
            alt={meal.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.15 : 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B3210]/90 via-[#2B3210]/30 to-transparent" />
          
          {/* Favorite Heart Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-4 right-4 w-12 h-12 glass-strong rounded-full flex items-center justify-center border-2 border-white/30 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 z-10"
          >
            <Heart 
              className={`w-6 h-6 transition-all duration-300 ${
                isFavorite 
                  ? 'fill-[#DE6E27] text-[#DE6E27]' 
                  : 'text-white'
              }`}
            />
          </motion.button>
          
          {/* Meal name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-['Space_Grotesk'] text-3xl font-bold text-[#FBF8EF] leading-tight drop-shadow-xl">
              {meal.name}
            </h3>
          </div>

          {/* Enhanced Badges */}
          {meal.badge && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute top-4 left-4 glass-strong px-4 py-2 rounded-full text-[#2B3210] font-bold border-2 border-white/30"
            >
              {meal.badge}
            </motion.div>
          )}
          {meal.premium && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="absolute top-16 left-4 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl"
            >
              ⭐ Premium
            </motion.div>
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

        {/* Enhanced Nutrition Info */}
        <div className="glass rounded-2xl p-6 border-2 border-[#E5E2D9]">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: Flame, label: 'Calories', value: nutrition.calories, color: '#DE6E27' },
              { icon: Activity, label: 'Protéines', value: `${nutrition.protein}g`, color: '#2B3210' },
              { icon: Wheat, label: 'Glucides', value: `${nutrition.carbs}g`, color: '#505631' }
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.1, y: -4 }}
                className="flex flex-col items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </motion.div>
                <span className="text-xs text-[#505631] font-medium">{item.label}</span>
                <span className="font-['Space_Grotesk'] text-lg font-bold text-[#2B3210]">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 glass border-2 border-[#DE6E27] text-[#DE6E27] py-3 px-6 rounded-xl font-semibold hover:bg-[#DE6E27] hover:text-white transition-all duration-300"
              >
                Détails
              </motion.button>
            </DialogTrigger>
            <DialogContent className="glass-strong max-w-2xl max-h-[80vh] overflow-y-auto border-2 border-[#DE6E27]/30">
              <DialogHeader>
                <DialogTitle className="font-['Space_Grotesk'] text-3xl">{meal.name}</DialogTitle>
                <DialogDescription className="text-lg text-[#505631]">{meal.description}</DialogDescription>
              </DialogHeader>
              <MealNutritionalInfo mealId={meal.id} mealName={meal.name} />
            </DialogContent>
          </Dialog>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsAdding(true);
              handleAddToCart();
              setTimeout(() => setIsAdding(false), 1000);
            }}
            disabled={isAdding}
            className="flex-1 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#DE6E27]/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isAdding ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <ShoppingCart className="w-5 h-5" />
                </motion.div>
                Ajout...
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Ajouter
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedMealCard;
