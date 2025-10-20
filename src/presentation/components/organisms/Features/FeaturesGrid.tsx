import { features } from "@/shared/data/features";
import { FeatureCard } from "@/presentation/components/molecules/Features/FeatureCard";
import { motion } from "framer-motion";

export const FeaturesGrid = () => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 }
        }
      }}
      className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12 md:mb-16"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <FeatureCard feature={feature} />
        </motion.div>
      ))}
    </motion.div>
  );
};
