import { Award } from "lucide-react";
import { FeaturesGrid } from "./FeaturesGrid";
import { TestimonialSection } from "./TestimonialSection";

const Features = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-700 mb-4 border border-slate-200">
            <Award className="w-4 h-4 text-orange-500" />
            Pourquoi nous choisir
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Le choix numéro 1 des sportifs
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Votre partenaire de confiance pour atteindre vos objectifs de prise de masse, perte de poids ou régime équilibré
          </p>
        </div>

        <FeaturesGrid />
        <TestimonialSection />
      </div>
    </section>
  );
};

export default Features;
