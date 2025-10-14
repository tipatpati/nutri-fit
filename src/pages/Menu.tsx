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
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <MenuHeader selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />
        
        <div className="container mx-auto px-4 py-12 space-y-12">
          <CategoryNutritionSelector 
            selectedCategory={nutritionalGoal}
            onSelectCategory={setNutritionalGoal}
          />

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Nos Recettes</h2>
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Toutes
                </Button>
                {['Équilibré', 'Perte de poids', 'Prise de masse'].map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
