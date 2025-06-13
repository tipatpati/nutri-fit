
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MealCategories from "@/components/MealCategories";
import WeeklyPlanner from "@/components/WeeklyPlanner";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full">
        <Hero />
        <MealCategories />
        <WeeklyPlanner />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
