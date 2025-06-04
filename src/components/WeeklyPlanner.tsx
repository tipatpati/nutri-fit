
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const WeeklyPlanner = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  
  const weekMeals = [
    {
      day: 'Lun',
      meals: [
        { name: 'Saumon grillé', type: 'Équilibré', image: '🐟' },
        { name: 'Poulet teriyaki', type: 'Prise de masse', image: '🍗' }
      ]
    },
    {
      day: 'Mar', 
      meals: [
        { name: 'Salade de quinoa', type: 'Perte de poids', image: '🥗' },
        { name: 'Bœuf aux légumes', type: 'Équilibré', image: '🥩' }
      ]
    },
    {
      day: 'Mer',
      meals: [
        { name: 'Crevettes à l\'ail', type: 'Perte de poids', image: '🦐' },
        { name: 'Poulet méditerranéen', type: 'Équilibré', image: '🍗' }
      ]
    },
    {
      day: 'Jeu',
      meals: [
        { name: 'Saumon aux légumes', type: 'Prise de masse', image: '🐟' },
        { name: 'Salade protéinée', type: 'Perte de poids', image: '🥗' }
      ]
    },
    {
      day: 'Ven',
      meals: [
        { name: 'Bœuf teriyaki', type: 'Prise de masse', image: '🥩' },
        { name: 'Poulet grillé léger', type: 'Perte de poids', image: '🍗' }
      ]
    },
    {
      day: 'Sam',
      meals: [
        { name: 'Saumon méditerranéen', type: 'Équilibré', image: '🐟' },
        { name: 'Salade de poulet', type: 'Perte de poids', image: '🥗' }
      ]
    },
    {
      day: 'Dim',
      meals: [
        { name: 'Bœuf aux champignons', type: 'Prise de masse', image: '🥩' },
        { name: 'Poisson aux légumes', type: 'Équilibré', image: '🐟' }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Prise de masse': return '#FF4D00';
      case 'Perte de poids': return '#113B39';
      case 'Équilibré': return '#D4B961';
      default: return '#525944';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#113B39' }}>
            Personnalisez vos repas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Planifiez vos repas pour la semaine selon vos objectifs de fitness
          </p>
        </div>

        {/* Meal Size Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-center" style={{ color: '#113B39' }}>
              Choisissez la taille des repas
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#D4B961] cursor-pointer transition-colors">
                <div className="text-2xl mb-2">🍽️</div>
                <h4 className="font-medium">Petit</h4>
                <p className="text-sm text-gray-500">400-500 cal</p>
              </div>
              <div className="text-center p-4 border-2 border-[#D4B961] bg-[#D4B961]/10 rounded-lg cursor-pointer">
                <div className="text-2xl mb-2">🍽️</div>
                <h4 className="font-medium">Régulier</h4>
                <p className="text-sm text-gray-500">500-700 cal</p>
                <span className="text-xs bg-[#D4B961] text-white px-2 py-1 rounded">Le plus populaire</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Meal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
          {weekMeals.map((day, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-sm font-medium" style={{ color: '#113B39' }}>
                  {day.day}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {day.meals.map((meal, mealIndex) => (
                  <div 
                    key={mealIndex}
                    className="p-2 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${getTypeColor(meal.type)}15` }}
                  >
                    <div className="text-lg mb-1">{meal.image}</div>
                    <h5 className="text-xs font-medium text-gray-800">{meal.name}</h5>
                    <span 
                      className="text-xs px-2 py-1 rounded text-white"
                      style={{ backgroundColor: getTypeColor(meal.type) }}
                    >
                      {meal.type}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white px-8"
          >
            Commencer ma planification
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WeeklyPlanner;
