import { Feature } from "@/shared/data/features";
import { FeatureIcon } from "@/presentation/components/atoms/Icon/FeatureIcon";

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <div className="group text-center space-y-6 p-8 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200">
      <FeatureIcon icon={feature.icon} />
      <h3 className="text-xl font-bold text-slate-900">
        {feature.title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};
