import { Feature } from "@/shared/data/features";
import { FeatureIcon } from "@/presentation/components/atoms/Icon/FeatureIcon";
import { motion } from "framer-motion";

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="text-center space-y-6 p-8 glass rounded-xl hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Icon circle with rotation on hover */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 12 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="w-20 h-20 mx-auto rounded-full bg-orange-primary/10 flex items-center justify-center"
      >
        <FeatureIcon icon={feature.icon} />
      </motion.div>
      
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-olive-dark group-hover:text-orange-primary transition-colors font-heading">
          {feature.title}
        </h3>
        <p className="text-base text-olive-muted leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};
