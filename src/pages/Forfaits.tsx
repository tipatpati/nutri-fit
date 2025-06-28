import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ShoppingCart, Truck, Clock, ChefHat, Leaf, Star, Heart, Zap, Shield } from "lucide-react";
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
      gradient: "from-blue-500 to-cyan-500",
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
      savings: "Économisez 15%",
      description: "Le plus populaire",
      popular: true,
      gradient: "from-emerald-500 to-green-500",
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
      savings: "Économisez 20%",
      description: "Pour familles",
      popular: false,
      gradient: "from-orange-500 to-red-500",
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
      savings: "Économisez 25%",
      description: "En quantité",
      popular: false,
      gradient: "from-purple-500 to-pink-500",
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
      description: "Livraison fraîche directement chez vous",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Leaf,
      title: "Ingrédients sains",
      description: "Produits de qualité et biologiques",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: Clock,
      title: "Prêt en 2 minutes",
      description: "Réchauffez et savourez rapidement",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: ChefHat,
      title: "Pas de préparation ni de cuisine",
      description: "Tout est prêt, plus qu'à déguster",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-x-hidden">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-24 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-xl border border-white/20 rounded-full font-medium text-xs sm:text-sm mb-6 sm:mb-8 text-white">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400 flex-shrink-0" />
            Forfaits Premium NutriFit
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight px-2">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Découvrez nos
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
              forfaits santé
            </span>
          </h1>
          
          <p className="text-base sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
            Commandez de 6 à 30 repas livrés directement à votre porte.
            <span className="block mt-2 text-emerald-400 font-medium">
              Nutrition premium • Saveurs authentiques • Qualité garantie
            </span>
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-gray-300 px-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
              <span className="font-medium text-xs sm:text-base">Qualité certifiée</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
              <span className="font-medium text-xs sm:text-base">10K+ clients satisfaits</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
              <span className="font-medium text-xs sm:text-base">Livraison express</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-20 lg:py-24">
        <div className="container mx-auto px-2 sm:px-4">
          {/* Enhanced Meal Size Selection */}
          <div className="max-w-5xl mx-auto mb-12 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12 px-2">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium text-xs sm:text-sm mb-4 sm:mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 flex-shrink-0"></span>
                Étape 1
              </div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Manger santé, c'est facile
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Avec nos repas fraîchement préparés à portée de main, manger santé n'aura jamais été aussi savoureux !
              </p>
            </div>

            {/* Enhanced Meal Size Selector */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 shadow-2xl border border-gray-100 mx-2">
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-10" style={{ color: '#113B39' }}>
                Choisissez la taille des repas
              </h3>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-12">
                {[
                  { size: "petit", label: "Petit", calories: "300-400 cal", bgClass: "from-orange-200 to-orange-300" },
                  { size: "regular", label: "Régulier", calories: "450-600 cal", bgClass: "from-orange-300 to-orange-400", popular: true },
                  { size: "grand", label: "Grand", calories: "650-800 cal", bgClass: "from-orange-400 to-orange-500" }
                ].map((item) => (
                  <div 
                    key={item.size}
                    className={`group cursor-pointer p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:scale-105 relative w-full sm:w-auto ${
                      selectedSize === item.size ? "border-[#113B39] bg-gradient-to-br from-[#113B39]/5 to-[#113B39]/10 shadow-lg" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedSize(item.size)}
                  >
                    {item.popular && (
                      <Badge className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs px-3 sm:px-4 py-1">
                        Le plus populaire !
                      </Badge>
                    )}
                    <div className={`w-16 h-12 sm:w-20 sm:h-16 lg:w-24 lg:h-20 bg-gradient-to-br ${item.bgClass} rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform mx-auto`}></div>
                    <p className="text-center font-bold text-base sm:text-lg">{item.label}</p>
                    <p className="text-center text-xs sm:text-sm text-gray-500 mt-1">{item.calories}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Package Selection */}
          <div className="max-w-7xl mx-auto mb-12 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12 px-2">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-xs sm:text-sm mb-4 sm:mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                Étape 2
              </div>
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Choisissez le nombre de repas
              </h3>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Sélectionnez le forfait qui correspond à vos besoins et votre style de vie
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-2">
              {packages.map((pkg) => {
                const currentMeal = pkg.meals.find(meal => meal.size === selectedSize);
                return (
                  <Card key={pkg.id} className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:scale-[1.02] ${pkg.popular ? 'ring-2 ring-emerald-500 border-emerald-200' : 'border-gray-200 hover:border-gray-300'}`}>
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm px-6 py-2 shadow-lg">
                          ⭐ Le plus populaire !
                        </Badge>
                      </div>
                    )}
                    
                    {/* Header with gradient */}
                    <div className={`h-24 bg-gradient-to-br ${pkg.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative z-10 text-center">
                        <div className="text-white font-bold text-lg">{pkg.title}</div>
                        <div className="text-white/80 text-sm">{pkg.subtitle}</div>
                      </div>
                    </div>
                    
                    <CardHeader className="text-center pb-4 pt-6">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          À partir de <span className="font-bold text-2xl text-gray-900">{pkg.price} $</span>
                        </div>
                        {pkg.savings && (
                          <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                            {pkg.savings}
                          </Badge>
                        )}
                        <p className="text-orange-600 font-semibold text-sm">{pkg.description}</p>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 pt-0">
                      <div className="text-center space-y-2">
                        <div className="text-lg">
                          <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            {currentMeal?.price}$
                          </span>
                          <span className="text-gray-600 text-sm ml-1">par repas</span>
                        </div>
                        <div className="text-sm text-gray-500">{currentMeal?.count}</div>
                      </div>
                      
                      <Button 
                        className={`w-full bg-gradient-to-r ${pkg.gradient} hover:shadow-lg hover:shadow-current/25 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:scale-[1.02]`}
                        onClick={() => setSelectedPackage(pkg.id)}
                      >
                        Choisir ce forfait
                        <ShoppingCart className="ml-2 w-4 h-4" />
                      </Button>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-xs text-emerald-600">
                          <Check className="w-3 h-3 mr-2" />
                          <span>Livraison: 30$ de rabais</span>
                        </div>
                        <div className="flex items-center text-xs text-emerald-600">
                          <Check className="w-3 h-3 mr-2" />
                          <span>En magasin: 30$ de rabais</span>
                        </div>
                        <div className="flex items-center text-xs text-emerald-600">
                          <Check className="w-3 h-3 mr-2" />
                          <span>Expédition: 30$ de rabais</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Enhanced Features Section */}
          <div className="max-w-6xl mx-auto px-2">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium text-xs sm:text-sm mb-4 sm:mb-6">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></span>
                Pourquoi nous choisir
              </div>
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Le choix de prêt-à-manger numéro 1 au pays
              </h3>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Une expérience culinaire exceptionnelle qui transforme votre quotidien
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group text-center space-y-4 sm:space-y-6 p-4 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-500">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-base sm:text-xl text-gray-900 group-hover:text-gray-700 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
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
