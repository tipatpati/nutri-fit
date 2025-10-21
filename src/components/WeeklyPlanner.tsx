import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Flame, Beef, Apple, Loader2 } from "lucide-react";
import { Icon } from "./ui/icon";
import { useMeals } from "@/presentation/hooks/useMeals";
import { Link } from "react-router-dom";

const WeeklyPlanner = () => {
  const [selectedGoal, setSelectedGoal] = useState<"Prise de masse" | "Minceur" | "Équilibré">("Équilibré");
  const { data: meals = [], isLoading } = useMeals({ active: true });

  const goals = [
    { name: "Prise de masse", multiplier: 1.3, description: "Portions augmentées" },
    { name: "Équilibré", multiplier: 1.0, description: "Portions standards" },
    { name: "Minceur", multiplier: 0.8, description: "Portions réduites" }
  ];

  const currentGoal = goals.find(g => g.name === selectedGoal) || goals[1];

  const adjustNutrition = (value: number | null) => {
    if (!value) return 0;
    return Math.round(value * currentGoal.multiplier);
  };

  const getGoalColor = (goal: string) => {
    switch (goal) {
      case 'Prise de masse': 
        return { bg: 'bg-gradient-to-br from-orange-500 to-red-500', text: 'text-white', light: 'from-orange-50 to-red-50' };
      case 'Minceur': 
        return { bg: 'bg-gradient-to-br from-emerald-500 to-green-500', text: 'text-white', light: 'from-emerald-50 to-green-50' };
      case 'Équilibré': 
        return { bg: 'bg-gradient-to-br from-yellow-500 to-amber-500', text: 'text-white', light: 'from-yellow-50 to-amber-50' };
      default: 
        return { bg: 'bg-gray-500', text: 'text-white', light: 'from-gray-50 to-gray-100' };
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-10 w-10 text-[#DE6E27]" />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-32 bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass-strong rounded-full border-2 border-[#DE6E27]/20 mb-6"
          >
            <Beef className="w-5 h-5 text-[#DE6E27]" />
            <span className="font-semibold text-[#2B3210]">Menu complet</span>
          </motion.div>
          <h2 className="font-['Space_Grotesk'] text-5xl md:text-6xl lg:text-7xl font-bold text-[#2B3210] mb-6">
            Tous nos repas disponibles
          </h2>
          <p className="text-xl text-[#505631] max-w-3xl mx-auto">
            Chaque repas est disponible pour tous les objectifs - seules les quantités changent
          </p>
        </motion.div>

        {/* Goal Selector */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-12">
          <h3 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#2B3210] text-center mb-8">
            Choisissez votre objectif
          </h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
            {goals.map((goal) => {
              const colors = getGoalColor(goal.name);
              return (
                <motion.button
                  key={goal.name}
                  onClick={() => setSelectedGoal(goal.name as any)}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl transition-all duration-300 ${
                    selectedGoal === goal.name
                      ? `${colors.bg} ${colors.text} shadow-2xl scale-105`
                      : 'glass-strong border-2 border-[#DE6E27]/20 text-[#2B3210] hover:border-[#DE6E27]/40'
                  }`}
                >
                  <div className="font-['Space_Grotesk'] text-xl font-bold mb-2">{goal.name}</div>
                  <div className={`text-sm ${selectedGoal === goal.name ? 'text-white/90' : 'text-[#505631]'}`}>
                    {goal.description}
                  </div>
                  <div className={`text-lg font-bold mt-3 ${selectedGoal === goal.name ? 'text-white' : 'text-[#DE6E27]'}`}>
                    × {goal.multiplier}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Meals Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGoal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-6xl mx-auto"
          >
            {meals.map((meal, index) => {
              const colors = getGoalColor(selectedGoal);
              return (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card 
                    className="glass-strong overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#DE6E27]/30"
                  >
                    <CardHeader className={`${colors.bg} ${colors.text} p-6 relative overflow-hidden`}>
                      {/* Shine effect */}
                      <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      />
                      <div className="relative z-10">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="md-title-large mb-2">{meal.name}</CardTitle>
                            <Badge className="bg-white/20 text-white border-0">
                              {selectedGoal}
                            </Badge>
                          </div>
                          {meal.image_url && (
                            <img 
                              src={meal.image_url} 
                              alt={meal.name} 
                              className="w-16 h-16 rounded-[var(--md-sys-shape-corner-medium)] object-cover ml-4"
                            />
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                      {/* Description */}
                      <p className="text-[#505631]">
                        {meal.description}
                      </p>

                      {/* Ingredients */}
                      <div>
                        <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#2B3210] mb-3 flex items-center gap-2">
                          <Apple className="w-4 h-4" />
                          Ingrédients
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Icon name="fish" size={16} className="text-[#DE6E27]" />
                            <span className="text-sm text-[#505631]">
                              <strong className="text-[#2B3210]">Protéine:</strong> {meal.meat}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="leaves" size={16} className="text-[#DE6E27]" />
                            <span className="text-sm text-[#505631]">
                              <strong className="text-[#2B3210]">Légumes:</strong> {meal.vegetables}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="apple" size={16} className="text-[#DE6E27]" />
                            <span className="text-sm text-[#505631]">
                              <strong className="text-[#2B3210]">Glucides:</strong> {meal.carbs}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Nutritional Values */}
                      <div>
                        <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#2B3210] mb-3 flex items-center gap-2">
                          <Flame className="w-4 h-4" />
                          Valeurs nutritionnelles
                        </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Calories', value: adjustNutrition(meal.calories_per_serving) },
                        { label: 'Protéines', value: `${adjustNutrition(meal.protein_grams)}g` },
                        { label: 'Glucides', value: `${adjustNutrition(meal.carbs_grams)}g` },
                        { label: 'Lipides', value: `${adjustNutrition(meal.fat_grams)}g` }
                      ].map((item, idx) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          className="glass-strong rounded-xl p-4 text-center border border-transparent hover:border-[#DE6E27]/30 transition-all duration-300"
                        >
                          <div className="text-xs text-[#505631] mb-1">{item.label}</div>
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                            className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210]"
                          >
                            {item.value}
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/menu">
            <Button 
              size="lg"
              className="px-12 py-6 text-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-semibold"
            >
              Commander maintenant
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                <Beef className="w-5 h-5" />
              </motion.span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WeeklyPlanner;
