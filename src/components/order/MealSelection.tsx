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
  selectedDate: Date;
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
        <h2 className="md-headline-large mb-md-2 sm:mb-md-4 text-md-on-surface">
          Sélectionnez vos repas
        </h2>
        <p className="md-body-medium text-md-on-surface-variant mb-md-4">
          Pour le {selectedDate.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
        
        {/* Capacity indicator */}
        <div className="bg-md-primary-container p-md-3 sm:p-md-4 rounded-md-lg max-w-md mx-auto">
          {selectedPackage ? (
            <>
              <p className="md-label-medium text-md-primary-on-container mb-md-1">
                {selectedPackage.title}
              </p>
              <p className="md-body-medium text-md-primary-on-container">
                {totalMealsForDate} / {packLimit} repas sélectionnés
              </p>
            </>
          ) : (
            <p className="md-body-medium text-md-primary-on-container">
              {totalMealsForDate} / {availableSlots} repas sélectionnés
            </p>
          )}
          <div className="w-full bg-md-primary-container-variant rounded-full h-2 mt-md-2">
            <div 
              className="bg-gradient-to-r from-md-primary to-md-tertiary h-2 rounded-full transition-all duration-md-medium2"
              style={{ width: `${(totalMealsForDate / (packLimit || availableSlots)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md-4 sm:gap-md-6">
        {loading ? (
          [...Array(8)].map((_, i) => <MealCardSkeleton key={i} />)
        ) : (
          meals.map((meal) => {
          const quantity = getMealQuantity(meal.id);
          
          return (
            <Card key={meal.id} className="overflow-hidden hover:shadow-xl transition-all duration-md-medium2 bg-md-surface backdrop-blur-sm border-md-outline-variant md-elevation-1">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'} 
                    alt={meal.name}
                    className="w-full h-40 sm:h-48 object-cover"
                    loading="lazy"
                  />
                  {meal.badge && (
                    <div 
                      className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-1 rounded-full text-white text-xs font-semibold backdrop-blur-sm shadow-lg"
                      style={{ backgroundColor: getCategoryColor(meal.category) }}
                    >
                      {meal.badge}
                    </div>
                  )}
                  {meal.premium && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Premium
                    </div>
                  )}
                </div>
                
                <div className="p-md-3 sm:p-md-4">
                  <h3 className="md-title-medium text-md-on-surface mb-md-3 line-clamp-2">
                    {meal.name}
                  </h3>
                  
                  {/* Quantity selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-md-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMealSelect(meal, Math.max(0, quantity - 1))}
                        disabled={quantity === 0}
                        className="w-8 h-8 p-0 rounded-full border-md-primary hover:bg-md-primary-container"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      
                      <span className="w-8 text-center font-semibold text-md-on-surface">
                        {quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMealSelect(meal, quantity + 1)}
                        disabled={!canAddMeal() && quantity === 0}
                        className="w-8 h-8 p-0 rounded-full border-md-primary hover:bg-md-primary-container"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    {quantity > 0 && (
                      <div className="bg-md-primary-container text-md-primary-on-container px-md-2 py-md-1 rounded-full md-label-small">
                        Ajouté
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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-md-4 pt-md-6 sm:pt-md-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-2 border-md-outline text-md-on-surface hover:bg-md-surface-container px-md-6 py-md-3 rounded-md-lg font-semibold w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-md-2" />
          Retour au calendrier
        </Button>
        
        <Button
          onClick={onProceed}
          disabled={!hasSelectedMeals}
          className="bg-md-primary text-md-on-primary hover:bg-md-primary/90 px-md-8 py-md-3 rounded-md-lg font-semibold md-elevation-2 hover:md-elevation-3 transition-all duration-md-medium2 w-full sm:w-auto"
        >
          Continuer
          <ArrowRight className="w-4 h-4 ml-md-2" />
        </Button>
      </div>
    </div>
  );
};

export default MealSelection;
