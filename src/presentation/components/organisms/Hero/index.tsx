import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroContent } from "./HeroContent";
import { HeroSocialProof } from "./HeroSocialProof";
import { BackgroundLines } from "@/components/ui/background-lines";

export const Hero = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleOrderClick = () => {
    navigate("/order");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Premium gradient background with animated orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-beige to-cream">
        {/* Animated Background Lines */}
        <BackgroundLines svgOptions={{ duration: 12 }} />
        
        {/* Large animated orbs */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-primary/20 via-orange-primary/10 to-transparent blur-3xl top-[-150px] right-[-150px]"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-olive-muted/15 via-olive-dark/10 to-transparent blur-3xl bottom-[-100px] left-[-100px]"
        />
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-olive-dark/5 to-transparent blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        
        {/* Medium orbs for depth */}
        <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-br from-orange-primary/15 to-transparent blur-2xl top-1/4 left-1/4 animate-pulse" style={{ animationDuration: '9s', animationDelay: '1s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-olive-muted/10 to-transparent blur-2xl bottom-1/4 right-1/4 animate-pulse" style={{ animationDuration: '11s', animationDelay: '3s' }} />
        
        {/* Small accent orbs */}
        <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-br from-orange-light/20 to-transparent blur-xl top-1/3 right-1/3 animate-pulse" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />
        <div className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-br from-orange-primary/10 to-transparent blur-xl bottom-1/3 left-1/3 animate-pulse" style={{ animationDuration: '9s', animationDelay: '2.5s' }} />
      </div>

      {/* Subtle noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 max-w-7xl">
        <motion.div style={{ y, opacity }}>
          <HeroContent onOrderClick={handleOrderClick} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="glass-strong w-8 h-12 rounded-full border-2 border-[#DE6E27]/50 flex items-start justify-center p-2 group-hover:border-[#DE6E27] transition-colors duration-300 shadow-lg"
        >
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-gradient-to-b from-[#DE6E27] to-[#ff8040] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
