import { Award } from "lucide-react";
import { FeaturesGrid } from "./FeaturesGrid";
import { TestimonialSection } from "./TestimonialSection";

const Features = () => {
  return (
    <section className="py-md-16 sm:py-md-20 lg:py-md-24 bg-gradient-to-br from-md-surface via-md-surface-container-low to-md-surface">
      <div className="container mx-auto px-md-4 sm:px-md-6 lg:px-md-8">
        <div className="text-center mb-md-20">
          <div className="inline-flex items-center px-md-4 py-md-2 bg-md-primary-container text-md-primary-on-container rounded-full font-medium md-label-large mb-md-6">
            <Award className="w-4 h-4 mr-md-2" />
            Pourquoi nous choisir
          </div>
          <h2 className="md-display-medium mb-md-6 bg-gradient-to-r from-md-on-surface to-md-on-surface-variant bg-clip-text text-transparent">
            Le choix numéro 1 des sportifs
          </h2>
          <p className="md-body-large text-md-on-surface-variant max-w-3xl mx-auto leading-relaxed">
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
