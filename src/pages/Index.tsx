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
      
      <AnimatePresence>
        {user && showBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass p-4 text-center shadow-lg border-b border-[#DE6E27]/20"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-[#2B3210] font-medium">
                Connecté en tant que <span className="font-semibold">{user.email}</span>
              </span>
              <div className="flex gap-2">
                <Button 
                  variant="outlined" 
                  size="sm" 
                  onClick={signOut}
                  className="glass border-2 border-[#DE6E27] text-[#DE6E27] hover:bg-[#DE6E27] hover:text-white transition-all duration-300"
                >
                  Déconnexion
                </Button>
                <Link to="/admin">
                  <Button 
                    variant="outlined" 
                    size="sm"
                    className="glass border-2 border-[#2B3210] text-[#2B3210] hover:bg-[#2B3210] hover:text-[#FBF8EF] transition-all duration-300"
                  >
                    Accès Admin
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full">
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