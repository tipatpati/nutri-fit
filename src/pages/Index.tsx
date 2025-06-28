
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MealCategories from "@/components/MealCategories";
import WeeklyPlanner from "@/components/WeeklyPlanner";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
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
