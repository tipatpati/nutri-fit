
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ShoppingCart, Truck, Clock, ChefHat, Leaf } from "lucide-react";
import { useState } from "react";

const Forfaits = () => {
  const [selectedSize, setSelectedSize] = useState("regular");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      id: "6-8",
      title: "6 à 8 Repas",
      subtitle: "par semaine",
      price: "30",
      savings: null,
      description: "Idéal pour découvrir",
      popular: false,
      meals: [
        { size: "petit", price: "13.8", count: "6 repas" },
        { size: "regular", price: "14.3", count: "6 repas" },
        { size: "grand", price: "15.8", count: "6 repas" }
      ]
    },
    {
      id: "9-13",
      title: "9 à 13 Repas",
      subtitle: "par semaine",
      price: "40",
      savings: null,
      description: "Le plus populaire",
      popular: true,
      meals: [
        { size: "petit", price: "13.6", count: "9 repas" },
        { size: "regular", price: "14.1", count: "9 repas" },
        { size: "grand", price: "15.6", count: "9 repas" }
      ]
    },
    {
      id: "14-21",
      title: "14 à 21 Repas",
      subtitle: "par semaine",
      price: "40",
      savings: null,
      description: "Pour familles",
      popular: false,
      meals: [
        { size: "petit", price: "13.4", count: "14 repas" },
        { size: "regular", price: "13.9", count: "14 repas" },
        { size: "grand", price: "15.4", count: "14 repas" }
      ]
    },
    {
      id: "22-30",
      title: "22 à 30 Repas",
      subtitle: "par semaine",
      price: "40",
      savings: null,
      description: "En quantité",
      popular: false,
      meals: [
        { size: "petit", price: "13.2", count: "22 repas" },
        { size: "regular", price: "13.7", count: "22 repas" },
        { size: "grand", price: "15.2", count: "22 repas" }
      ]
    }
  ];

  const features = [
    {
      icon: Truck,
      title: "Frais, jamais congelé",
      description: "Livraison fraîche directement chez vous"
    },
    {
      icon: Leaf,
      title: "Ingrédients sains",
      description: "Produits de qualité et biologiques"
    },
    {
      icon: Clock,
      title: "Prêt en 2 minutes",
      description: "Réchauffez et savourez rapidement"
    },
    {
      icon: ChefHat,
      title: "Pas de préparation ni de cuisine",
      description: "Tout est prêt, plus qu'à déguster"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#113B39' }}>
            Découvrez nos forfaits
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Commandez de 6 à 30 repas livrés directement à votre porte.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Meal Size Selection */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#113B39' }}>
                Manger santé, c'est facile
              </h2>
              <p className="text-gray-600">
                Avec nos repas fraîchement préparés à portée de main, manger santé n'aura jamais été aussi savoureux !
              </p>
            </div>

            {/* Meal Size Selector */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-center mb-8" style={{ color: '#113B39' }}>
                Choisissez la taille des repas
              </h3>
              
              <div className="flex justify-center items-center space-x-8">
                <div 
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                    selectedSize === "petit" ? "border-[#113B39] bg-[#113B39]/5" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedSize("petit")}
                >
                  <div className="w-20 h-16 bg-orange-200 rounded mb-2"></div>
                  <p className="text-center font-medium">Petit</p>
                </div>
                
                <div 
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all relative ${
                    selectedSize === "regular" ? "border-[#113B39] bg-[#113B39]/5" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedSize("regular")}
                >
                  {selectedSize === "regular" && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#113B39]">
                      Le plus populaire !
                    </Badge>
                  )}
                  <div className="w-20 h-16 bg-orange-300 rounded mb-2"></div>
                  <p className="text-center font-medium">Régulier</p>
                </div>
              </div>
            </div>
          </div>

          {/* Package Selection */}
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-center mb-8" style={{ color: '#113B39' }}>
              Choisissez le nombre de repas
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => {
                const currentMeal = pkg.meals.find(meal => meal.size === selectedSize);
                return (
                  <Card key={pkg.id} className={`relative ${pkg.popular ? 'ring-2 ring-[#113B39]' : ''}`}>
                    {pkg.popular && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#113B39]">
                        Le plus populaire !
                      </Badge>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <div className="text-sm text-gray-600 mb-2">
                        À partir de <span className="font-bold">{pkg.price} $</span>
                      </div>
                      <CardTitle className="text-xl font-bold" style={{ color: '#113B39' }}>
                        {pkg.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm">{pkg.subtitle}</p>
                      <p className="text-[#FF4D00] font-medium text-sm">{pkg.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <Button 
                        className="w-full bg-[#113B39] hover:bg-[#113B39]/90"
                        onClick={() => setSelectedPackage(pkg.id)}
                      >
                        Choisir ce forfait
                      </Button>
                      
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-bold text-[#113B39]">{currentMeal?.price}$ </span>
                          <span className="text-gray-600">par {currentMeal?.count}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>🟢 Livraison: 30 $ de rabais</div>
                        <div>🟢 En magasin: 30 $ de rabais</div>
                        <div>🟢 Expédition: 30 $ de rabais</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8" style={{ color: '#113B39' }}>
              Le choix de prêt-à-manger numéro 1 au pays
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#113B39] rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold" style={{ color: '#113B39' }}>
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Forfaits;
