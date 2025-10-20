import { Feature } from "@/shared/data/features";
import { FeatureIcon } from "@/presentation/components/atoms/Icon/FeatureIcon";
import { GlassCard } from "@/components/ui/glass-card";

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <div className="text-center space-y-6 p-8 bg-white/70 backdrop-blur-xl border border-[#E5E2D9] rounded-xl hover:border-[#DE6E27] hover:shadow-2xl transition-all duration-300 group hover:scale-105">
      {/* Icon circle */}
      <div className="w-20 h-20 mx-auto rounded-full bg-[#DE6E27]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#DE6E27]/20 transition-all duration-300">
        <FeatureIcon icon={feature.icon} />
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-[#2B3210] group-hover:text-[#DE6E27] transition-colors font-heading">
          {feature.title}
        </h3>
        <p className="text-base text-[#505631] leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
};
