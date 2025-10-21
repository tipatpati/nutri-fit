import { Award } from "lucide-react";
import { motion } from "framer-motion";
import { FeaturesGrid } from "./FeaturesGrid";
import { TestimonialSection } from "./TestimonialSection";

const Features = () => {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-gradient-to-br from-[#E5E2D9] via-[#FBF8EF] to-[#E5E2D9] relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 30, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DE6E27]/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass-strong rounded-full border-2 border-[#DE6E27]/20 mb-6"
          >
            <Award className="w-5 h-5 text-[#DE6E27]" />
            <span className="font-semibold text-[#2B3210]">Pourquoi nous choisir</span>
          </motion.div>
          <h2 className="font-['Space_Grotesk'] text-5xl md:text-6xl lg:text-7xl font-bold text-[#2B3210] mb-6">
            Le choix numéro 1 des sportifs
          </h2>
          <p className="text-xl text-[#505631]">
            Votre partenaire de confiance pour atteindre vos objectifs
          </p>
        </motion.div>

        <FeaturesGrid />
        <TestimonialSection />
      </div>
    </section>
  );
};

export default Features;
