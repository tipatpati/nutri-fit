import { Feature } from "@/shared/data/features";
import { FeatureIcon } from "@/presentation/components/atoms/Icon/FeatureIcon";
import { motion } from "framer-motion";

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="glass-strong rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#DE6E27]/30 relative overflow-hidden group"
    >
      {/* Gradient on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-[#DE6E27]/5 to-transparent rounded-3xl -z-10"
      />
      
      {/* Icon with animation */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center mb-6 shadow-xl"
      >
        <FeatureIcon icon={feature.icon} className="brightness-0 invert" />
      </motion.div>
      
      <div className="space-y-3">
        <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210] mb-3 group-hover:text-[#DE6E27] transition-colors">
          {feature.title}
        </h3>
        <p className="text-[#505631] leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};
