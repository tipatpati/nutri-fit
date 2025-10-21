import { AnimatedClock, AnimatedHeart } from "@/components/ui/animated-icon";
import { QuickOrderSection } from "../../molecules/Hero/QuickOrderSection";
import { TrustBadge } from "../../atoms/Badge/TrustBadge";
import { Icon } from "@/components/ui/icon";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, TrendingDown, TrendingUp, CheckCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroContentProps {
  onOrderClick: () => void;
}

export const HeroContent = ({ onOrderClick }: HeroContentProps) => {
  const navigate = useNavigate();
  
  const goals = [
    { icon: Target, label: "Équilibré", color: "#29B6F6" },
    { icon: TrendingDown, label: "Perte de Poids", color: "#4CAF50" },
    { icon: TrendingUp, label: "Prise de Masse", color: "#DE6E27" }
  ];

  return (
    <div className="space-y-12 md:space-y-16 text-center max-w-5xl mx-auto relative">
      {/* Premium badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center gap-2 px-6 py-3 glass-strong rounded-full border-2 border-[#DE6E27]/30 shadow-lg backdrop-blur-xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Icon name="stopwatch" size={16} className="text-[#DE6E27]" />
        </motion.div>
        <span className="bg-gradient-to-r from-[#DE6E27] to-[#ff8040] bg-clip-text text-transparent font-semibold text-sm">
          Livraison express en 30 min
        </span>
      </motion.div>
      
      {/* Hero heading with modern typography */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
        className="space-y-6 px-4"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-[-0.02em] text-olive-dark">
          <span className="font-heading block">
            Repas Santé
          </span>
          <span className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-orange-primary via-orange-light to-orange-primary bg-clip-text text-transparent block mt-2">
            Premium
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-olive-muted leading-[1.6] max-w-3xl mx-auto">
          Des repas équilibrés livrés chez vous, calculés selon vos objectifs fitness
        </p>
      </motion.div>

      {/* Goal Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 px-4"
      >
        {goals.map((goal, index) => (
          <motion.div
            key={goal.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1, y: -4 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="glass-strong px-6 py-3 rounded-full flex items-center gap-2 border-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
            style={{ borderColor: goal.color }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <goal.icon className="w-5 h-5" style={{ color: goal.color }} />
            </motion.div>
            <span className="text-sm font-bold text-[#2B3210]">{goal.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
      >
        <Button
          size="lg"
          onClick={onOrderClick}
          className="group px-10 py-6 text-lg bg-gradient-to-br from-orange-primary to-orange-light text-white rounded-xl font-semibold shadow-2xl shadow-orange-primary/30 hover:shadow-orange-primary/50 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
        >
          Commencer ma commande
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <Button
          size="lg"
          onClick={() => navigate('/menu')}
          className="glass border-2 border-orange-primary text-orange-primary px-10 py-6 text-lg rounded-xl font-semibold hover:bg-orange-primary hover:text-white hover:-translate-y-1 transition-all duration-300"
        >
          Découvrir le menu
        </Button>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-sm text-olive-muted px-4"
      >
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-success" />
          <span>100% nutrition contrôlée</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-success" />
          <span>Livraison rapide</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-warning fill-current" />
          <span>4.9/5 (2,847 avis)</span>
        </div>
      </motion.div>
    </div>
  );
};
