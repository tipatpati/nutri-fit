
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import GoalSelection from "@/components/order/GoalSelection";
import PackSelection from "@/components/order/PackSelection";
import MealSelection from "@/components/order/MealSelection";
import OrderCalendar from "@/components/order/OrderCalendar";
import OrderSummary from "@/components/order/OrderSummary";
import { MealPack } from "@/hooks/useSubscriptionPlans";

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
  const [selectedPackage, setSelectedPackage] = useState<MealPack | null>(null);
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
    return selectedPackage.meals_quantity || null;
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

  const handlePackageSelect = (pack: MealPack) => {
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

  // Animation variants for step transitions
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9] overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 py-8 lg:py-12 max-w-6xl">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 lg:mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3210] mb-3 font-['Space_Grotesk']">
            Planifier votre commande
          </h1>
          <p className="text-lg text-[#505631] max-w-3xl mx-auto font-['DM_Sans']">
            Choisissez votre objectif, vos dates et sélectionnez vos repas préférés
          </p>
        </motion.div>

        {/* Enhanced Step Indicator with Animations */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-10 lg:mb-12"
        >
          <div className="glass rounded-full p-4 flex items-center gap-2 sm:gap-3 lg:gap-4 shadow-2xl">
            {[
              { step: 'goal', label: 'Objectif', number: 1 },
              { step: 'packs', label: 'Pack', number: 2 },
              { step: 'meals', label: 'Repas', number: 3 },
              { step: 'date', label: 'Date', number: 4 },
              { step: 'summary', label: 'Résumé', number: 5 }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    currentStep === item.step
                      ? 'bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white shadow-xl'
                      : getStepStatus(currentStep, item.step)
                      ? 'bg-[#E5E2D9] text-[#2B3210]'
                      : 'bg-[#FBF8EF]/50 text-[#505631]'
                  }`}
                >
                  {getStepStatus(currentStep, item.step) ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <CheckCircle className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    item.number
                  )}
                  
                  {/* Active Step Pulse */}
                  {currentStep === item.step && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-[#DE6E27]"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                
                <span className={`ml-2 text-sm font-semibold hidden sm:block font-['DM_Sans'] transition-colors duration-300 ${
                  currentStep === item.step ? 'text-[#DE6E27]' : 'text-[#505631]'
                }`}>
                  {item.label}
                </span>
                
                {index < 4 && (
                  <motion.div 
                    className="hidden lg:block w-8 h-0.5 ml-3"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: 1,
                      backgroundColor: getStepStatus(currentStep, item.step) 
                        ? '#DE6E27' 
                        : '#E5E2D9'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Content with Page Transitions */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {currentStep === 'goal' && (
                <GoalSelection
                  selectedGoal={selectedGoal}
                  onGoalSelect={handleGoalSelect}
                  onProceed={handleGoalProceed}
                />
              )}

              {currentStep === 'packs' && (
                <div>
                  <Button
                    variant="ghost"
                    onClick={handleBackToGoal}
                    className="mb-4 text-[#505631] hover:text-[#2B3210] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Retour aux objectifs
                  </Button>
                  <PackSelection
                    selectedPackage={selectedPackage}
                    onPackageSelect={handlePackageSelect}
                  />
                </div>
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
                  selectedPackage={selectedPackage}
                  onBack={handleBackToDate}
                  onConfirm={() => console.log('Order confirmed')}
                />
              )}
            </motion.div>
          </AnimatePresence>
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
