import { features } from "@/shared/data/features";
import { FeatureCard } from "@/presentation/components/molecules/Features/FeatureCard";
import { motion } from "framer-motion";

export const FeaturesGrid = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12 md:mb-16">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
        >
          <FeatureCard feature={feature} />
        </motion.div>
      ))}
    </div>
  );
};
