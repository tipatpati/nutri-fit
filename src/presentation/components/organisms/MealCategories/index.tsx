import { mealCategories } from "@/shared/data/mealCategories";
import { CategoryCard } from "@/presentation/components/molecules/MealCategories/CategoryCard";
import { CategoryCTA } from "@/presentation/components/molecules/MealCategories/CategoryCTA";

const MealCategories = () => {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 mb-6">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            Comment ça fonctionne
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Votre parcours nutrition personnalisé
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Explorez nos programmes de repas santé conçus par des nutritionnistes pour répondre précisément à vos objectifs
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
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
