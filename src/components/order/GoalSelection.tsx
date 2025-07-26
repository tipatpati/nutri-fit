
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
    <div className="space-y-md-6 sm:space-y-md-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="md-headline-medium mb-md-2 sm:mb-md-4 text-md-surface-on-surface">
          Quel est votre objectif ?
        </h2>
        <p className="md-body-large text-emerald-800">
          Choisissez votre programme nutritionnel adapté à vos besoins
        </p>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md-2 sm:gap-md-3 max-w-5xl mx-auto">
        {goals.map((goal) => (
          <Card 
            key={goal.id} 
            className={`cursor-pointer transition-all duration-300 hover:md-elevation-3 hover:scale-[1.02] rounded-lg ${
              selectedGoal === goal.id 
                ? `md-elevation-2 scale-[1.02] bg-md-primary-container border-md-primary` 
                : 'md-elevation-1 bg-md-surface-container-low hover:bg-md-surface-container border-md-outline-variant'
            } border`}
            onClick={() => onGoalSelect(goal.id)}
          >
            <CardContent className="p-0">
              <div className={`h-24 sm:h-32 bg-gradient-to-br ${goal.gradient} flex items-center justify-center text-white text-center relative overflow-hidden rounded-t-lg`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl mb-md-1">{goal.icon}</div>
                  <h3 className="md-title-medium font-bold">{goal.name}</h3>
                </div>
              </div>
              
              <div className="p-md-2 sm:p-md-3">
                <p className="md-body-medium text-emerald-800 leading-relaxed">
                  {goal.description}
                </p>
                
                {selectedGoal === goal.id && (
                  <div className="mt-md-2 flex items-center justify-center">
                    <div className="bg-md-primary-container text-md-primary-on-container px-md-2 py-md-1 rounded-full md-label-medium">
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
        <div className="flex justify-center pt-md-2 sm:pt-md-3">
          <Button
            variant="filled"
            size="lg"
            onClick={onProceed}
            className="px-md-4 py-md-2"
          >
            Continuer
            <ArrowRight className="w-4 h-4 ml-md-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoalSelection;
