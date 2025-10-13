import { Feature } from "@/shared/data/features";
import { FeatureIcon } from "@/presentation/components/atoms/Icon/FeatureIcon";

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <div className="text-center space-y-6 p-10 bg-[hsl(var(--md-sys-color-surface))] rounded-[var(--md-sys-shape-corner-extra-large)] border border-[hsl(var(--md-sys-color-outline-variant))] hover:border-[hsl(var(--md-sys-color-outline))] hover:md-elevation-2 transition-all duration-300">
      <FeatureIcon icon={feature.icon} />
      <div className="space-y-3">
        <h3 className="md-title-large text-[hsl(var(--md-sys-color-on-surface))]">
          {feature.title}
        </h3>
        <p className="md-body-medium text-neutral-500 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
};
