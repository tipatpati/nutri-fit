
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GoalSelection from "@/components/order/GoalSelection";
import OrderCalendar from "@/components/order/OrderCalendar";
import MealSelection from "@/components/order/MealSelection";
import OrderSummary from "@/components/order/OrderSummary";

interface SelectedMeal {
  id: number;
  name: string;
  image: string;
  category: string;
  premium: boolean;
  date: string;
  quantity: number;
}

const Order = () => {
  const location = useLocation();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeal[]>([]);
  const [currentStep, setCurrentStep] = useState<'goal' | 'date' | 'meals' | 'summary'>('goal');

  // Handle navigation from forfaits page
  useEffect(() => {
    if (location.state?.skipToStep === 'date') {
      setCurrentStep('date');
      // Set a default goal when skipping to date step from forfaits
      setSelectedGoal('balanced');
    }
  }, [location.state]);

  // Mock kitchen capacity data - this would come from backend
  const kitchenCapacity = {
    maxMealsPerDay: 30,
    currentOrders: {
      '2025-01-03': 25,
      '2025-01-04': 30,
      '2025-01-05': 15,
    }
  };

  const isDateAvailable = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const currentOrders = kitchenCapacity.currentOrders[dateStr] || 0;
    return currentOrders < kitchenCapacity.maxMealsPerDay;
  };

  const getAvailableSlots = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const currentOrders = kitchenCapacity.currentOrders[dateStr] || 0;
    return kitchenCapacity.maxMealsPerDay - currentOrders;
  };

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
  };

  const handleGoalProceed = () => {
    setCurrentStep('date');
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && isDateAvailable(date)) {
      setCurrentStep('meals');
    }
  };

  const handleMealSelect = (meal: any, quantity: number) => {
    if (!selectedDate) return;

    const dateStr = selectedDate.toISOString().split('T')[0];
    const existingMealIndex = selectedMeals.findIndex(
      m => m.id === meal.id && m.date === dateStr
    );

    if (existingMealIndex >= 0) {
      const updated = [...selectedMeals];
      if (quantity === 0) {
        updated.splice(existingMealIndex, 1);
      } else {
        updated[existingMealIndex].quantity = quantity;
      }
      setSelectedMeals(updated);
    } else if (quantity > 0) {
      setSelectedMeals([...selectedMeals, {
        ...meal,
        date: dateStr,
        quantity
      }]);
    }
  };

  const getTotalMealsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return selectedMeals
      .filter(meal => meal.date === dateStr)
      .reduce((total, meal) => total + meal.quantity, 0);
  };

  const handleProceedToSummary = () => {
    setCurrentStep('summary');
  };

  const handleBackToMeals = () => {
    setCurrentStep('meals');
  };

  const handleBackToCalendar = () => {
    setCurrentStep('date');
    setSelectedDate(undefined);
  };

  const handleBackToGoal = () => {
    setCurrentStep('goal');
    setSelectedGoal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 lg:py-12 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-800 to-emerald-800 bg-clip-text text-transparent">
            Planifier votre commande
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choisissez votre objectif, vos dates et sélectionnez vos repas préférés pour une expérience culinaire personnalisée
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-8">
            {[
              { step: 'goal', label: 'Objectif', number: 1 },
              { step: 'date', label: 'Date', number: 2 },
              { step: 'meals', label: 'Repas', number: 3 },
              { step: 'summary', label: 'Résumé', number: 4 }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-all duration-300 ${
                  currentStep === item.step
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                    : getStepStatus(currentStep, item.step)
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {item.number}
                </div>
                <span className={`ml-2 text-xs sm:text-sm lg:text-base font-medium hidden sm:block ${
                  currentStep === item.step ? 'text-emerald-700' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
                {index < 3 && (
                  <div className="hidden lg:block w-8 h-0.5 bg-gray-200 ml-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content based on current step */}
        <div className="max-w-6xl mx-auto">
          {currentStep === 'goal' && (
            <GoalSelection
              selectedGoal={selectedGoal}
              onGoalSelect={handleGoalSelect}
              onProceed={handleGoalProceed}
            />
          )}

          {currentStep === 'date' && (
            <OrderCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              isDateAvailable={isDateAvailable}
              getAvailableSlots={getAvailableSlots}
              onBack={handleBackToGoal}
            />
          )}

          {currentStep === 'meals' && selectedDate && (
            <MealSelection
              selectedDate={selectedDate}
              selectedMeals={selectedMeals}
              onMealSelect={handleMealSelect}
              availableSlots={getAvailableSlots(selectedDate)}
              totalMealsForDate={getTotalMealsForDate(selectedDate)}
              onProceed={handleProceedToSummary}
              onBack={handleBackToCalendar}
            />
          )}

          {currentStep === 'summary' && (
            <OrderSummary
              selectedMeals={selectedMeals}
              onBack={handleBackToMeals}
              onConfirm={() => console.log('Order confirmed')}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Helper function to determine step status
const getStepStatus = (currentStep: string, targetStep: string) => {
  const steps = ['goal', 'date', 'meals', 'summary'];
  const currentIndex = steps.indexOf(currentStep);
  const targetIndex = steps.indexOf(targetStep);
  return targetIndex < currentIndex;
};

export default Order;
