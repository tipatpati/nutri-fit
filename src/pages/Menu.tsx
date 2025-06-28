
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-emerald-600/10 to-emerald-400/10 rounded-full px-6 py-2 border border-emerald-200/50">
              <span className="text-emerald-700 text-sm font-medium">Menu Hebdomadaire</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-emerald-800 to-slate-700 bg-clip-text text-transparent leading-tight">
            Menu de la semaine
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez 15 nouveaux repas prêts-à-manger<br className="hidden sm:block" />
            chaque semaine et personnalisez-les à votre goût !
          </p>
          
          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-8">
            {["Repas prêts-à-manger", "Formule familiale", "Collations", "Épicerie"].map((filter, index) => (
              <Button key={index} variant="outline" className="rounded-full text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3 border-2 border-emerald-200/60 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-300 backdrop-blur-sm bg-white/80">
                {filter}
              </Button>
            ))}
          </div>

          {/* Week Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 mb-12 lg:mb-16">
            <span className="text-slate-600 text-base lg:text-lg font-medium">Semaine du</span>
            <select 
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="border-2 border-emerald-200/60 rounded-xl px-4 py-3 text-base lg:text-lg bg-white/80 backdrop-blur-sm hover:border-emerald-300 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
            >
              <option value="8 juin 2025">8 juin 2025</option>
              <option value="15 juin 2025">15 juin 2025</option>
              <option value="22 juin 2025">22 juin 2025</option>
            </select>
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-base lg:text-lg px-8 lg:px-10 py-3 lg:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
              Commander
            </Button>
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {meals.map((meal) => (
            <Card key={meal.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-emerald-100/50 group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={meal.image} 
                    alt={meal.name}
                    className="w-full h-48 lg:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {meal.badge && (
                    <div 
                      className="absolute top-3 lg:top-4 left-3 lg:left-4 px-3 py-1.5 rounded-full text-white text-xs font-semibold backdrop-blur-sm shadow-lg"
                      style={{ backgroundColor: getCategoryColor(meal.category) }}
                    >
                      {meal.badge}
                    </div>
                  )}
                  {meal.premium && (
                    <div className="absolute top-3 lg:top-4 right-3 lg:right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      Premium
                    </div>
                  )}
                </div>
                <div className="p-4 lg:p-6">
                  <h3 className="font-semibold text-slate-800 text-base lg:text-lg leading-tight group-hover:text-emerald-700 transition-colors duration-300">
                    {meal.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mb-16 lg:mb-20">
          <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 lg:px-12 py-4 lg:py-5 text-base lg:text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
            Commander
          </Button>
        </div>

        {/* Bottom Section */}
        <div className="bg-gradient-to-br from-white/90 to-emerald-50/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 mb-16 lg:mb-20 shadow-xl border border-emerald-100/50">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-emerald-800 bg-clip-text text-transparent">
                Le choix de prêt-à-manger numéro 1 au pays
              </h2>
              <p className="text-slate-600 mb-8 text-base lg:text-lg leading-relaxed">
                Partenaire de prêt-à-manger "top plans entreprises des normes de goût et qualité au Québec, en Ontario et dans les Maritimes.
              </p>
              
              {/* Customer Review */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-emerald-100/50">
                <div className="flex items-start gap-4 lg:gap-6">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-lg">
                    L
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 mb-3">
                      <span className="font-semibold text-base lg:text-lg text-slate-800">Lacey</span>
                      <span className="text-sm lg:text-base text-slate-500">19 janvier 2024</span>
                      <div className="flex text-amber-400 text-lg">★★★★★</div>
                    </div>
                    <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                      "Les repas étaient vraiment délicieux, surtout les mini quiches! Os, pas, service à la clientèle impeccable..."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative order-first lg:order-last">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop"
                alt="Happy customers with meals"
                className="relative rounded-2xl w-full h-64 lg:h-auto object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 bg-gradient-to-r from-slate-800 to-emerald-800 bg-clip-text text-transparent">
            Questions fréquemment posées
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 lg:space-y-6">
            {[
              "Offrez-vous des options végétariennes?",
              "Est-ce que vos repas sont sans ?"
            ].map((question, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm border border-emerald-100/50 rounded-2xl p-4 lg:p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <button className="w-full flex justify-between items-center text-left text-base lg:text-lg font-medium text-slate-800 hover:text-emerald-700 transition-colors duration-300">
                  <span>{question}</span>
                  <span className="text-2xl text-emerald-600 font-light">+</span>
                </button>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="mt-8 lg:mt-12 border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 text-base lg:text-lg px-8 lg:px-10 py-3 lg:py-4 rounded-xl font-semibold transition-all duration-300 bg-white/80 backdrop-blur-sm"
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
