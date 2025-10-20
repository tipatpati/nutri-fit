import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MealCategories from "@/components/MealCategories";
import WeeklyPlanner from "@/components/WeeklyPlanner";
import Packs from "@/components/Packs";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
const Index = () => {
  const {
    user,
    signOut
  } = useAuth();
  return (
    <div className="min-h-screen bg-[hsl(var(--md-sys-color-surface))] text-[hsl(var(--md-sys-color-on-surface))] overflow-x-hidden">
      <Header />
      {user && (
        <div className="glass-primary p-[16px] text-center md-elevation-1">
          <span className="md-body-medium text-on-surface">Connecté en tant que {user.email}</span>
          <Button variant="outlined" size="sm" onClick={signOut} className="ml-[16px]">
            Déconnexion
          </Button>
          <Link to="/admin" className="ml-[16px]">
            <Button variant="outlined" size="sm">
              Accès Admin
            </Button>
          </Link>
        </div>
      )}
      <main className="w-full">
        <Hero />
        <MealCategories />
        <WeeklyPlanner />
        <Packs />
        <Features />
      </main>
      <Footer />
    </div>
  );
};
export default Index;