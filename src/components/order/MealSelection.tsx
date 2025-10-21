import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MealCardSkeleton } from "@/presentation/components/molecules/Loading/MealCardSkeleton";
import { getCategoryColor } from "@/shared/design-system";
import { motion, AnimatePresence } from "framer-motion";

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

interface MealSelectionProps {
  selectedDate?: Date | undefined;
  selectedMeals: SelectedMeal[];
  onMealSelect: (meal: Meal, quantity: number) => void;
  availableSlots: number;
  totalMealsForDate: number;
  packLimit?: number | null;
  selectedPackage?: any;
  onProceed: () => void;
  onBack: () => void;
}

const MealSelection = ({ 
  selectedDate, 
  selectedMeals, 
  onMealSelect, 
  availableSlots, 
  totalMealsForDate,
  packLimit,
  selectedPackage,
  onProceed,
  onBack
}: MealSelectionProps) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const { data, error } = await supabase
        .from('meals')
        .select('*')
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
    if (!selectedDate) {
      // When no date is selected, check meals without date filter
      const selectedMeal = selectedMeals.find(m => m.id === mealId);
      return selectedMeal?.quantity || 0;
    }
    const dateStr = selectedDate.toISOString().split('T')[0];
    const selectedMeal = selectedMeals.find(m => m.id === mealId && m.date === dateStr);
    return selectedMeal?.quantity || 0;
  };

  const canAddMeal = () => {
    const limit = packLimit || availableSlots;
    return totalMealsForDate < limit;
  };

  const hasSelectedMeals = totalMealsForDate > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-[#2B3210] mb-3">
            Sélectionnez vos repas
          </h2>
          {selectedDate ? (
            <p className="text-xl text-[#505631] mb-6 capitalize">
              {selectedDate.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          ) : (
            <p className="text-xl text-[#505631] mb-6">
              Choisissez les repas que vous souhaitez commander
            </p>
          )}
        </motion.div>
        
        {/* Enhanced Capacity Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-strong p-6 rounded-2xl max-w-md mx-auto shadow-xl border-2 border-[#DE6E27]/30"
        >
          {selectedPackage ? (
            <>
              <p className="font-semibold text-[#2B3210] mb-2">
                {selectedPackage.name}
              </p>
              <p className="font-['Space_Grotesk'] text-3xl font-bold text-[#2B3210] mb-3">
                {totalMealsForDate} / {packLimit} repas
              </p>
            </>
          ) : (
            <p className="font-['Space_Grotesk'] text-3xl font-bold text-[#2B3210] mb-3">
              {totalMealsForDate} / {availableSlots} repas
            </p>
          )}
          <div className="w-full bg-[#E5E2D9] rounded-full h-3 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(totalMealsForDate / (packLimit || availableSlots)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-3 rounded-full bg-gradient-to-r from-[#DE6E27] to-[#ff8040] shadow-lg"
            />
          </div>
        </motion.div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          [...Array(8)].map((_, i) => <MealCardSkeleton key={i} />)
        ) : (
          meals.map((meal, index) => {
          const quantity = getMealQuantity(meal.id);
          
          return (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              layout
            >
              <Card className="glass-strong overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#DE6E27]/30 h-full">
                <CardContent className="p-0">
                  {/* Image with overlay */}
                  <div className="relative overflow-hidden group">
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      src={meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} 
                      alt={meal.name}
                      className="w-full h-52 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badges */}
                    {meal.badge && (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="absolute top-3 left-3 px-4 py-2 rounded-full bg-[#DE6E27] text-white font-bold text-sm shadow-xl"
                      >
                        {meal.badge}
                      </motion.div>
                    )}
                    {meal.premium && (
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="absolute top-3 right-3 px-4 py-2 rounded-full glass-dark text-white font-bold text-sm border border-white/30"
                      >
                        ⭐ Premium
                      </motion.div>
                    )}
                    
                    {/* Quick Add Overlay */}
                    {quantity === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-[#DE6E27]/90 flex items-center justify-center cursor-pointer"
                        onClick={() => onMealSelect(meal, 1)}
                      >
                        <span className="text-white font-bold text-lg">+ Ajouter</span>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210] mb-4 line-clamp-2 min-h-[3.5rem]">
                      {meal.name}
                    </h3>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onMealSelect(meal, Math.max(0, quantity - 1))}
                          disabled={quantity === 0}
                          className="w-10 h-10 rounded-full glass-strong border-2 border-[#DE6E27] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-5 h-5 text-[#DE6E27]" />
                        </motion.button>
                        
                        <motion.span
                          key={quantity}
                          initial={{ scale: 1.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-12 text-center font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210]"
                        >
                          {quantity}
                        </motion.span>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onMealSelect(meal, quantity + 1)}
                          disabled={!canAddMeal()}
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                          <Plus className="w-5 h-5 text-white" />
                        </motion.button>
                      </div>
                      
                      {/* Selected Indicator */}
                      <AnimatePresence>
                        {quantity > 0 && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white px-4 py-2 rounded-full font-bold text-sm shadow-xl"
                          >
                            ✓ Ajouté
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

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-md-3 pt-md-8">
        <Button
          variant="outlined"
          size="lg"
          onClick={onBack}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="w-5 h-5 mr-md-2" />
          Retour au calendrier
        </Button>
        
        <Button
          variant="filled"
          size="lg"
          onClick={onProceed}
          disabled={!hasSelectedMeals}
          className="w-full sm:w-auto px-md-8"
        >
          Continuer
          <ArrowRight className="w-5 h-5 ml-md-2" />
        </Button>
      </div>
    </div>
  );
};

export default MealSelection;
