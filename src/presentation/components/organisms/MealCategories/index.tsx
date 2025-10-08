import { mealCategories } from "@/shared/data/mealCategories";
import { CategoryCard } from "@/presentation/components/molecules/MealCategories/CategoryCard";
import { CategoryCTA } from "@/presentation/components/molecules/MealCategories/CategoryCTA";

const MealCategories = () => {
  return (
    <section className="py-md-16 sm:py-md-20 lg:py-md-24 bg-gradient-to-b from-md-surface via-md-surface-container-low to-md-surface">
      <div className="container mx-auto px-md-4 sm:px-md-6 lg:px-md-8">
        <div className="text-center mb-md-12 lg:mb-md-16">
          <div className="inline-flex items-center px-md-3 sm:px-md-4 py-md-2 bg-md-primary-container text-md-primary-on-container rounded-full font-medium md-label-large mb-md-4 lg:mb-md-6">
            <span className="w-2 h-2 bg-md-primary rounded-full mr-md-2"></span>
            Comment ça fonctionne
          </div>
          <h2 className="md-display-medium mb-md-4 lg:mb-md-6 bg-gradient-to-r from-md-on-surface to-md-on-surface-variant bg-clip-text text-transparent">
            Votre parcours nutrition personnalisé
          </h2>
          <p className="md-body-large text-md-on-surface-variant max-w-3xl mx-auto leading-relaxed px-md-2">
            Explorez nos programmes de repas santé conçus par des nutritionnistes pour répondre précisément à vos objectifs de remise en forme
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-md-6 lg:gap-md-8">
          {mealCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <CategoryCTA />
      </div>
    </section>
  );
};

export default MealCategories;
