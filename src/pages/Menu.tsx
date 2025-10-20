import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuHeader from "@/components/menu/MenuHeader";
import CustomerReview from "@/components/menu/CustomerReview";
import FAQ from "@/components/menu/FAQ";
import CategoryNutritionSelector from "@/components/order/CategoryNutritionSelector";
import { useMeals } from "@/presentation/hooks/useMeals";
import EnhancedMealCard from "@/components/menu/EnhancedMealCard";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Menu = () => {
  const [selectedWeek, setSelectedWeek] = useState("8 juin 2025");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [nutritionalGoal, setNutritionalGoal] = useState<'equilibre' | 'perte_poids' | 'prise_masse'>('equilibre');
  
  const { data: meals = [], isLoading } = useMeals({ active: true });

  const filteredMeals = selectedCategory
    ? meals.filter((meal) => meal.category === selectedCategory)
    : meals;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9]">
        <div className="py-12 md:py-16 lg:py-20">
          <MenuHeader selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 space-y-10 md:space-y-12">
          <CategoryNutritionSelector 
            selectedCategory={nutritionalGoal}
            onSelectCategory={setNutritionalGoal}
          />

          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2B3210] font-['Space_Grotesk']">Nos Recettes</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? 'filled' : 'outlined'}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Toutes
                </Button>
                {['Équilibré', 'Perte de poids', 'Prise de masse'].map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'filled' : 'outlined'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-16 md:py-20">
                <Loader2 className="h-8 w-8 animate-spin text-[#DE6E27]" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredMeals.map((meal) => (
                  <EnhancedMealCard 
                    key={meal.id} 
                    meal={meal}
                    selectedCategory={nutritionalGoal}
                  />
                ))}
              </div>
            )}
          </div>
          
          <CustomerReview />
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Menu;
