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
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-2 mb-8"
            >
              <div className="relative">
                {/* Subtle backdrop for text readability */}
                <div className="absolute inset-0 -z-10 bg-[#2B3210]/40 blur-3xl scale-110" />
                
                <h1 className="space-y-2">
                  <span className="font-['Outfit'] block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight leading-[0.95] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/90" style={{ 
                    textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)',
                    letterSpacing: '-0.03em'
                  }}>
                    Repas Santé pour
                  </span>
                  <LayoutTextFlip 
                    words={["Prise de Masse", "Minceur", "Équilibre"]}
                    className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl bg-gradient-to-r from-[#FBF8EF] via-[#DE6E27] to-[#ff8040] bg-clip-text text-transparent"
                  />
                </h1>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto font-normal px-6 py-4 rounded-2xl"
              style={{ 
                textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
                backgroundColor: 'rgba(43, 50, 16, 0.25)',
                backdropFilter: 'blur(8px)',
                letterSpacing: '0.01em',
                lineHeight: '1.8'
              }}
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
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2.5 glass-strong px-5 py-3 rounded-full border-2 border-white/30 shadow-xl transition-all duration-300 hover:border-white/50"
                  style={{ 
                    backgroundColor: 'rgba(43, 50, 16, 0.6)',
                    backdropFilter: 'blur(12px)'
                  }}
                >
                  <indicator.icon className="w-5 h-5 text-[#DE6E27] drop-shadow-lg flex-shrink-0" />
                  <span className="text-white font-medium tracking-wide" style={{ 
                    textShadow: '0 1px 8px rgba(0,0,0,0.6)',
                    fontSize: '0.95rem',
                    letterSpacing: '0.03em'
                  }}>{indicator.text}</span>
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
                  className="bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white font-semibold px-12 py-7 rounded-2xl hover:shadow-2xl hover:shadow-[#DE6E27]/50 transition-all duration-300 border-2 border-white/20 shadow-2xl"
                  style={{ 
                    boxShadow: '0 10px 40px rgba(222, 110, 39, 0.4), 0 0 20px rgba(0,0,0,0.5)',
                    letterSpacing: '0.05em',
                    fontSize: '1.125rem'
                  }}
                >
                  <span className="tracking-wide">Commander Maintenant</span>
                  <ArrowRight className="ml-3 w-5 h-5" />
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
                  className="glass-strong border-2 border-white/40 text-white font-semibold px-12 py-7 rounded-2xl hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-xl"
                  style={{
                    letterSpacing: '0.05em',
                    fontSize: '1.125rem'
                  }}
                >
                  <span className="tracking-wide">Voir le Menu</span>
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
                  whileHover={{ scale: 1.05 }}
                  className="text-center glass-strong rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:border-white/40"
                  style={{
                    backgroundColor: 'rgba(43, 50, 16, 0.5)',
                    backdropFilter: 'blur(12px)'
                  }}
                >
                  <div className="font-['Outfit'] text-4xl sm:text-5xl md:text-6xl font-light text-white mb-3 tracking-tight" style={{ 
                    textShadow: '0 2px 15px rgba(0,0,0,0.8)',
                    letterSpacing: '-0.02em'
                  }}>
                    {stat.number}
                  </div>
                  <div className="text-white/90 text-sm font-medium uppercase tracking-widest" style={{ 
                    textShadow: '0 1px 8px rgba(0,0,0,0.6)',
                    letterSpacing: '0.15em',
                    fontSize: '0.75rem'
                  }}>
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