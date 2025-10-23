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
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img src="/hero-background.jpg" alt="Meal prep background" className="absolute inset-0 w-full h-full object-cover" />
        {/* Strategic gradient to show image better */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B3210]/80 via-[#2B3210]/75 to-[#2B3210]/85" />
      </div>

      {/* Subtle vignette to keep focus on center */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#2B3210]/50 z-[1]" style={{
      background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(43, 50, 16, 0.4) 100%)'
    }} />

      {/* Aceternity BackgroundLines Component */}
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-5 sm:px-6 py-20 sm:py-24 md:py-28 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          {/* Hero Content */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          ease: "easeOut"
        }} className="text-center space-y-8 sm:space-y-9 md:space-y-10">
            {/* Main Heading */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }} className="space-y-6">
              <div className="relative flex flex-col items-center gap-4 sm:gap-6">
                <h1 className="text-center px-4">
                  <span className="font-['Outfit'] block text-[2.5rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.15] text-white drop-shadow-2xl mb-4 sm:mb-6">
                    Repas Santé pour
                  </span>
                  <div className="flex justify-center">
                    <LayoutTextFlip words={["Prise de Masse", "Minceur", "Équilibré"]} />
                  </div>
                </h1>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} className="text-lg sm:text-xl md:text-2xl text-white/95 leading-[1.6] max-w-3xl mx-auto font-normal px-4">
              Des repas équilibrés, préparés par des experts nutritionnistes,{' '}
              <br className="hidden md:block" />
              livrés directement chez vous. Atteignez vos objectifs fitness avec plaisir.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 text-sm sm:text-base px-4">
              {[{
              icon: CheckCircle,
              text: "100% nutrition contrôlée"
            }, {
              icon: Award,
              text: "Chefs certifiés"
            }, {
              icon: Clock,
              text: "Livraison express"
            }].map((indicator, idx) => <motion.div key={indicator.text} initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.5,
              delay: 0.8 + idx * 0.1
            }} whileHover={{
              scale: 1.05
            }} className="flex items-center gap-2.5 sm:gap-3 bg-white/95 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full shadow-lg md:hover:shadow-xl transition-all duration-300 select-none active:scale-[0.97] md:active:scale-100">
                  <indicator.icon className="w-5 h-5 text-[#DE6E27] flex-shrink-0" />
                  <span className="text-[#2B3210] font-semibold whitespace-nowrap">
                    {indicator.text}
                  </span>
                </motion.div>)}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 1
          }} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4">
              <motion.div whileHover={{
              scale: 1.05,
              y: -2
            }} whileTap={{
              scale: 0.95
            }} className="w-full sm:w-auto">
                <Button onClick={handleOrderClick} size="lg" className="no-hover-on-touch w-full sm:w-auto bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white font-bold text-base sm:text-lg px-10 sm:px-12 py-6 rounded-xl shadow-xl md:hover:shadow-2xl md:hover:scale-105 transition-all duration-300 min-h-[56px] active:scale-[0.97] select-none">
                  Commander Maintenant
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

              <motion.div whileHover={{
              scale: 1.05,
              y: -2
            }} whileTap={{
              scale: 0.95
            }} className="w-full sm:w-auto">
                
              </motion.div>
            </motion.div>

            {/* Stats Section */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 1.2
          }} className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 max-w-4xl mx-auto pt-12 sm:pt-14 md:pt-16 px-4 sm:px-6">
              {[{
              number: "1000+",
              label: "Clients Satisfaits"
            }, {
              number: "50+",
              label: "Recettes"
            }, {
              number: "4.9",
              label: "Note Moyenne"
            }].map((stat, idx) => <motion.div key={stat.label} initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.5,
              delay: 1.4 + idx * 0.1
            }} whileHover={{
              scale: 1.05
            }} className="text-center bg-white/90 rounded-2xl p-5 sm:p-6 md:p-7 shadow-lg select-none active:scale-[0.98] md:active:scale-100">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#2B3210] mb-2 sm:mb-2.5">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#505631] uppercase tracking-wider leading-tight">
                    {stat.label}
                  </div>
                </motion.div>)}
            </motion.div>
          </motion.div>
        </div>
      </BackgroundLines>

      {/* Scroll Indicator */}
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      delay: 1.6
    }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="cursor-pointer" onClick={() => window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      })}>
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2 hover:border-white transition-colors duration-300">
            <motion.div animate={{
            y: [0, 12, 0]
          }} transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }} className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>;
};