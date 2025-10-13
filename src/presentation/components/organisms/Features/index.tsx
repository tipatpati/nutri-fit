import { Award } from "lucide-react";
import { FeaturesGrid } from "./FeaturesGrid";
import { TestimonialSection } from "./TestimonialSection";

const Features = () => {
  return (
    <section className="py-20 lg:py-28 bg-[hsl(var(--md-sys-color-surface-container-low))]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-14 max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--md-sys-color-surface-container-highest))] rounded-[var(--md-sys-shape-corner-full)] md-label-medium text-[hsl(var(--md-sys-color-on-surface))] mb-4 border border-[hsl(var(--md-sys-color-outline-variant))]">
            <Award className="w-4 h-4 text-[hsl(var(--md-sys-color-secondary))]" />
            Pourquoi nous choisir
          </div>
          <h2 className="md-display-large text-[hsl(var(--md-sys-color-on-surface))] mb-4">
            Le choix numéro 1 des sportifs
          </h2>
          <p className="md-body-large text-[hsl(var(--md-sys-color-on-surface-variant))] leading-relaxed">
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
