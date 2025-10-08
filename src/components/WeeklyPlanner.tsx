
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Star, TrendingUp } from "lucide-react";
import { Icon } from "./ui/icon";

const WeeklyPlanner = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedSize, setSelectedSize] = useState("regular");
  
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  
  const weekMeals = [
    {
      day: 'Lun',
      meals: [
        { name: 'Saumon grillé', type: 'Équilibré', icon: 'fish' as const, calories: 550, rating: 4.8 },
        { name: 'Poulet teriyaki', type: 'Prise de masse', icon: 'apple' as const, calories: 680, rating: 4.9 }
      ]
    },
    {
      day: 'Mar', 
      meals: [
        { name: 'Salade de quinoa', type: 'Perte de poids', icon: 'leaves' as const, calories: 420, rating: 4.7 },
        { name: 'Bœuf aux légumes', type: 'Équilibré', icon: 'apple' as const, calories: 580, rating: 4.8 }
      ]
    },
    {
      day: 'Mer',
      meals: [
        { name: 'Crevettes à l\'ail', type: 'Perte de poids', icon: 'fish' as const, calories: 350, rating: 4.6 },
        { name: 'Poulet méditerranéen', type: 'Équilibré', icon: 'apple' as const, calories: 520, rating: 4.7 }
      ]
    },
    {
      day: 'Jeu',
      meals: [
        { name: 'Saumon aux légumes', type: 'Prise de masse', icon: 'fish' as const, calories: 650, rating: 4.9 },
        { name: 'Salade protéinée', type: 'Perte de poids', icon: 'leaves' as const, calories: 380, rating: 4.5 }
      ]
    },
    {
      day: 'Ven',
      meals: [
        { name: 'Bœuf teriyaki', type: 'Prise de masse', icon: 'apple' as const, calories: 720, rating: 4.8 },
        { name: 'Poulet grillé léger', type: 'Perte de poids', icon: 'leaves' as const, calories: 380, rating: 4.6 }
      ]
    },
    {
      day: 'Sam',
      meals: [
        { name: 'Saumon méditerranéen', type: 'Équilibré', icon: 'fish' as const, calories: 550, rating: 4.8 },
        { name: 'Salade de poulet', type: 'Perte de poids', icon: 'leaves' as const, calories: 350, rating: 4.7 }
      ]
    },
    {
      day: 'Dim',
      meals: [
        { name: 'Bœuf aux champignons', type: 'Prise de masse', icon: 'apple' as const, calories: 680, rating: 4.9 },
        { name: 'Poisson aux légumes', type: 'Équilibré', icon: 'fish' as const, calories: 520, rating: 4.6 }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Prise de masse': return { bg: 'bg-gradient-to-br from-orange-500 to-red-500', text: 'text-white', light: 'from-orange-50 to-red-50' };
      case 'Perte de poids': return { bg: 'bg-gradient-to-br from-emerald-500 to-green-500', text: 'text-white', light: 'from-emerald-50 to-green-50' };
      case 'Équilibré': return { bg: 'bg-gradient-to-br from-yellow-500 to-amber-500', text: 'text-white', light: 'from-yellow-50 to-amber-50' };
      default: return { bg: 'bg-gray-500', text: 'text-white', light: 'from-gray-50 to-gray-100' };
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[hsl(var(--md-sys-color-surface-container-low))] via-[hsl(var(--md-sys-color-surface-container))] to-[hsl(var(--md-sys-color-surface-container-low))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            Planification intelligente
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Personnalisez votre semaine
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Planifiez vos repas pour la semaine selon vos objectifs avec notre IA nutritionnelle
          </p>
        </div>

        {/* Meal Size Selection */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Choisissez la taille de vos repas
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div 
                className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selectedSize === "petit" 
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg scale-105" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
                onClick={() => setSelectedSize("petit")}
              >
                <div className="w-20 h-16 bg-gradient-to-br from-orange-200 to-orange-300 rounded-xl mb-4 mx-auto shadow-inner"></div>
                <p className="text-center font-bold text-lg text-gray-800">Petit</p>
                <p className="text-center text-sm text-gray-600 mt-1">400-500 cal</p>
              </div>
              
              <div 
                className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 relative ${
                  selectedSize === "regular" 
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg scale-105" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
                onClick={() => setSelectedSize("regular")}
              >
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  Recommandé
                </Badge>
                <div className="w-20 h-16 bg-gradient-to-br from-orange-300 to-orange-400 rounded-xl mb-4 mx-auto shadow-inner"></div>
                <p className="text-center font-bold text-lg text-gray-800">Régulier</p>
                <p className="text-center text-sm text-gray-600 mt-1">500-700 cal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Meal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mb-12">
          {weekMeals.map((day, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-2 border-gray-100 hover:border-blue-200 bg-white/80 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="text-center text-lg font-bold text-gray-800 flex items-center justify-center">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-2"></span>
                  {day.day}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.meals.map((meal, mealIndex) => {
                  const colors = getTypeColor(meal.type);
                  return (
                    <div 
                      key={mealIndex}
                      className={`p-4 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 bg-gradient-to-br ${colors.light} border border-gray-200 hover:shadow-md`}
                    >
                      <div className="text-center space-y-3">
                        <div className="mb-2 flex items-center justify-center">
                          <Icon name={meal.icon} size={40} />
                        </div>
                        <h5 className="font-bold text-sm text-gray-800 leading-tight">{meal.name}</h5>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium text-gray-600">{meal.rating}</span>
                          </div>
                          
                          <div className="text-xs text-gray-600 font-medium">
                            {meal.calories} cal
                          </div>
                          
                          <Badge 
                            className={`${colors.bg} ${colors.text} text-xs px-3 py-1 font-medium shadow-sm`}
                          >
                            {meal.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats & CTA */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-xl text-gray-800 mb-2">+15% d'énergie</h4>
            <p className="text-gray-600 text-sm">Moyenne constatée chez nos clients</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="stopwatch" size={32} className="brightness-0 invert" />
            </div>
            <h4 className="font-bold text-xl text-gray-800 mb-2">2 minutes</h4>
            <p className="text-gray-600 text-sm">Temps de préparation moyen</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heart-health" size={32} className="brightness-0 invert" />
            </div>
            <h4 className="font-bold text-xl text-gray-800 mb-2">Objectifs atteints</h4>
            <p className="text-gray-600 text-sm">92% de nos clients satisfaits</p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
          >
            Commencer ma planification
            <Calendar className="ml-3 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WeeklyPlanner;
