
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface GoalSelectionProps {
  selectedGoal: string | null;
  onGoalSelect: (goal: string) => void;
  onProceed: () => void;
}

const GoalSelection = ({ selectedGoal, onGoalSelect, onProceed }: GoalSelectionProps) => {
  const goals = [
    {
      id: 'bulking',
      name: 'Prise de masse',
      description: 'Repas riches en protéines et calories pour développer votre masse musculaire de façon optimale',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-200',
      icon: '💪'
    },
    {
      id: 'cutting',
      name: 'Perte de poids',
      description: 'Repas faibles en calories mais riches en nutriments essentiels pour votre bien-être',
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200',
      icon: '🔥'
    },
    {
      id: 'balanced',
      name: 'Équilibré',
      description: 'Repas parfaitement équilibrés pour maintenir votre forme optimale au quotidien',
      gradient: 'from-yellow-500 to-amber-500',
      bgGradient: 'from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-200',
      icon: '⚖️'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-slate-800">
          Quel est votre objectif ?
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Choisissez votre programme nutritionnel adapté à vos besoins
        </p>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {goals.map((goal) => (
          <Card 
            key={goal.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
              selectedGoal === goal.id 
                ? `ring-2 ring-offset-2 ring-current shadow-xl scale-[1.02] bg-gradient-to-br ${goal.bgGradient}` 
                : 'hover:shadow-lg bg-white/90'
            } border-2 ${goal.borderColor}`}
            onClick={() => onGoalSelect(goal.id)}
          >
            <CardContent className="p-0">
              <div className={`h-24 sm:h-32 bg-gradient-to-br ${goal.gradient} flex items-center justify-center text-white text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl mb-2">{goal.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold">{goal.name}</h3>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {goal.description}
                </p>
                
                {selectedGoal === goal.id && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Sélectionné
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Proceed Button */}
      {selectedGoal && (
        <div className="flex justify-center pt-4 sm:pt-6">
          <Button
            onClick={onProceed}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continuer
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoalSelection;
