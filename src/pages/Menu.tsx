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

        {/* Load More Button */}
        <div className="text-center mb-8 sm:mb-16 lg:mb-20 px-2">
          <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
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
