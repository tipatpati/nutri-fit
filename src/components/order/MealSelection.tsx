import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MealCardSkeleton } from "@/presentation/components/molecules/Loading/MealCardSkeleton";
import { getCategoryColor } from "@/shared/design-system";

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
    <div className="space-y-md-6 sm:space-y-md-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="md-headline-medium mb-md-3 text-md-on-surface">
          Sélectionnez vos repas
        </h2>
        {selectedDate ? (
          <p className="md-body-large text-md-on-surface-variant mb-md-5 capitalize">
            {selectedDate.toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        ) : (
          <p className="md-body-large text-md-on-surface-variant mb-md-5">
            Choisissez les repas que vous souhaitez commander
          </p>
        )}
        
        {/* Capacity indicator */}
        <div className="bg-md-primary-container p-md-4 sm:p-md-5 rounded-md-lg max-w-md mx-auto md-elevation-1 border border-md-outline-variant">
          {selectedPackage ? (
            <>
              <p className="md-label-large text-md-on-primary-container mb-md-1">
                {selectedPackage.title}
              </p>
              <p className="md-title-medium text-md-on-primary-container font-semibold">
                {totalMealsForDate} / {packLimit} repas sélectionnés
              </p>
            </>
          ) : (
            <p className="md-title-medium text-md-on-primary-container font-semibold">
              {totalMealsForDate} / {availableSlots} repas sélectionnés
            </p>
          )}
          <div className="w-full bg-md-surface-variant/30 rounded-full h-3 mt-md-3">
            <div 
              className="bg-md-primary h-3 rounded-full transition-all duration-md-medium2"
              style={{ width: `${(totalMealsForDate / (packLimit || availableSlots)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md-4 sm:gap-md-5">
        {loading ? (
          [...Array(8)].map((_, i) => <MealCardSkeleton key={i} />)
        ) : (
          meals.map((meal) => {
          const quantity = getMealQuantity(meal.id);
          
          return (
            <Card key={meal.id} className="overflow-hidden hover:md-elevation-3 transition-all duration-md-medium2 bg-md-surface-container border-md-outline-variant border md-elevation-1">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'} 
                    alt={meal.name}
                    className="w-full h-48 sm:h-52 object-cover"
                    loading="lazy"
                  />
                  {meal.badge && (
                    <div 
                      className="absolute top-md-2 left-md-2 px-md-3 py-md-1 rounded-md-sm text-white md-label-medium font-semibold backdrop-blur-sm md-elevation-2"
                      style={{ backgroundColor: getCategoryColor(meal.category).hex }}
                    >
                      {meal.badge}
                    </div>
                  )}
                  {meal.premium && (
                    <div className="absolute top-md-2 right-md-2 bg-md-tertiary text-md-on-tertiary px-md-3 py-md-1 rounded-md-sm md-label-medium font-semibold md-elevation-2">
                      Premium
                    </div>
                  )}
                </div>
                
                <div className="p-md-4">
                  <h3 className="md-title-medium text-md-on-surface mb-md-4 line-clamp-2 min-h-[3rem]">
                    {meal.name}
                  </h3>
                  
                  {/* Quantity selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-md-2">
                      <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => onMealSelect(meal, Math.max(0, quantity - 1))}
                        disabled={quantity === 0}
                        className="w-9 h-9 p-0 rounded-full"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      
                      <span className="w-10 text-center md-title-medium font-bold text-md-on-surface">
                        {quantity}
                      </span>
                      
                      <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => onMealSelect(meal, quantity + 1)}
                        disabled={!canAddMeal()}
                        className="w-9 h-9 p-0 rounded-full"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {quantity > 0 && (
                      <div className="bg-md-primary text-md-on-primary px-md-3 py-md-1 rounded-full md-label-medium font-semibold">
                        ✓
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
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
