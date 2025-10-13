import { CategoryCTA } from "@/presentation/components/molecules/MealCategories/CategoryCTA";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getCategoryColor } from "@/shared/design-system";

const MealCategories = () => {
  const categories = [
    { id: 'Prise de masse', name: 'Prise de masse', description: 'Repas riches en protéines et calories pour développer votre masse musculaire de façon optimale', step: '01' },
    { id: 'Perte de poids', name: 'Perte de poids', description: 'Repas faibles en calories mais riches en nutriments essentiels pour votre bien-être', step: '02' },
    { id: 'Équilibré', name: 'Équilibré', description: 'Repas parfaitement équilibrés pour maintenir votre forme optimale au quotidien', step: '03' }
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Choisissez votre objectif
          </h2>
          <p className="text-lg text-slate-600">
            Sélectionnez le programme adapté à vos besoins
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {categories.map((category) => {
            const colorClasses = getCategoryColor(category.id);
            
            return (
              <Link key={category.id} to="/menu">
                <Card className="group h-full hover:shadow-xl transition-all duration-300 border-2 border-md-outline-variant hover:border-md-primary cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClasses.bg} mb-4`}>
                        <span className={`text-2xl font-bold ${colorClasses.text}`}>{category.step}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-md-on-surface mb-3">{category.name}</h3>
                      <p className="text-md-on-surface-variant">{category.description}</p>
                    </div>
                    
                    <Button variant="ghost" className={`w-full ${colorClasses.bg} ${colorClasses.text} hover:opacity-90`}>
                      Découvrir
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <CategoryCTA />
      </div>
    </section>
  );
};

export default MealCategories;
