
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const MealCategories = () => {
  const categories = [
    {
      id: 'bulking',
      name: 'Prise de masse',
      description: 'Repas riches en protéines et calories pour développer votre masse musculaire',
      color: '#FF4D00',
      meals: [
        { name: 'Saumon grillé aux légumes', calories: '650 cal', protein: '45g protéines' },
        { name: 'Bœuf teriyaki avec riz', calories: '720 cal', protein: '52g protéines' },
        { name: 'Poulet aux champignons', calories: '680 cal', protein: '48g protéines' }
      ]
    },
    {
      id: 'cutting',
      name: 'Perte de poids',
      description: 'Repas faibles en calories mais riches en nutriments essentiels',
      color: '#113B39',
      meals: [
        { name: 'Salade de quinoa au saumon', calories: '420 cal', protein: '32g protéines' },
        { name: 'Poulet grillé aux légumes verts', calories: '380 cal', protein: '35g protéines' },
        { name: 'Crevettes à l\'ail et épinards', calories: '350 cal', protein: '28g protéines' }
      ]
    },
    {
      id: 'balanced',
      name: 'Équilibré',
      description: 'Repas parfaitement équilibrés pour maintenir votre forme optimale',
      color: '#D4B961',
      meals: [
        { name: 'Saumon aux légumes rôtis', calories: '550 cal', protein: '38g protéines' },
        { name: 'Poulet méditerranéen', calories: '520 cal', protein: '36g protéines' },
        { name: 'Bœuf aux légumes asiatiques', calories: '580 cal', protein: '42g protéines' }
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#113B39' }}>
            Comment ça fonctionne ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explorez nos livraisons de repas santé pour une alimentation équilibrée qui répond à vos objectifs de remise en forme
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div 
                  className="h-32 flex items-center justify-center text-white text-center"
                  style={{ backgroundColor: category.color }}
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{index + 1}</h3>
                    <h4 className="text-xl font-semibold">{category.name}</h4>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <p className="text-gray-600">{category.description}</p>
                  
                  <div className="space-y-3">
                    {category.meals.map((meal, idx) => (
                      <div key={idx} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                        <h5 className="font-medium text-[#113B39] mb-1">{meal.name}</h5>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{meal.calories}</span>
                          <span>{meal.protein}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    style={{ 
                      backgroundColor: category.color,
                      color: 'white'
                    }}
                  >
                    Découvrir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MealCategories;
