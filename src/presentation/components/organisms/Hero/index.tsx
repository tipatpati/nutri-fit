import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, TrendingUp, Award, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1920&h=1080&fit=crop&q=80')`,
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B3210]/95 via-[#2B3210]/90 to-[#505631]/95" />
      </div>

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
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-[-0.02em]">
                <span className="font-['Space_Grotesk'] block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/80">
                  Repas Santé
                </span>
                <span className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#DE6E27] via-[#ff8040] to-[#DE6E27] bg-clip-text text-transparent block mt-4">
                  Premium
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 leading-[1.6] max-w-3xl mx-auto font-medium"
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
                  className="flex items-center gap-2 glass-strong px-4 py-2 rounded-full border border-white/20"
                >
                  <indicator.icon className="w-5 h-5 text-[#DE6E27]" />
                  <span className="text-white/90 font-medium">{indicator.text}</span>
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
                  className="bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white font-bold text-lg px-12 py-7 rounded-2xl hover:shadow-2xl hover:shadow-[#DE6E27]/50 transition-all duration-300 border-2 border-white/20"
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
                  className="text-center"
                >
                  <div className="font-['Space_Grotesk'] text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-sm font-medium">
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