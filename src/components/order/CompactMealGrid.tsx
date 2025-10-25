import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MealCardSkeleton } from "@/presentation/components/molecules/Loading/MealCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Meal {
  id: string;
  name: string;
  image_url: string;
  category: string;
  premium: boolean;
  badge?: string;
}

interface SelectedMeal {
  id: string;
  name: string;
  image_url: string;
  category: string;
  premium: boolean;
  date: string;
  quantity: number;
}

interface CompactMealGridProps {
  selectedMeals: SelectedMeal[];
  onMealSelect: (meal: Meal, quantity: number) => void;
  selectedGoal: string;
  onGoalChange: (goal: string) => void;
}

const CompactMealGrid = ({ 
  selectedMeals, 
  onMealSelect,
  selectedGoal,
  onGoalChange
}: CompactMealGridProps) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMeals(data || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMealQuantity = (mealId: string) => {
    const selectedMeal = selectedMeals.find(m => m.id === mealId);
    return selectedMeal?.quantity || 0;
  };

  const filteredMeals = categoryFilter === "all" 
    ? meals 
    : meals.filter(m => m.category === categoryFilter);

  const categories = ["all", "breakfast", "lunch", "dinner", "snack"];

  return (
    <div className="space-y-6">
      {/* Goal and Category Filters */}
      <div className="glass-strong p-6 rounded-2xl space-y-4">
        <div>
          <label className="text-sm font-semibold text-[#2B3210] mb-2 block">
            Objectif nutritionnel
          </label>
          <Select value={selectedGoal} onValueChange={onGoalChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez votre objectif" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="balanced">🎯 Équilibré</SelectItem>
              <SelectItem value="cutting">🥗 Minceur</SelectItem>
              <SelectItem value="bulking">💪 Prise de masse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-semibold text-[#2B3210] mb-2 block">
            Catégorie
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  categoryFilter === cat
                    ? 'bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white shadow-lg'
                    : 'glass text-[#505631] hover:bg-[#E5E2D9]'
                }`}
              >
                {cat === "all" ? "Tous" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          [...Array(6)].map((_, i) => <MealCardSkeleton key={i} />)
        ) : (
          filteredMeals.map((meal, index) => {
            const quantity = getMealQuantity(meal.id);
            
            return (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <Card className="glass-strong overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#DE6E27]/30 h-full">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative overflow-hidden group">
                      <motion.img 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} 
                        alt={meal.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {meal.badge && (
                        <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-[#DE6E27] text-white font-bold text-xs shadow-xl">
                          {meal.badge}
                        </div>
                      )}
                      {meal.premium && (
                        <div className="absolute top-2 right-2 px-3 py-1 rounded-full glass-dark text-white font-bold text-xs border border-white/30">
                          ⭐ Premium
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#2B3210] mb-3 line-clamp-2 min-h-[3rem]">
                        {meal.name}
                      </h3>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onMealSelect(meal, Math.max(0, quantity - 1))}
                            disabled={quantity === 0}
                            className="w-8 h-8 rounded-full glass-strong border-2 border-[#DE6E27] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4 text-[#DE6E27]" />
                          </motion.button>
                          
                          <motion.span
                            key={quantity}
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-10 text-center font-['Space_Grotesk'] text-xl font-bold text-[#2B3210]"
                          >
                            {quantity}
                          </motion.span>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onMealSelect(meal, quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center shadow-lg"
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </motion.button>
                        </div>
                        
                        {/* Selected Indicator */}
                        <AnimatePresence>
                          {quantity > 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white px-3 py-1 rounded-full font-bold text-xs shadow-xl"
                            >
                              ✓
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CompactMealGrid;
