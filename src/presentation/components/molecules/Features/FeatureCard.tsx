import { Feature } from "@/shared/data/features";
import { FeatureIcon } from "@/presentation/components/atoms/Icon/FeatureIcon";
import { GlassCard } from "@/components/ui/glass-card";

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <GlassCard className="text-center space-y-6 p-10 hover:border-[hsl(var(--md-sys-color-outline))] transition-all duration-300 group">
      {/* Glass icon circle */}
      <div className="w-16 h-16 mx-auto rounded-full glass-icon-circle flex items-center justify-center">
        <FeatureIcon icon={feature.icon} />
      </div>
      
      <div className="space-y-3">
        <h3 className="md-title-large text-[hsl(var(--md-sys-color-on-surface))] group-hover:text-[hsl(var(--md-sys-color-secondary))] transition-colors">
          {feature.title}
        </h3>
        <p className="md-body-medium text-neutral-500 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </GlassCard>
  );
};
