
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
  id: string;
  name: string;
  image_url: string;
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
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  // Handle navigation from forfaits page
  useEffect(() => {
    if (location.state?.skipToStep === 'date') {
      setCurrentStep('date');
      // Set a default goal when skipping to date step from forfaits
      setSelectedGoal('balanced');
      // Store package information if coming from forfaits
      if (location.state?.packageInfo) {
        setSelectedPackage(location.state.packageInfo);
      }
    }
  }, [location.state]);

  // Get pack meal limits
  const getPackMealLimit = () => {
    if (!selectedPackage) return null;
    
    const packLimits = {
      'express': 4,
      'performance': 6,
      'semaine': 8,
      'objectif': 10
    };
    
    return packLimits[selectedPackage.id] || null;
  };

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
    // Auto-advance to next step with smooth transition
    setTimeout(() => {
      setCurrentStep('date');
    }, 600);
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
    const currentTotal = getTotalMealsForDate(selectedDate);
    const packLimit = getPackMealLimit();
    const maxLimit = packLimit || getAvailableSlots(selectedDate);
    
    const existingMealIndex = selectedMeals.findIndex(
      m => m.id === meal.id && m.date === dateStr
    );

    // If trying to add/increase quantity, check if it would exceed the limit
    if (existingMealIndex >= 0) {
      const currentQuantity = selectedMeals[existingMealIndex].quantity;
      const quantityDifference = quantity - currentQuantity;
      
      // Check if the new total would exceed the limit
      if (currentTotal + quantityDifference > maxLimit && quantity > currentQuantity) {
        return; // Don't allow if it would exceed the limit
      }
      
      const updated = [...selectedMeals];
      if (quantity === 0) {
        updated.splice(existingMealIndex, 1);
      } else {
        updated[existingMealIndex].quantity = quantity;
      }
      setSelectedMeals(updated);
    } else if (quantity > 0) {
      // Check if adding this meal would exceed the limit
      if (currentTotal + quantity > maxLimit) {
        return; // Don't allow if it would exceed the limit
      }
      
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
    <div className="min-h-screen bg-md-surface overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 py-8 lg:py-12 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-10 lg:mb-12">
          <h1 className="md-display-medium text-[hsl(var(--md-sys-color-on-surface))] mb-3">
            Planifier votre commande
          </h1>
          <p className="md-body-large text-[hsl(var(--md-sys-color-on-surface-variant))] max-w-3xl mx-auto">
            Choisissez votre objectif, vos dates et sélectionnez vos repas préférés
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-10 lg:mb-12">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
            {[
              { step: 'goal', label: 'Objectif', number: 1 },
              { step: 'date', label: 'Date', number: 2 },
              { step: 'meals', label: 'Repas', number: 3 },
              { step: 'summary', label: 'Résumé', number: 4 }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-md-medium2 ${
                  currentStep === item.step
                    ? 'bg-md-primary text-md-on-primary md-elevation-2'
                    : getStepStatus(currentStep, item.step)
                    ? 'bg-md-primary-container text-md-on-primary-container'
                    : 'bg-md-surface-variant text-md-on-surface-variant'
                }`}>
                  {item.number}
                </div>
                <span className={`ml-2 text-sm font-medium hidden sm:block ${
                  currentStep === item.step ? 'text-md-primary' : 'text-md-on-surface-variant'
                }`}>
                  {item.label}
                </span>
                {index < 3 && (
                  <div className="hidden lg:block w-10 h-0.5 bg-md-outline-variant ml-2.5"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content based on current step */}
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in">
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
                availableSlots={getPackMealLimit() || getAvailableSlots(selectedDate)}
                totalMealsForDate={getTotalMealsForDate(selectedDate)}
                packLimit={getPackMealLimit()}
                selectedPackage={selectedPackage}
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
