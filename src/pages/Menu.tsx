import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import MenuHeader from "@/components/menu/MenuHeader";
import MealGrid from "@/components/menu/MealGrid";
import CustomerReview from "@/components/menu/CustomerReview";
import FAQ from "@/components/menu/FAQ";
import { useMeals } from "@/presentation/hooks/useMeals";

const Menu = () => {
  const [selectedWeek, setSelectedWeek] = useState("8 juin 2025");
  const { data: meals = [], isLoading: loading } = useMeals({ active: true });

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

  // Transform meals to match expected format
  const transformedMeals = meals.map(meal => ({
    ...meal,
    id: meal.id, // Keep as string UUID
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 lg:py-12 max-w-full">
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
