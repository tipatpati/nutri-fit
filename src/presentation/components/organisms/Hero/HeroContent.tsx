import { AnimatedClock, AnimatedHeart } from "@/components/ui/animated-icon";
import { QuickOrderSection } from "../../molecules/Hero/QuickOrderSection";
import { TrustBadge } from "../../atoms/Badge/TrustBadge";
import { Icon } from "@/components/ui/icon";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";

interface HeroContentProps {
  onOrderClick: () => void;
}

export const HeroContent = ({ onOrderClick }: HeroContentProps) => {
  const trustIndicators = [
    { icon: AnimatedHeart, label: "100% Frais", color: "text-md-secondary" },
    { iconComponent: <Icon name="leaves" size={20} className="text-md-tertiary" />, label: "Bio & Local", color: "" },
    { icon: AnimatedClock, label: "Prêt en 2min", color: "text-md-secondary" },
    { iconComponent: <Icon name="delivery-truck" size={20} className="text-md-tertiary" />, label: "Livraison rapide", color: "" }
  ];

  return (
    <div className="space-y-12 md:space-y-16 text-center max-w-5xl mx-auto relative">
      {/* Premium badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#DE6E27] rounded-full shadow-lg"
      >
        <Icon name="stopwatch" size={16} className="text-white" />
        <span className="text-white font-semibold text-sm">Livraison express en 30 min</span>
      </motion.div>
      
      {/* Hero heading with modern typography */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
        className="space-y-6 px-4"
      >
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold leading-[1.05] tracking-[-0.02em] text-olive-dark">
          <span className="font-heading block">
            Repas Santé
          </span>
          <span className="font-script text-5xl sm:text-6xl md:text-7xl bg-gradient-to-r from-orange-primary via-orange-light to-orange-primary bg-clip-text text-transparent block mt-2">
            Premium
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-olive-muted leading-[1.6] max-w-3xl mx-auto">
          Des repas équilibrés, préparés par des chefs passionnés et livrés directement chez vous.
        </p>
      </motion.div>

      {/* CTA Section - Premium Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <GlassCard variant="floating" className="p-8 md:p-10 space-y-6 max-w-2xl mx-auto">
          <QuickOrderSection onOrderClick={onOrderClick} />
        </GlassCard>
      </motion.div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 max-w-4xl mx-auto px-4">
        {trustIndicators.map((indicator, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1, ease: "easeOut" }}
          >
            <TrustBadge {...indicator} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
