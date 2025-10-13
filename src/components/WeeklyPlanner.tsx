
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Flame, Beef, Apple } from "lucide-react";
import { Icon } from "./ui/icon";
import { useMeals } from "@/presentation/hooks/useMeals";
import { Link } from "react-router-dom";

const WeeklyPlanner = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const { data: meals = [], isLoading } = useMeals({ active: true });

  const categories = ["Tous", "Prise de masse", "Perte de poids", "Équilibré"];

  const filteredMeals = selectedCategory === "Tous" 
    ? meals 
    : meals.filter(meal => meal.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Prise de masse': 
        return { bg: 'bg-gradient-to-br from-orange-500 to-red-500', text: 'text-white' };
      case 'Perte de poids': 
        return { bg: 'bg-gradient-to-br from-emerald-500 to-green-500', text: 'text-white' };
      case 'Équilibré': 
        return { bg: 'bg-gradient-to-br from-yellow-500 to-amber-500', text: 'text-white' };
      default: 
        return { bg: 'bg-gray-500', text: 'text-white' };
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
    <section className="py-20 lg:py-28 bg-[hsl(var(--md-sys-color-surface-container-low))]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--md-sys-color-surface-container-highest))] rounded-[var(--md-sys-shape-corner-full)] md-label-medium text-[hsl(var(--md-sys-color-on-surface))] border border-[hsl(var(--md-sys-color-outline-variant))] mb-4">
            <Beef className="w-4 h-4 text-[hsl(var(--md-sys-color-secondary))]" />
            Menu complet
          </div>
          <h2 className="md-display-large text-[hsl(var(--md-sys-color-on-surface))] mb-4">
            Nos repas par objectif
          </h2>
          <p className="md-body-large text-neutral-500 max-w-3xl mx-auto leading-relaxed">
            Découvrez tous nos repas avec leurs ingrédients et valeurs nutritionnelles
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-[var(--md-sys-shape-corner-full)] md-label-large transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-[hsl(var(--md-sys-color-primary))] text-white md-elevation-2'
                  : 'bg-[hsl(var(--md-sys-color-surface))] text-[hsl(var(--md-sys-color-on-surface))] border border-[hsl(var(--md-sys-color-outline-variant))] hover:border-[hsl(var(--md-sys-color-outline))]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Meals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredMeals.map((meal) => {
            const colors = getCategoryColor(meal.category);
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
                        {meal.category}
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
                          {meal.calories_per_serving || 0}
                        </div>
                      </div>
                      <div className="p-3 bg-[hsl(var(--md-sys-color-surface-container))] rounded-[var(--md-sys-shape-corner-medium)]">
                        <div className="md-label-small text-neutral-500">Protéines</div>
                        <div className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))]">
                          {meal.protein_grams || 0}g
                        </div>
                      </div>
                      <div className="p-3 bg-[hsl(var(--md-sys-color-surface-container))] rounded-[var(--md-sys-shape-corner-medium)]">
                        <div className="md-label-small text-neutral-500">Glucides</div>
                        <div className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))]">
                          {meal.carbs_grams || 0}g
                        </div>
                      </div>
                      <div className="p-3 bg-[hsl(var(--md-sys-color-surface-container))] rounded-[var(--md-sys-shape-corner-medium)]">
                        <div className="md-label-small text-neutral-500">Lipides</div>
                        <div className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))]">
                          {meal.fat_grams || 0}g
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
