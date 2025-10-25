import { AnimatedClock, AnimatedHeart } from "@/components/ui/animated-icon";
import { QuickOrderSection } from "../../molecules/Hero/QuickOrderSection";
import { TrustBadge } from "../../atoms/Badge/TrustBadge";
import { Icon } from "@/components/ui/icon";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "framer-motion";
import { ArrowRight, Target, TrendingDown, TrendingUp, CheckCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroContentProps {
  onOrderClick: () => void;
}

export const HeroContent = ({ onOrderClick }: HeroContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20 text-center max-w-6xl mx-auto relative px-4">
      {/* Premium badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center gap-2.5 md:gap-3 px-5 md:px-7 py-3 md:py-3.5 glass-strong rounded-full border-2 border-[#DE6E27]/30 shadow-lg backdrop-blur-xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Icon name="stopwatch" size={18} className="text-[#DE6E27]" />
        </motion.div>
        <span className="bg-gradient-to-r from-[#DE6E27] to-[#ff8040] bg-clip-text text-transparent font-semibold text-sm md:text-base">
          Livraison express en 30 min
        </span>
      </motion.div>

      {/* Hero heading with modern typography */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
        className="space-y-6 md:space-y-8"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[1.05] tracking-[-0.02em] text-olive-dark">
          <span className="font-heading block">
            Repas Santé
          </span>
          <span className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-orange-primary via-orange-light to-orange-primary bg-clip-text text-transparent block mt-3 md:mt-4">
            Premium
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-olive-muted leading-relaxed max-w-4xl mx-auto">
          Des repas équilibrés livrés chez vous, calculés selon vos objectifs fitness
        </p>
      </motion.div>

      {/* Animated Goal Text Flip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-wrap justify-center items-center gap-4"
      >
        <LayoutTextFlip
          text="Pour votre objectif"
          words={["Équilibré", "Minceur", "Prise de masse"]}
          duration={2500}
        />
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center"
      >
        <Button
          size="lg"
          onClick={onOrderClick}
          className="w-full sm:w-auto group px-10 md:px-12 py-6 md:py-7 text-base md:text-lg bg-gradient-to-br from-orange-primary to-orange-light text-white rounded-2xl font-semibold shadow-2xl shadow-orange-primary/30 hover:shadow-orange-primary/50 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 min-h-[60px]"
        >
          Commencer ma commande
          <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <Button
          size="lg"
          onClick={() => navigate('/menu')}
          className="w-full sm:w-auto glass border-2 border-orange-primary text-orange-primary px-10 md:px-12 py-6 md:py-7 text-base md:text-lg rounded-2xl font-semibold hover:bg-orange-primary hover:text-white hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 min-h-[60px]"
        >
          Découvrir le menu
        </Button>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="flex flex-wrap justify-center items-center gap-5 md:gap-7 lg:gap-9 text-sm md:text-base text-olive-muted"
      >
        <div className="flex items-center gap-2 md:gap-2.5">
          <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-success flex-shrink-0" />
          <span className="whitespace-nowrap font-medium">100% nutrition contrôlée</span>
        </div>
        <div className="flex items-center gap-2 md:gap-2.5">
          <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-success flex-shrink-0" />
          <span className="whitespace-nowrap font-medium">Livraison rapide</span>
        </div>
        <div className="flex items-center gap-2 md:gap-2.5">
          <Star className="w-5 md:w-6 h-5 md:h-6 text-warning fill-current flex-shrink-0" />
          <span className="whitespace-nowrap font-medium">4.9/5 (2,847 avis)</span>
        </div>
      </motion.div>
    </div>
  );
};
