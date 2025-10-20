import { Award } from "lucide-react";
import { FeaturesGrid } from "./FeaturesGrid";
import { TestimonialSection } from "./TestimonialSection";

const Features = () => {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DE6E27]/10 rounded-full text-sm font-semibold text-[#DE6E27] border border-[#DE6E27]/20 mb-6">
            <Award className="w-5 h-5" />
            Pourquoi nous choisir
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#2B3210] mb-6 leading-tight font-heading">
            Le choix numéro 1 des sportifs
          </h2>
          <p className="text-lg md:text-xl text-[#505631] leading-relaxed">
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
