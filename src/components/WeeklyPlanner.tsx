
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
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-700 mb-4 border border-slate-200">
            <Calendar className="w-4 h-4 text-orange-500" />
            Planification intelligente
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Personnalisez votre semaine
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Planifiez vos repas pour la semaine selon vos objectifs avec notre IA nutritionnelle
          </p>
        </div>

        {/* Meal Size Selection */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-center mb-6 text-slate-900">
              Choisissez la taille de vos repas
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div 
                className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedSize === "petit" 
                    ? "border-orange-500 bg-orange-50 shadow-md" 
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setSelectedSize("petit")}
              >
                <div className="w-20 h-16 bg-gradient-to-br from-orange-200 to-orange-300 rounded-xl mb-4 mx-auto"></div>
                <p className="text-center font-bold text-lg text-slate-800">Petit</p>
                <p className="text-center text-sm text-slate-600 mt-1">400-500 cal</p>
              </div>
              
              <div 
                className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 relative ${
                  selectedSize === "regular" 
                    ? "border-orange-500 bg-orange-50 shadow-md" 
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setSelectedSize("regular")}
              >
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
                  Recommandé
                </Badge>
                <div className="w-20 h-16 bg-gradient-to-br from-orange-300 to-orange-400 rounded-xl mb-4 mx-auto"></div>
                <p className="text-center font-bold text-lg text-slate-800">Régulier</p>
                <p className="text-center text-sm text-slate-600 mt-1">500-700 cal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Meal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 lg:gap-5 mb-10">
          {weekMeals.map((day, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-200 border border-slate-200 hover:border-slate-300 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-center text-base font-bold text-slate-800 flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  {day.day}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.meals.map((meal, mealIndex) => {
                  const colors = getTypeColor(meal.type);
                  return (
                    <div 
                      key={mealIndex}
                      className={`p-4 rounded-xl cursor-pointer hover:scale-105 transition-all duration-200 bg-gradient-to-br ${colors.light} border border-slate-200`}
                    >
                      <div className="text-center space-y-3">
                        <div className="mb-2 flex items-center justify-center">
                          <Icon name={meal.icon} size={40} />
                        </div>
                        <h5 className="font-bold text-sm text-slate-800 leading-tight">{meal.name}</h5>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium text-slate-600">{meal.rating}</span>
                          </div>
                          
                          <div className="text-xs text-slate-600 font-medium">
                            {meal.calories} cal
                          </div>
                          
                          <Badge 
                            className={`${colors.bg} ${colors.text} text-xs px-3 py-1 font-medium`}
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
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-10">
          <div className="text-center p-5 bg-white rounded-2xl border border-slate-200">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-bold text-lg text-slate-800 mb-1.5">+15% d'énergie</h4>
            <p className="text-slate-600 text-sm">Moyenne constatée chez nos clients</p>
          </div>
          
          <div className="text-center p-5 bg-white rounded-2xl border border-slate-200">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="stopwatch" size={28} className="brightness-0 invert" />
            </div>
            <h4 className="font-bold text-lg text-slate-800 mb-1.5">2 minutes</h4>
            <p className="text-slate-600 text-sm">Temps de préparation moyen</p>
          </div>
          
          <div className="text-center p-5 bg-white rounded-2xl border border-slate-200">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="heart-health" size={28} className="brightness-0 invert" />
            </div>
            <h4 className="font-bold text-lg text-slate-800 mb-1.5">Objectifs atteints</h4>
            <p className="text-slate-600 text-sm">92% de nos clients satisfaits</p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-10 py-5 rounded-xl font-bold text-base transition-all duration-200"
          >
            Commencer ma planification
            <Calendar className="ml-2.5 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WeeklyPlanner;
