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
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-6 py-20 md:py-32 lg:py-40 relative z-10">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
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
        }} className="text-center space-y-16 md:space-y-20">
            {/* Heading & Description Group */}
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
          }} className="space-y-8 md:space-y-10">
              {/* Main Heading */}
              <div className="relative flex flex-col items-center gap-6 md:gap-8">
                <h1 className="text-center">
                  <span className="font-['Outfit'] block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-2xl mb-5 md:mb-7">
                    Repas Santé pour
                  </span>
                  <div className="flex justify-center">
                    <LayoutTextFlip words={["Prise de Masse", "Minceur", "Équilibré"]} />
                  </div>
                </h1>
              </div>

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
            }} className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 leading-relaxed max-w-4xl mx-auto font-normal">
                Des repas équilibrés, préparés par des experts nutritionnistes,{' '}
                <br className="hidden md:block" />
                livrés directement chez vous. Atteignez vos objectifs fitness avec plaisir.
              </motion.p>
            </motion.div>

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
          }} className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 text-sm md:text-base">
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
            }} className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 md:px-7 py-3.5 md:py-4 rounded-full shadow-lg md:hover:shadow-xl transition-all duration-300 select-none active:scale-[0.97] md:active:scale-100">
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
          }} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 md:gap-5">
              <motion.div whileHover={{
              scale: 1.05,
              y: -2
            }} whileTap={{
              scale: 0.95
            }} className="w-full sm:w-auto">
                <Button onClick={handleOrderClick} size="lg" className="no-hover-on-touch w-full sm:w-auto bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white font-bold text-base md:text-lg px-12 md:px-14 py-6 md:py-7 rounded-2xl shadow-2xl md:hover:shadow-[#DE6E27]/50 md:hover:scale-105 transition-all duration-300 min-h-[60px] active:scale-[0.97] select-none">
                  Commander Maintenant
                  <ArrowRight className="ml-2.5 w-5 h-5" />
                </Button>
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
          }} className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto pt-8 md:pt-12">
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
              scale: 1.05,
              y: -4
            }} className="text-center bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg md:hover:shadow-2xl transition-all duration-300 select-none active:scale-[0.98] md:active:scale-100">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#2B3210] mb-3 md:mb-4 tabular-nums">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-semibold text-[#505631] uppercase tracking-wide leading-tight">
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
    }} className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="cursor-pointer group" onClick={() => window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      })}>
          <div className="w-7 h-11 rounded-full border-2 border-white/60 flex items-start justify-center p-2 group-hover:border-white group-hover:scale-110 transition-all duration-300">
            <motion.div animate={{
            y: [0, 12, 0]
          }} transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }} className="w-1.5 h-2.5 bg-white rounded-full shadow-lg" />
          </div>
        </motion.div>
      </motion.div>
    </section>;
};