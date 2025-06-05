
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#113B39' }}>
            Menu de la semaine
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Découvrez 15 nouveaux repas prêts-à-manger<br />
            chaque semaine et personnalisez-les à votre goût !
          </p>
          
          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button variant="outline" className="rounded-full">
              Repas prêts-à-manger
            </Button>
            <Button variant="outline" className="rounded-full">
              Formule familiale
            </Button>
            <Button variant="outline" className="rounded-full">
              Collations
            </Button>
            <Button variant="outline" className="rounded-full">
              Épicerie
            </Button>
          </div>

          {/* Week Selector */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-gray-600">Semaine du</span>
            <select 
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1"
            >
              <option value="8 juin 2025">8 juin 2025</option>
              <option value="15 juin 2025">15 juin 2025</option>
              <option value="22 juin 2025">22 juin 2025</option>
            </select>
            <Button className="bg-[#113B39] hover:bg-[#113B39]/90 text-white">
              Commander
            </Button>
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {meals.map((meal) => (
            <Card key={meal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={meal.image} 
                    alt={meal.name}
                    className="w-full h-48 object-cover"
                  />
                  {meal.badge && (
                    <div 
                      className="absolute top-3 left-3 px-2 py-1 rounded text-white text-xs font-medium"
                      style={{ backgroundColor: getCategoryColor(meal.category) }}
                    >
                      {meal.badge}
                    </div>
                  )}
                  {meal.premium && (
                    <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs">
                      Premium
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-[#113B39] text-sm leading-tight">
                    {meal.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mb-16">
          <Button className="bg-[#113B39] hover:bg-[#113B39]/90 text-white px-8">
            Commander
          </Button>
        </div>

        {/* Bottom Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#113B39' }}>
                Le choix de prêt-à-manger numéro 1 au pays
              </h2>
              <p className="text-gray-600 mb-6">
                Partenaire de prêt-à-manger "top plans entreprises des normes de goût et qualité au Québec, en Ontario et dans les Maritimes.
              </p>
              
              {/* Customer Review */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#113B39] rounded-full flex items-center justify-center text-white font-bold">
                    L
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">Lacey</span>
                      <span className="text-sm text-gray-500">19 janvier 2024</span>
                      <div className="flex text-yellow-400">★★★★★</div>
                    </div>
                    <p className="text-sm text-gray-600">
                      "Les repas étaient vraiment délicieux, surtout les mini quiches! Os, pas, service à la clientèle impeccable..."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop"
                alt="Happy customers with meals"
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#113B39' }}>
            Questions fréquemment posées
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 text-left">
              <button className="w-full flex justify-between items-center text-left">
                <span>Offrez-vous des options végétariennes?</span>
                <span>+</span>
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-left">
              <button className="w-full flex justify-between items-center text-left">
                <span>Est-ce que vos repas sont sans ?</span>
                <span>+</span>
              </button>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="mt-8 border-[#113B39] text-[#113B39] hover:bg-[#113B39] hover:text-white"
          >
            Voir la FAQ
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
