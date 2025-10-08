import { Feature } from "@/shared/data/features";
import { FeatureIcon } from "@/presentation/components/atoms/Icon/FeatureIcon";

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <div className="group text-center space-y-md-6 p-md-8 bg-md-surface rounded-md-3xl md-elevation-2 border border-md-outline-variant hover:shadow-2xl hover:scale-105 transition-all duration-md-long1">
      <FeatureIcon icon={feature.icon} />
      <h3 className="md-title-large text-md-on-surface group-hover:text-md-on-surface-variant transition-colors">
        {feature.title}
      </h3>
      <p className="md-body-medium text-md-on-surface-variant leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};
