import { features } from "@/shared/data/features";
import { FeatureCard } from "@/presentation/components/molecules/Features/FeatureCard";

export const FeaturesGrid = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-md-8 mb-md-20">
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} />
      ))}
    </div>
  );
};
