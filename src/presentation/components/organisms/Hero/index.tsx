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
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B3210]/70 via-[#2B3210]/60 to-[#2B3210]/80" />
      </div>

      {/* Subtle vignette to keep focus on center */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#2B3210]/50 z-[1]" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(43, 50, 16, 0.4) 100%)'
      }} />

      {/* Aceternity BackgroundLines Component */}
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 py-20 relative z-10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-8"
          >
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="relative">
                {/* Subtle backdrop for text readability */}
                <div className="absolute inset-0 -z-10 bg-[#2B3210]/40 blur-3xl scale-110" />
                
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-[-0.02em]">
                  <span className="font-['Outfit'] block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/90 drop-shadow-2xl" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)' }}>
                    Repas Santé pour
                  </span>
                  <LayoutTextFlip 
                    words={["Prise de Masse", "Minceur", "Équilibre"]}
                    className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#DE6E27] via-[#ff8040] to-[#DE6E27] bg-clip-text text-transparent !text-white border-[#DE6E27]/30"
                  />
                </h1>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-white leading-[1.6] max-w-3xl mx-auto font-medium px-4 py-3 rounded-2xl"
              style={{ 
                textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
                backgroundColor: 'rgba(43, 50, 16, 0.3)',
                backdropFilter: 'blur(8px)'
              }}
            >
              Des repas équilibrés, préparés par des experts nutritionnistes, 
              livrés directement chez vous. Atteignez vos objectifs fitness avec plaisir.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm sm:text-base"
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
                  className="flex items-center gap-2 glass-strong px-4 py-2.5 rounded-full border-2 border-white/30 shadow-xl"
                  style={{ 
                    backgroundColor: 'rgba(43, 50, 16, 0.6)',
                    backdropFilter: 'blur(12px)'
                  }}
                >
                  <indicator.icon className="w-5 h-5 text-[#DE6E27] drop-shadow-lg" />
                  <span className="text-white font-semibold" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>{indicator.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleOrderClick}
                  size="lg"
                  className="bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white font-bold text-lg px-12 py-7 rounded-2xl hover:shadow-2xl hover:shadow-[#DE6E27]/50 transition-all duration-300 border-2 border-white/20 shadow-2xl"
                  style={{ boxShadow: '0 10px 40px rgba(222, 110, 39, 0.4), 0 0 20px rgba(0,0,0,0.5)' }}
                >
                  Commander Maintenant
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg"
                  variant="outline"
                  className="glass-strong border-2 border-white/30 text-white font-bold text-lg px-12 py-7 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-xl"
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
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12"
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
                  className="text-center glass-strong rounded-2xl p-4 border border-white/20"
                  style={{
                    backgroundColor: 'rgba(43, 50, 16, 0.5)',
                    backdropFilter: 'blur(12px)'
                  }}
                >
                  <div className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}>
                    {stat.number}
                  </div>
                  <div className="text-white/90 text-sm font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
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