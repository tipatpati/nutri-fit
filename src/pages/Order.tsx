
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnifiedOrderLayout from "@/components/order/UnifiedOrderLayout";
import CompactMealGrid from "@/components/order/CompactMealGrid";
import CompactOrderSidebar from "@/components/order/CompactOrderSidebar";
import { useSubscriptionPlans } from "@/hooks/useSubscriptionPlans";
import { toast } from "@/hooks/use-toast";

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
  const [selectedGoal, setSelectedGoal] = useState<string>('equilibre');
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeal[]>([]);
  const { data: plans = [] } = useSubscriptionPlans();

  // Sync meal selection when pack changes
  useEffect(() => {
    if (!selectedPackId) return;

    const selectedPack = plans.find(p => p.id === selectedPackId);
    if (!selectedPack) return;

    const maxMeals = selectedPack.meals_quantity;
    const currentTotal = selectedMeals.reduce((sum, m) => sum + m.quantity, 0);

    // If current selection exceeds new pack limit, trim excess
    if (currentTotal > maxMeals) {
      let remaining = maxMeals;
      const trimmedMeals = selectedMeals
        .map(meal => {
          if (remaining <= 0) return null;
          const allowedQty = Math.min(meal.quantity, remaining);
          remaining -= allowedQty;
          return { ...meal, quantity: allowedQty };
        })
        .filter((m): m is SelectedMeal => m !== null && m.quantity > 0);

      setSelectedMeals(trimmedMeals);
      
      toast({
        title: "Sélection ajustée",
        description: `Votre sélection a été réduite pour correspondre au pack de ${maxMeals} repas`,
        variant: "default"
      });
    }
  }, [selectedPackId, plans]);

  const handleMealSelect = (meal: any, quantity: number) => {
    const existingMealIndex = selectedMeals.findIndex(m => m.id === meal.id);

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
        date: 'pending',
        quantity
      }]);
    }
  };

  const handleRemoveMeal = (mealId: string) => {
    setSelectedMeals(selectedMeals.filter(m => m.id !== mealId));
  };

  const calculateTotalPrice = () => {
    return selectedMeals.reduce((total, meal) => {
      const basePrice = meal.premium ? 1200 : 800;
      return total + (basePrice * meal.quantity);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9]">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 py-8 lg:py-12 max-w-7xl">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3210] mb-3 font-['Space_Grotesk']">
            Commandez vos repas
          </h1>
          <p className="text-lg text-[#505631] max-w-3xl mx-auto font-['DM_Sans']">
            Sélectionnez vos repas préférés et finalisez votre commande en quelques clics
          </p>
        </motion.div>

        {/* Unified Layout */}
        <UnifiedOrderLayout
          mealGrid={
            <CompactMealGrid
              selectedMeals={selectedMeals}
              onMealSelect={handleMealSelect}
              selectedGoal={selectedGoal}
              onGoalChange={setSelectedGoal}
              selectedPackId={selectedPackId}
              onPackSelect={setSelectedPackId}
            />
          }
          orderSidebar={
            <CompactOrderSidebar
              selectedMeals={selectedMeals}
              onRemoveMeal={handleRemoveMeal}
              totalPrice={calculateTotalPrice()}
              selectedPackId={selectedPackId}
            />
          }
        />
      </main>

      <Footer />
    </div>
  );
};

export default Order;
