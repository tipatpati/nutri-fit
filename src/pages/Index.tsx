
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MealCategories from "@/components/MealCategories";
import WeeklyPlanner from "@/components/WeeklyPlanner";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      {user && (
        <div className="bg-primary/10 p-4 text-center">
          <span className="text-sm">Connecté en tant que {user.email}</span>
          <Button variant="outline" size="sm" onClick={signOut} className="ml-4">
            Déconnexion
          </Button>
          <Link to="/admin" className="ml-4">
            <Button variant="outline" size="sm">
              Accès Admin
            </Button>
          </Link>
        </div>
      )}
      {!user && (
        <div className="bg-secondary/10 p-4 text-center">
          <Link to="/auth">
            <Button variant="outline" size="sm">
              Connexion / Inscription
            </Button>
          </Link>
        </div>
      )}
      <main className="w-full">
        <Hero />
        <div className="px-2 sm:px-4">
          <MealCategories />
          <WeeklyPlanner />
          <Features />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
