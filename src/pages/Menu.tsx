import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuHeader from "@/components/menu/MenuHeader";
import CustomerReview from "@/components/menu/CustomerReview";
import FAQ from "@/components/menu/FAQ";
import CategoryNutritionSelector from "@/components/order/CategoryNutritionSelector";
import { useMeals } from "@/presentation/hooks/useMeals";
import EnhancedMealCard from "@/components/menu/EnhancedMealCard";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Menu = () => {
  const [selectedWeek, setSelectedWeek] = useState("8 juin 2025");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [nutritionalGoal, setNutritionalGoal] = useState<'equilibre' | 'perte_poids' | 'prise_masse'>('equilibre');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: meals = [], isLoading } = useMeals({ active: true });
  
  const filteredMeals = meals.filter(meal => {
    const matchesCategory = !selectedCategory || meal.category === selectedCategory;
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 md:py-16 lg:py-20"
        >
          <MenuHeader selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 space-y-10 md:space-y-12">
          {/* Nutritional Goal Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CategoryNutritionSelector 
              selectedCategory={nutritionalGoal}
              onSelectCategory={setNutritionalGoal}
            />
          </motion.div>

          <div>
            {/* Header with Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3210] font-['Space_Grotesk'] mb-2">
                    Nos Recettes
                  </h2>
                  <p className="text-[#505631]">
                    {filteredMeals.length} repas disponibles
                  </p>
                </div>
              </div>

              {/* Search and Filters Bar */}
              <div className="glass rounded-2xl p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#505631]" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher un repas..."
                      className="pl-12 glass border-[#E5E2D9] focus:border-[#DE6E27] h-12 rounded-xl"
                    />
                  </div>

                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === null ? 'filled' : 'outlined'}
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                      className={`rounded-xl transition-all duration-300 ${
                        selectedCategory === null 
                          ? 'bg-[#DE6E27] text-white shadow-lg' 
                          : 'glass border-[#E5E2D9] hover:border-[#DE6E27]'
                      }`}
                    >
                      Toutes
                    </Button>
                    {['Équilibré', 'Perte de poids', 'Prise de masse'].map((cat) => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? 'filled' : 'outlined'}
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                        className={`rounded-xl transition-all duration-300 ${
                          selectedCategory === cat 
                            ? 'bg-[#DE6E27] text-white shadow-lg' 
                            : 'glass border-[#E5E2D9] hover:border-[#DE6E27]'
                        }`}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Meals Grid with Animations */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="h-10 w-10 text-[#DE6E27]" />
                </motion.div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredMeals.map((meal, index) => (
                    <motion.div
                      key={meal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: index * 0.05,
                        duration: 0.4
                      }}
                    >
                      <EnhancedMealCard 
                        meal={meal}
                        selectedCategory={nutritionalGoal}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Empty State */}
            {!isLoading && filteredMeals.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-16 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#DE6E27]/10 flex items-center justify-center">
                  <Search className="w-8 h-8 text-[#DE6E27]" />
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210] mb-2">
                  Aucun repas trouvé
                </h3>
                <p className="text-[#505631] mb-6">
                  Essayez de modifier vos filtres ou votre recherche
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="bg-[#DE6E27] text-white hover:bg-[#ff8040] rounded-xl px-8 py-3"
                >
                  Réinitialiser les filtres
                </Button>
              </motion.div>
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CustomerReview />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FAQ />
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Menu;
