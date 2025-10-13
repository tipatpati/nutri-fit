import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import MenuHeader from "@/components/menu/MenuHeader";
import MealGrid from "@/components/menu/MealGrid";
import CustomerReview from "@/components/menu/CustomerReview";
import FAQ from "@/components/menu/FAQ";
import { useMeals } from "@/presentation/hooks/useMeals";
import { getCategoryColor } from "@/shared/design-system";

const Menu = () => {
  const [selectedWeek, setSelectedWeek] = useState("8 juin 2025");
  const { data: meals = [], isLoading: loading } = useMeals({ active: true });

  // Transform meals to match expected format
  const transformedMeals = meals.map(meal => ({
    ...meal,
    id: meal.id, // Keep as string UUID
  }));

  return (
    <div className="min-h-screen md-surface">
      <Header />
      
      <main className="container mx-auto px-md-2 sm:px-md-3 py-md-3 sm:py-md-4 lg:py-md-6 max-w-full">
        <MenuHeader selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />
        
        <MealGrid meals={transformedMeals as any} getCategoryColor={getCategoryColor} />

        {/* Order Button */}
        <div className="text-center mb-8 sm:mb-16 lg:mb-20 px-2">
          <Button 
            variant="filled"
            size="lg"
            className="px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 md-elevation-2 w-full sm:w-auto"
            onClick={() => window.location.href = '/order'}
          >
            Commander
          </Button>
        </div>

        <CustomerReview />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
