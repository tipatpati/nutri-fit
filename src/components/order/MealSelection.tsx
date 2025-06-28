import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, ArrowLeft, ArrowRight } from "lucide-react";

interface Meal {
  id: number;
  name: string;
  image: string;
  category: string;
  premium: boolean;
  badge?: string;
}

interface SelectedMeal {
  id: number;
  name: string;
  image: string;
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
  onProceed: () => void;
  onBack: () => void;
}

const MealSelection = ({ 
  selectedDate, 
  selectedMeals, 
  onMealSelect, 
  availableSlots, 
  totalMealsForDate,
  onProceed,
  onBack
}: MealSelectionProps) => {
  // Updated meals data with working images
  const meals: Meal[] = [
    {
      id: 1,
      name: "Bol de quinoa à l'épicé",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center",
      category: "Équilibré",
      premium: false
    },
    {
      id: 2,
      name: "Crevettes à l'ail épicé",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
      category: "Perte de poids",
      premium: true
    },
    {
      id: 3,
      name: "Repas protéiné",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center",
      category: "Prise de masse",
      premium: true,
      badge: "Repas protéiné"
    },
    {
      id: 4,
      name: "Crevettes rôties avec pâtes à la tomate",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center",
      category: "Équilibré",
      premium: true,
      badge: "Repas protéiné"
    },
    {
      id: 5,
      name: "Saumon grillé aux légumes",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&crop=center",
      category: "Prise de masse",
      premium: false
    },
    {
      id: 6,
      name: "Bœuf aux champignons",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center",
      category: "Prise de masse",
      premium: false
    },
    {
      id: 7,
      name: "Salade de poulet et riz",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center",
      category: "Perte de poids",
      premium: false
    },
    {
      id: 8,
      name: "Salade de lentilles aux légumes",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop&crop=center",
      category: "Équilibré",
      premium: false
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Prise de masse":
        return "#FF4D00";
      case "Perte de poids":
        return "#113B39";
      case "Équilibré":
        return "#D4B961";
      default:
        return "#113B39";
    }
  };

  const getMealQuantity = (mealId: number) => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const selectedMeal = selectedMeals.find(m => m.id === mealId && m.date === dateStr);
    return selectedMeal?.quantity || 0;
  };

  const canAddMeal = () => {
    return totalMealsForDate < availableSlots;
  };

  const hasSelectedMeals = totalMealsForDate > 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-slate-800">
          Sélectionnez vos repas
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Pour le {selectedDate.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
        
        {/* Capacity indicator */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-3 sm:p-4 rounded-xl max-w-md mx-auto">
          <p className="text-sm sm:text-base font-medium text-emerald-800">
            {totalMealsForDate} / {availableSlots} repas sélectionnés
          </p>
          <div className="w-full bg-emerald-200 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(totalMealsForDate / availableSlots) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {meals.map((meal) => {
          const quantity = getMealQuantity(meal.id);
          
          return (
            <Card key={meal.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={meal.image} 
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
                
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-3 line-clamp-2">
                    {meal.name}
                  </h3>
                  
                  {/* Quantity selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMealSelect(meal, Math.max(0, quantity - 1))}
                        disabled={quantity === 0}
                        className="w-8 h-8 p-0 rounded-full border-emerald-300 hover:bg-emerald-50"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      
                      <span className="w-8 text-center font-semibold text-slate-800">
                        {quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMealSelect(meal, quantity + 1)}
                        disabled={!canAddMeal() && quantity === 0}
                        className="w-8 h-8 p-0 rounded-full border-emerald-300 hover:bg-emerald-50"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    {quantity > 0 && (
                      <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                        Ajouté
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 sm:pt-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au calendrier
        </Button>
        
        <Button
          onClick={onProceed}
          disabled={!hasSelectedMeals}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
        >
          Continuer
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MealSelection;
