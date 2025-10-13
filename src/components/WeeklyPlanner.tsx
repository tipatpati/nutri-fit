
import { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Star, TrendingUp, X } from "lucide-react";
import { Icon } from "./ui/icon";
import { useMeals } from "@/presentation/hooks/useMeals";
import { useKitchenCapacity } from "@/hooks/useKitchenCapacity";
import { format, addDays, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";

const WeeklyPlanner = () => {
  const [selectedSize, setSelectedSize] = useState("regular");
  const { data: meals = [], isLoading: mealsLoading } = useMeals({ active: true });
  
  // Generate next 7 days with actual dates
  const weekDays = useMemo(() => {
    const today = startOfDay(new Date());
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(today, i + 1); // Start from tomorrow
      return {
        date,
        dayName: format(date, 'EEE', { locale: fr }),
        dayNumber: format(date, 'd'),
        monthName: format(date, 'MMM', { locale: fr }),
        fullDate: format(date, 'yyyy-MM-dd')
      };
    });
  }, []);

  const startDate = weekDays[0]?.date || new Date();
  const endDate = weekDays[weekDays.length - 1]?.date || new Date();
  const { data: capacityData = [], isLoading: capacityLoading } = useKitchenCapacity(startDate, endDate);

  // Create week meals with availability check
  const weekMeals = useMemo(() => {
    if (!meals.length) return [];
    
    const categories = ['Équilibré', 'Prise de masse', 'Perte de poids'];
    const getIconForMeat = (meat: string) => {
      const meatLower = meat?.toLowerCase() || '';
      if (meatLower.includes('saumon') || meatLower.includes('poisson') || meatLower.includes('crevette')) return 'fish' as const;
      if (meatLower.includes('légume') || meatLower.includes('salade') || meatLower.includes('quinoa')) return 'leaves' as const;
      return 'apple' as const;
    };

    return weekDays.map((day, index) => {
      // Check if this date has available capacity
      const dayCapacity = capacityData.find(c => c.date === day.fullDate);
      const isAvailable = dayCapacity ? dayCapacity.availableSlots > 0 : false;

      const dayMeals = categories.slice(0, 2).map((category, catIndex) => {
        const categoryMeals = meals.filter(m => m.category === category && m.active);
        const meal = categoryMeals[(index + catIndex) % categoryMeals.length] || categoryMeals[0];
        
        if (!meal) return null;

        return {
          name: meal.name,
          type: meal.category,
          icon: getIconForMeat(meal.meat),
          calories: meal.calories_per_serving || 0,
          rating: 4.8
        };
      }).filter(Boolean);

      return {
        ...day,
        meals: dayMeals,
        isAvailable
      };
    });
  }, [meals, weekDays, capacityData]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Prise de masse': return { bg: 'bg-gradient-to-br from-orange-500 to-red-500', text: 'text-white', light: 'from-orange-50 to-red-50' };
      case 'Perte de poids': return { bg: 'bg-gradient-to-br from-emerald-500 to-green-500', text: 'text-white', light: 'from-emerald-50 to-green-50' };
      case 'Équilibré': return { bg: 'bg-gradient-to-br from-yellow-500 to-amber-500', text: 'text-white', light: 'from-yellow-50 to-amber-50' };
      default: return { bg: 'bg-gray-500', text: 'text-white', light: 'from-gray-50 to-gray-100' };
    }
  };

  if (mealsLoading || capacityLoading) {
    return (
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-[hsl(var(--md-sys-color-surface-container-low))]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--md-sys-color-surface-container-highest))] rounded-[var(--md-sys-shape-corner-full)] md-label-medium border border-[hsl(var(--md-sys-color-outline-variant))] mb-4">
            <Calendar className="w-4 h-4 text-[hsl(var(--md-sys-color-secondary))]" />
            Planification intelligente
          </div>
          <h2 className="md-display-large mb-4">
            Personnalisez votre semaine
          </h2>
          <p className="md-body-large max-w-3xl mx-auto leading-relaxed">
            Planifiez vos repas pour la semaine selon vos objectifs avec notre IA nutritionnelle
          </p>
        </div>

        {/* Meal Size Selection */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-[hsl(var(--md-sys-color-surface))] rounded-[var(--md-sys-shape-corner-extra-large)] p-6 lg:p-8 border border-[hsl(var(--md-sys-color-outline-variant))]">
            <h3 className="md-headline-medium text-center mb-6">
              Choisissez la taille de vos repas
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div 
                className={`cursor-pointer p-6 rounded-[var(--md-sys-shape-corner-large)] border-2 transition-all duration-200 ${
                  selectedSize === "petit" 
                    ? "border-[hsl(var(--md-sys-color-secondary))] bg-[hsl(var(--md-sys-color-secondary-container))] md-elevation-2" 
                    : "border-[hsl(var(--md-sys-color-outline-variant))] hover:border-[hsl(var(--md-sys-color-outline))]"
                }`}
                onClick={() => setSelectedSize("petit")}
              >
                <div className="w-20 h-16 bg-gradient-to-br from-[hsl(var(--md-sys-color-secondary))] to-[hsl(var(--md-sys-color-tertiary))] rounded-[var(--md-sys-shape-corner-medium)] mb-4 mx-auto"></div>
                <p className="text-center font-bold md-title-medium">Petit</p>
                <p className="text-center md-body-small mt-1">400-500 cal</p>
              </div>
              
              <div 
                className={`cursor-pointer p-6 rounded-[var(--md-sys-shape-corner-large)] border-2 transition-all duration-200 relative ${
                  selectedSize === "regular" 
                    ? "border-[hsl(var(--md-sys-color-secondary))] bg-[hsl(var(--md-sys-color-secondary-container))] md-elevation-2" 
                    : "border-[hsl(var(--md-sys-color-outline-variant))] hover:border-[hsl(var(--md-sys-color-outline))]"
                }`}
                onClick={() => setSelectedSize("regular")}
              >
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[hsl(var(--md-sys-color-secondary))] to-[hsl(var(--md-sys-color-tertiary))] text-white border-0">
                  Recommandé
                </Badge>
                <div className="w-20 h-16 bg-gradient-to-br from-[hsl(var(--md-sys-color-secondary))] to-[hsl(var(--md-sys-color-tertiary))] rounded-[var(--md-sys-shape-corner-medium)] mb-4 mx-auto"></div>
                <p className="text-center font-bold md-title-medium">Régulier</p>
                <p className="text-center md-body-small mt-1">500-700 cal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Meal Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 lg:gap-4 mb-12">
          {weekMeals.map((day, index) => (
            <div key={index} className={`group ${!day.isAvailable ? 'opacity-40' : ''}`}>
              {/* Day Header */}
              <div className="text-center mb-3">
                <div className={`inline-flex flex-col items-center justify-center w-16 h-16 rounded-full shadow-md mb-2 transition-transform ${
                  day.isAvailable 
                    ? 'bg-gradient-to-br from-orange-500 to-amber-500 group-hover:scale-110' 
                    : 'bg-gradient-to-br from-slate-300 to-slate-400 relative'
                }`}>
                  {day.isAvailable ? (
                    <>
                      <span className="text-white font-bold text-xs">{day.dayName}</span>
                      <span className="text-white font-bold text-lg">{day.dayNumber}</span>
                      <span className="text-white text-[10px] opacity-90">{day.monthName}</span>
                    </>
                  ) : (
                    <>
                      <X className="w-6 h-6 text-white absolute" />
                      <span className="text-white text-[10px] mt-6 opacity-75">Complet</span>
                    </>
                  )}
                </div>
              </div>

              {/* Meals or Blank */}
              {day.isAvailable ? (
                <div className="space-y-3">
                  {day.meals.map((meal, mealIndex) => {
                    const colors = getTypeColor(meal.type);
                    return (
                      <Card 
                        key={mealIndex}
                        className="group/meal hover:shadow-xl transition-all duration-300 border-2 border-md-outline-variant hover:border-md-primary cursor-pointer overflow-hidden bg-white"
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center space-y-3">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover/meal:scale-110 transition-transform">
                              <Icon name={meal.icon} size={32} />
                            </div>
                            
                            {/* Meal Name */}
                            <h5 className="font-bold text-xs leading-tight text-md-on-surface line-clamp-2 min-h-[2.5rem]">
                              {meal.name}
                            </h5>
                            
                            {/* Stats */}
                            <div className="w-full space-y-2">
                              <div className="flex items-center justify-center gap-2">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-semibold text-md-on-surface-variant">{meal.rating}</span>
                              </div>
                              
                              <div className="text-xs font-bold text-md-primary">
                                {meal.calories} cal
                              </div>
                            </div>
                            
                            {/* Category Badge */}
                            <Badge 
                              className={`${colors.bg} ${colors.text} text-[10px] px-2 py-0.5 font-semibold w-full justify-center`}
                            >
                              {meal.type}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  <Card className="border-2 border-dashed border-slate-300 bg-slate-50">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center justify-center h-32 text-center">
                        <X className="w-8 h-8 text-slate-400 mb-2" />
                        <p className="text-xs text-slate-500 font-medium">Aucune disponibilité</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
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
