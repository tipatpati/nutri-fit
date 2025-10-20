import { features } from "@/shared/data/features";
import { FeatureCard } from "@/presentation/components/molecules/Features/FeatureCard";

export const FeaturesGrid = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} />
      ))}
    </div>
  );
};
