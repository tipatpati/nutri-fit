
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Flame, Beef, Apple } from "lucide-react";
import { Icon } from "./ui/icon";
import { useMeals } from "@/presentation/hooks/useMeals";
import { Link } from "react-router-dom";

const WeeklyPlanner = () => {
  const [selectedGoal, setSelectedGoal] = useState<"Prise de masse" | "Perte de poids" | "Équilibré">("Équilibré");
  const { data: meals = [], isLoading } = useMeals({ active: true });

  const goals = [
    { name: "Prise de masse", multiplier: 1.3, description: "Portions augmentées" },
    { name: "Équilibré", multiplier: 1.0, description: "Portions standards" },
    { name: "Perte de poids", multiplier: 0.8, description: "Portions réduites" }
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
      case 'Perte de poids': 
        return { bg: 'bg-gradient-to-br from-emerald-500 to-green-500', text: 'text-white', light: 'from-emerald-50 to-green-50' };
      case 'Équilibré': 
        return { bg: 'bg-gradient-to-br from-yellow-500 to-amber-500', text: 'text-white', light: 'from-yellow-50 to-amber-50' };
      default: 
        return { bg: 'bg-gray-500', text: 'text-white', light: 'from-gray-50 to-gray-100' };
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-[hsl(var(--md-sys-color-surface-container-low))]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-32 bg-[hsl(var(--md-sys-color-surface-container-low))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--md-sys-color-surface-container-highest))] rounded-[var(--md-sys-shape-corner-full)] md-label-medium text-[hsl(var(--md-sys-color-on-surface))] border border-[hsl(var(--md-sys-color-outline-variant))] mb-4">
            <Beef className="w-4 h-4 text-[hsl(var(--md-sys-color-secondary))]" />
            Menu complet
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--md-sys-color-on-surface))] mb-4 md:mb-6 leading-tight">
            Tous nos repas disponibles
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
            Chaque repas est disponible pour tous les objectifs - seules les quantités changent
          </p>
        </div>

        {/* Goal Selector */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-[hsl(var(--md-sys-color-on-surface))] text-center mb-6 md:mb-8">
            Choisissez votre objectif
          </h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {goals.map((goal) => {
              const colors = getGoalColor(goal.name);
              return (
                <button
                  key={goal.name}
                  onClick={() => setSelectedGoal(goal.name as any)}
                  className={`p-6 rounded-[var(--md-sys-shape-corner-large)] transition-all duration-200 ${
                    selectedGoal === goal.name
                      ? `${colors.bg} ${colors.text} md-elevation-3 scale-105`
                      : 'bg-[hsl(var(--md-sys-color-surface))] text-[hsl(var(--md-sys-color-on-surface))] border-2 border-[hsl(var(--md-sys-color-outline-variant))] hover:border-[hsl(var(--md-sys-color-outline))]'
                  }`}
                >
                  <div className="md-title-medium mb-2">{goal.name}</div>
                  <div className={`md-body-small ${selectedGoal === goal.name ? 'text-white/90' : 'text-neutral-500'}`}>
                    {goal.description}
                  </div>
                  <div className={`md-label-large mt-3 ${selectedGoal === goal.name ? 'text-white' : 'text-[hsl(var(--md-sys-color-primary))]'}`}>
                    × {goal.multiplier}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-12 max-w-6xl mx-auto">
          {meals.map((meal) => {
            const colors = getGoalColor(selectedGoal);
            return (
              <Card 
                key={meal.id}
                className="overflow-hidden hover:md-elevation-4 transition-all duration-300 border border-[hsl(var(--md-sys-color-outline-variant))]"
              >
                <CardHeader className={`${colors.bg} ${colors.text} p-6`}>
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
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  {/* Description */}
                  <p className="md-body-medium text-neutral-500">
                    {meal.description}
                  </p>

                  {/* Ingredients */}
                  <div>
                    <h4 className="md-title-small text-[hsl(var(--md-sys-color-on-surface))] mb-3 flex items-center gap-2">
                      <Apple className="w-4 h-4" />
                      Ingrédients
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="fish" size={16} className="text-[hsl(var(--md-sys-color-primary))]" />
                        <span className="md-body-small text-neutral-500">
                          <strong className="text-[hsl(var(--md-sys-color-on-surface))]">Protéine:</strong> {meal.meat}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="leaves" size={16} className="text-[hsl(var(--md-sys-color-tertiary))]" />
                        <span className="md-body-small text-neutral-500">
                          <strong className="text-[hsl(var(--md-sys-color-on-surface))]">Légumes:</strong> {meal.vegetables}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="apple" size={16} className="text-[hsl(var(--md-sys-color-secondary))]" />
                        <span className="md-body-small text-neutral-500">
                          <strong className="text-[hsl(var(--md-sys-color-on-surface))]">Glucides:</strong> {meal.carbs}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Nutritional Values */}
                  <div>
                    <h4 className="md-title-small text-[hsl(var(--md-sys-color-on-surface))] mb-3 flex items-center gap-2">
                      <Flame className="w-4 h-4" />
                      Valeurs nutritionnelles
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-[hsl(var(--md-sys-color-surface-container))] rounded-[var(--md-sys-shape-corner-medium)]">
                        <div className="md-label-small text-neutral-500">Calories</div>
                        <div className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))]">
                          {adjustNutrition(meal.calories_per_serving)}
                        </div>
                      </div>
                      <div className="p-3 bg-[hsl(var(--md-sys-color-surface-container))] rounded-[var(--md-sys-shape-corner-medium)]">
                        <div className="md-label-small text-neutral-500">Protéines</div>
                        <div className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))]">
                          {adjustNutrition(meal.protein_grams)}g
                        </div>
                      </div>
                      <div className="p-3 bg-[hsl(var(--md-sys-color-surface-container))] rounded-[var(--md-sys-shape-corner-medium)]">
                        <div className="md-label-small text-neutral-500">Glucides</div>
                        <div className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))]">
                          {adjustNutrition(meal.carbs_grams)}g
                        </div>
                      </div>
                      <div className="p-3 bg-[hsl(var(--md-sys-color-surface-container))] rounded-[var(--md-sys-shape-corner-medium)]">
                        <div className="md-label-small text-neutral-500">Lipides</div>
                        <div className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))]">
                          {adjustNutrition(meal.fat_grams)}g
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/menu">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[hsl(var(--md-sys-color-secondary))] to-[hsl(var(--md-sys-color-tertiary))] hover:opacity-90 text-white px-10 py-5 rounded-[var(--md-sys-shape-corner-large)] md-label-large transition-all duration-200"
            >
              Commander maintenant
              <Beef className="ml-2.5 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WeeklyPlanner;
