import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import NutriFitNavbar from "@/components/NutriFitNavbar";
import Hero from "@/components/Hero";
import MealCategories from "@/components/MealCategories";
import WeeklyPlanner from "@/components/WeeklyPlanner";
import Packs from "@/components/Packs";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

const Index = () => {
  const { user, signOut } = useAuth();
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    if (user && showBanner) {
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [user, showBanner]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9] overflow-x-hidden">
      <NutriFitNavbar />

      <main className="w-full pt-20">
        <Hero />
        
        {/* Add stagger animations to sections */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.3 }
            }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <MealCategories />
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <WeeklyPlanner />
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <Packs />
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <Features />
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
export default Index;