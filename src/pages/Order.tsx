
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GoalSelection from "@/components/order/GoalSelection";
import PackSelection from "@/components/order/PackSelection";
import MealSelection from "@/components/order/MealSelection";
import OrderCalendar from "@/components/order/OrderCalendar";
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
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeal[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState<'goal' | 'packs' | 'meals' | 'date' | 'summary'>('goal');

  // Handle navigation from forfaits page
  useEffect(() => {
    if (location.state?.skipToStep === 'packs') {
      setCurrentStep('packs');
      // Set a default goal when skipping to packs step from forfaits
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
      setCurrentStep('packs');
    }, 600);
  };

  const handleGoalProceed = () => {
    setCurrentStep('packs');
  };

  const handlePackageSelect = (pack: any) => {
    setSelectedPackage(pack);
    // Auto-advance to next step with smooth transition
    setTimeout(() => {
      setCurrentStep('meals');
    }, 600);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      // Assign the selected date to all pending meals
      const dateStr = date.toISOString().split('T')[0];
      const updatedMeals = selectedMeals.map(meal => 
        meal.date === 'pending' ? { ...meal, date: dateStr } : meal
      );
      setSelectedMeals(updatedMeals);
      setSelectedDate(date);
      
      // Auto-advance to summary
      setTimeout(() => {
        setCurrentStep('summary');
      }, 600);
    }
  };

  const handleMealSelect = (meal: any, quantity: number) => {
    // When no date is selected yet, store meals without date
    const dateStr = selectedDate ? selectedDate.toISOString().split('T')[0] : 'pending';
    
    const existingMealIndex = selectedMeals.findIndex(
      m => m.id === meal.id && m.date === dateStr
    );

    // If trying to add/increase quantity, check if it would exceed the limit
    if (existingMealIndex >= 0) {
      const currentQuantity = selectedMeals[existingMealIndex].quantity;
      const quantityDifference = quantity - currentQuantity;
      
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

  const getTotalMealsForDate = (date: Date | undefined) => {
    if (!date) {
      // When no date selected, count all pending meals
      return selectedMeals
        .filter(meal => meal.date === 'pending')
        .reduce((total, meal) => total + meal.quantity, 0);
    }
    const dateStr = date.toISOString().split('T')[0];
    return selectedMeals
      .filter(meal => meal.date === dateStr)
      .reduce((total, meal) => total + meal.quantity, 0);
  };

  const handleProceedToDate = () => {
    setCurrentStep('date');
  };

  const handleBackToDate = () => {
    setCurrentStep('date');
  };

  const handleBackToMeals = () => {
    setCurrentStep('meals');
    setSelectedDate(undefined);
  };

  const handleBackToPacks = () => {
    setCurrentStep('packs');
    setSelectedMeals([]);
  };

  const handleBackToGoal = () => {
    setCurrentStep('goal');
    setSelectedPackage(null);
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
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {[
              { step: 'goal', label: 'Objectif', number: 1 },
              { step: 'packs', label: 'Pack', number: 2 },
              { step: 'meals', label: 'Repas', number: 3 },
              { step: 'date', label: 'Date', number: 4 },
              { step: 'summary', label: 'Résumé', number: 5 }
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
                {index < 4 && (
                  <div className="hidden lg:block w-8 h-0.5 bg-md-outline-variant ml-2.5"></div>
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

            {currentStep === 'packs' && (
              <PackSelection
                selectedPackage={selectedPackage}
                onPackageSelect={handlePackageSelect}
              />
            )}

            {currentStep === 'meals' && (
              <MealSelection
                selectedDate={selectedDate}
                selectedMeals={selectedMeals}
                onMealSelect={handleMealSelect}
                availableSlots={getPackMealLimit() || 50}
                totalMealsForDate={getTotalMealsForDate(undefined)}
                packLimit={getPackMealLimit()}
                selectedPackage={selectedPackage}
                onProceed={handleProceedToDate}
                onBack={handleBackToPacks}
              />
            )}

            {currentStep === 'date' && (
              <OrderCalendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                isDateAvailable={isDateAvailable}
                getAvailableSlots={getAvailableSlots}
                onBack={handleBackToMeals}
              />
            )}

            {currentStep === 'summary' && (
              <OrderSummary
                selectedMeals={selectedMeals}
                onBack={handleBackToDate}
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
  const steps = ['goal', 'packs', 'meals', 'date', 'summary'];
  const currentIndex = steps.indexOf(currentStep);
  const targetIndex = steps.indexOf(targetStep);
  return targetIndex < currentIndex;
};

export default Order;
