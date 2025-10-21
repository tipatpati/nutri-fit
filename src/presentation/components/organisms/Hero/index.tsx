import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, TrendingUp, Award, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

export const Hero = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-background.jpg"
          alt="Meal prep background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Strategic gradient to show image better */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B3210]/80 via-[#2B3210]/75 to-[#2B3210]/85" />
      </div>

      {/* Subtle vignette to keep focus on center */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#2B3210]/50 z-[1]" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(43, 50, 16, 0.4) 100%)'
      }} />

      {/* Aceternity BackgroundLines Component */}
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-28 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-6 sm:space-y-7 md:space-y-8"
          >
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 sm:space-y-5"
            >
              <div className="relative flex flex-col items-center gap-4 sm:gap-6">
                <h1 className="text-center px-4">
                  <span className="font-['Outfit'] block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.1] sm:leading-tight text-white drop-shadow-2xl mb-4 sm:mb-6">
                    Repas Santé pour
                  </span>
                  <div className="flex justify-center">
                    <LayoutTextFlip 
                      words={["Prise de Masse", "Minceur", "Équilibré"]}
                    />
                  </div>
                </h1>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto font-normal px-6 sm:px-8"
            >
              Des repas équilibrés, préparés par des experts nutritionnistes,{' '}
              <br className="hidden md:block" />
              livrés directement chez vous. Atteignez vos objectifs fitness avec plaisir.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 text-xs sm:text-sm md:text-base px-4"
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
                  className="flex items-center gap-2 sm:gap-3 bg-white/95 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <indicator.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#DE6E27] flex-shrink-0" />
                  <span className="text-[#2B3210] font-medium whitespace-nowrap">
                    {indicator.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={handleOrderClick}
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white font-bold text-base sm:text-lg px-8 sm:px-10 md:px-12 py-5 sm:py-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[56px]"
                >
                  Commander Maintenant
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg"
                  className="w-full sm:w-auto bg-white/95 text-[#2B3210] font-bold text-base sm:text-lg px-8 sm:px-10 md:px-12 py-5 sm:py-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[56px]"
                >
                  Voir le Menu
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto pt-8 sm:pt-10 px-4 sm:px-6"
            >
              {[
                { number: "1000+", label: "Clients Satisfaits" },
                { number: "50+", label: "Recettes" },
                { number: "4.9", label: "Note Moyenne" }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-lg"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3210] mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm font-medium text-[#505631] uppercase tracking-wide leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </BackgroundLines>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2 hover:border-white transition-colors duration-300">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};