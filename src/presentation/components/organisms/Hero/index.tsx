import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, TrendingUp, Award, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import slimBodyIcon from "@/assets/icons/slim-body-3.png";
import yogaIcon from "@/assets/icons/yoga-3.png";
import armMuscleIcon from "@/assets/icons/arm-muscle-3.png";
export const Hero = () => {
  const navigate = useNavigate();
  const handleOrderClick = () => {
    navigate("/order");
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20">
      {/* Background with combined overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-meal-prep.jpg" 
          alt="Meal prep background" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(43, 50, 16, 0.75) 0%, rgba(43, 50, 16, 0.4) 50%, transparent 100%), linear-gradient(to bottom, rgba(43, 50, 16, 0.3) 0%, rgba(43, 50, 16, 0.2) 100%)'
        }}
      />
      </div>

      {/* Content with BackgroundLines */}
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-6 py-16 md:py-20 lg:py-24 pb-24 md:pb-28 lg:pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl text-left lg:text-left space-y-12 md:space-y-16 lg:space-y-20 lg:max-w-4xl lg:mr-auto"
        >
          {/* Heading & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10 md:space-y-12 lg:space-y-14"
          >
            <h1 className="text-left lg:text-left">
              <span className="font-['Outfit'] block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-2xl mb-5 md:mb-7">
                Repas Santé pour
              </span>
              <div className="flex justify-start">
                <LayoutTextFlip words={["Prise de Masse", "Minceur", "Équilibré"]} />
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 leading-relaxed max-w-4xl font-normal"
            >
              Des repas équilibrés, préparés par des experts nutritionnistes,{' '}
              <br className="hidden md:block" />
              livrés directement chez vous. Atteignez vos objectifs fitness avec plaisir.
            </motion.p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start lg:items-start justify-start gap-5 md:gap-6 text-sm md:text-base"
          >
            {[
              { icon: CheckCircle, text: "100% nutrition contrôlée" },
              { icon: Award, text: "Chefs certifiés" },
              { icon: Clock, text: "Livraison express" }
            ].map((indicator, idx) => (
              <motion.div
                key={indicator.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 md:px-7 py-3.5 md:py-4 rounded-full shadow-lg md:hover:shadow-xl transition-all duration-300 select-none active:scale-[0.97] md:active:scale-100"
              >
                <indicator.icon className="w-5 h-5 text-[#DE6E27] flex-shrink-0" />
                <span className="text-[#2B3210] font-semibold whitespace-nowrap">
                  {indicator.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-start"
          >
            <Button
              onClick={handleOrderClick}
              size="lg"
              className="no-hover-on-touch w-full sm:w-auto bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white font-bold text-base md:text-lg px-12 md:px-14 py-6 md:py-7 rounded-2xl shadow-2xl md:hover:shadow-[#DE6E27]/50 md:hover:scale-105 transition-all duration-300 min-h-[60px] active:scale-[0.97] select-none"
            >
              Commander Maintenant
              <ArrowRight className="ml-2.5 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Nutrition Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 max-w-4xl lg:mx-0 pt-8 md:pt-12 lg:pt-14"
          >
            {[
              {
                title: "Minceur",
                description: "Perte de poids",
                icon: slimBodyIcon,
                gradient: "from-[hsl(var(--color-success))] to-emerald-400"
              },
              {
                title: "Équilibré",
                description: "Maintien forme",
                icon: yogaIcon,
                gradient: "from-[#E5E2D9] to-[#D4C5B0]"
              },
              {
                title: "Prise de Masse",
                description: "Gain musculaire",
                icon: armMuscleIcon,
                gradient: "from-[#DE6E27] to-[#FF8142]"
              }
            ].map((goal, idx) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group cursor-pointer select-none active:scale-[0.98] relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${goal.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-4 md:space-y-5">
                  <div className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br ${goal.gradient} p-4 shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                    <img src={goal.icon} alt={goal.title} className="w-full h-full object-contain filter brightness-0 invert" />
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                    {goal.title}
                  </div>
                  <div className="text-sm md:text-base text-white/90 font-medium">
                    {goal.description}
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </BackgroundLines>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="cursor-pointer group"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="w-7 h-11 rounded-full border-2 border-white/60 flex items-start justify-center p-2 group-hover:border-white group-hover:scale-110 transition-all duration-300">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-2.5 bg-white rounded-full shadow-lg"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};