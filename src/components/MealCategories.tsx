
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, Star } from "lucide-react";

const MealCategories = () => {
  const categories = [
    {
      id: 'bulking',
      name: 'Prise de masse',
      description: 'Repas riches en protéines et calories pour développer votre masse musculaire de façon optimale',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-200',
      step: '01',
      meals: [
        { name: 'Saumon grillé aux légumes', calories: '650 cal', protein: '45g protéines', rating: 4.9 },
        { name: 'Bœuf teriyaki avec riz', calories: '720 cal', protein: '52g protéines', rating: 4.8 },
        { name: 'Poulet aux champignons', calories: '680 cal', protein: '48g protéines', rating: 4.7 }
      ]
    },
    {
      id: 'cutting',
      name: 'Perte de poids',
      description: 'Repas faibles en calories mais riches en nutriments essentiels pour votre bien-être',
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200',
      step: '02',
      meals: [
        { name: 'Salade de quinoa au saumon', calories: '420 cal', protein: '32g protéines', rating: 4.9 },
        { name: 'Poulet grillé aux légumes verts', calories: '380 cal', protein: '35g protéines', rating: 4.8 },
        { name: 'Crevettes à l\'ail et épinards', calories: '350 cal', protein: '28g protéines', rating: 4.6 }
      ]
    },
    {
      id: 'balanced',
      name: 'Équilibré',
      description: 'Repas parfaitement équilibrés pour maintenir votre forme optimale au quotidien',
      gradient: 'from-yellow-500 to-amber-500',
      bgGradient: 'from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-200',
      step: '03',
      meals: [
        { name: 'Saumon aux légumes rôtis', calories: '550 cal', protein: '38g protéines', rating: 4.8 },
        { name: 'Poulet méditerranéen', calories: '520 cal', protein: '36g protéines', rating: 4.7 },
        { name: 'Bœuf aux légumes asiatiques', calories: '580 cal', protein: '42g protéines', rating: 4.9 }
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium text-sm mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            Comment ça fonctionne
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Votre parcours nutrition personnalisé
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explorez nos programmes de repas santé conçus par des nutritionnistes pour répondre précisément à vos objectifs de remise en forme
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card key={category.id} className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 ${category.borderColor} hover:scale-[1.02] bg-gradient-to-br ${category.bgGradient}`}>
              <CardContent className="p-0">
                <div className={`h-40 bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white text-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="text-6xl font-bold opacity-20 absolute -top-4 -right-4">
                      {category.step}
                    </div>
                    <div className="text-3xl font-bold mb-2">{category.step}</div>
                    <h4 className="text-2xl font-bold">{category.name}</h4>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  <p className="text-gray-700 leading-relaxed">{category.description}</p>
                  
                  <div className="space-y-4">
                    {category.meals.map((meal, idx) => (
                      <div key={idx} className="group/meal border-2 border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-900 group-hover/meal:text-gray-700 transition-colors">{meal.name}</h5>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium text-gray-600">{meal.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 font-medium">{meal.calories}</span>
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">{meal.protein}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full mt-6 bg-gradient-to-r ${category.gradient} hover:shadow-lg hover:shadow-current/25 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:scale-[1.02]`}
                  >
                    Découvrir le programme
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-8 text-white shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Prêt à transformer votre alimentation ?</h3>
            <p className="text-emerald-100 mb-6 text-lg">Rejoignez plus de 10 000 clients satisfaits</p>
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 font-bold px-8 py-3 rounded-xl shadow-lg">
              Commencer mon parcours
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealCategories;
