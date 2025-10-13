import { useMeals } from "@/presentation/hooks/useMeals";
import { CategoryCTA } from "@/presentation/components/molecules/MealCategories/CategoryCTA";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { StepBadge } from "@/presentation/components/atoms/Badge/StepBadge";
import { getCategoryColor } from "@/shared/design-system";

const MealCategories = () => {
  const { data: meals = [], isLoading } = useMeals({ active: true });

  // Group meals by category
  const categories = [
    { id: 'Prise de masse', name: 'Prise de masse', description: 'Repas riches en protéines et calories pour développer votre masse musculaire de façon optimale', step: '01' },
    { id: 'Perte de poids', name: 'Perte de poids', description: 'Repas faibles en calories mais riches en nutriments essentiels pour votre bien-être', step: '02' },
    { id: 'Équilibré', name: 'Équilibré', description: 'Repas parfaitement équilibrés pour maintenir votre forme optimale au quotidien', step: '03' }
  ];

  const getMealsForCategory = (categoryName: string) => {
    return meals.filter(meal => meal.category === categoryName).slice(0, 3);
  };

  if (isLoading) {
    return (
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 mb-4">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            Comment ça fonctionne
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Votre parcours nutrition personnalisé
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Explorez nos programmes de repas santé conçus par des nutritionnistes pour répondre précisément à vos objectifs
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
          {categories.map((category) => {
            const categoryMeals = getMealsForCategory(category.id);
            const colorClasses = getCategoryColor(category.id);
            
            return (
              <Card key={category.id} className="group hover:shadow-lg transition-all duration-md-medium2 border-2 border-md-outline-variant hover:border-md-outline bg-md-surface overflow-hidden">
                <CardContent className="p-md-5 sm:p-md-6">
                  <div className="flex items-start justify-between mb-md-4">
                    <StepBadge step={category.step} />
                  </div>

                  <h3 className="md-title-large text-md-on-surface mb-md-2">{category.name}</h3>
                  <p className="md-body-medium text-md-on-surface-variant mb-md-5">{category.description}</p>

                  <div className="space-y-md-3 mb-md-5">
                    {categoryMeals.length > 0 ? (
                      categoryMeals.map((meal) => (
                        <div key={meal.id} className="group/meal border-2 border-md-outline-variant rounded-md-lg p-md-3 sm:p-md-4 hover:border-md-outline hover:shadow-md transition-all duration-md-medium2 bg-md-surface/80 backdrop-blur">
                          <div className="flex items-start justify-between mb-md-2">
                            <h5 className="md-title-small text-md-on-surface group-hover/meal:text-md-on-surface-variant transition-colors">
                              {meal.name}
                            </h5>
                            <div className="flex items-center space-x-md-1">
                              <Star className="w-3 h-3 fill-[hsl(var(--md-sys-color-tertiary))] text-md-tertiary" />
                              <span className="md-label-small text-md-on-surface-variant">4.8</span>
                            </div>
                          </div>
                          <div className="flex justify-between gap-md-2">
                            <span className="px-md-2 sm:px-md-3 py-md-1 bg-md-surface-container-high rounded-md-xs text-md-on-surface md-label-small">
                              {meal.calories_per_serving || 0} cal
                            </span>
                            <span className="px-md-2 sm:px-md-3 py-md-1 bg-md-primary-container text-md-primary-on-container rounded-md-xs md-label-small">
                              {meal.protein_grams || 0}g protéines
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-md-on-surface-variant md-body-small text-center py-md-4">Aucun repas disponible</p>
                    )}
                  </div>

                  <Link to="/menu">
                    <Button variant="ghost" className={`w-full group/btn ${colorClasses.bg} ${colorClasses.text} hover:opacity-90 transition-all duration-md-medium2`}>
                      Voir tous les repas
                      <ArrowRight className="ml-md-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-md-medium2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <CategoryCTA />
      </div>
    </section>
  );
};

export default MealCategories;
