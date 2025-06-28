
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import MenuHeader from "@/components/menu/MenuHeader";
import MealGrid from "@/components/menu/MealGrid";
import CustomerReview from "@/components/menu/CustomerReview";
import FAQ from "@/components/menu/FAQ";

const Menu = () => {
  const [selectedWeek, setSelectedWeek] = useState("8 juin 2025");

  const meals = [
    {
      id: 1,
      name: "Bol de quinoa à l'épicé",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
      category: "Équilibré",
      premium: false
    },
    {
      id: 2,
      name: "Crevettes à l'ail épicé",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      category: "Perte de poids",
      premium: true
    },
    {
      id: 3,
      name: "Repas protéiné",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop",
      category: "Prise de masse",
      premium: true,
      badge: "Repas protéiné"
    },
    {
      id: 4,
      name: "Crevettes rôties avec pâtes à la tomate",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop",
      category: "Équilibré",
      premium: true,
      badge: "Repas protéiné"
    },
    {
      id: 5,
      name: "Cœur de saumon cuits à la grecque",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=300&h=200&fit=crop",
      category: "Prise de masse",
      premium: false
    },
    {
      id: 6,
      name: "Filets de bœuf petit avec sauce champignons",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
      category: "Prise de masse",
      premium: false
    },
    {
      id: 7,
      name: "Salade de poulet et riz BF",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
      category: "Perte de poids",
      premium: false
    },
    {
      id: 8,
      name: "Salade de lentilles et légumes avec vinaigrette au curcuma et coriandre de sésame et de pavot",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=200&fit=crop",
      category: "Équilibré",
      premium: false
    },
    {
      id: 9,
      name: "Poulet au beurre et épinards et légumes",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop",
      category: "Prise de masse",
      premium: false
    },
    {
      id: 10,
      name: "Pâtes à la bolognaise terre sicilienne",
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&h=200&fit=crop",
      category: "Équilibré",
      premium: false
    },
    {
      id: 11,
      name: "Bouchées de viande garnisons sauce marinara",
      image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&h=200&fit=crop",
      category: "Prise de masse",
      premium: false
    },
    {
      id: 12,
      name: "Chili de lentil à la mexicaine",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      category: "Équilibré",
      premium: false
    },
    {
      id: 13,
      name: "Poulet BBQ style avec sauce dijon",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=200&fit=crop",
      category: "Prise de masse",
      premium: false
    },
    {
      id: 14,
      name: "Pâtes avec sauce pesto préalé aux tomates et parmesan",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300&h=200&fit=crop",
      category: "Équilibré",
      premium: false
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Prise de masse":
        return "#FF4D00";
      case "Perte de poids":
        return "#113B39";
      case "Équilibré":
        return "#D4B961";
      default:
        return "#113B39";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 lg:py-12 max-w-full">
        <MenuHeader selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />
        
        <MealGrid meals={meals} getCategoryColor={getCategoryColor} />

        {/* Load More Button */}
        <div className="text-center mb-8 sm:mb-16 lg:mb-20 px-2">
          <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
            Commander
          </Button>
        </div>

        <CustomerReview />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
