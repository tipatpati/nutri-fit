
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

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
      icon: 'muscle' as const
    },
    {
      id: 'cutting',
      name: 'Perte de poids',
      description: 'Repas faibles en calories mais riches en nutriments essentiels pour votre bien-être',
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200',
      icon: 'running' as const
    },
    {
      id: 'balanced',
      name: 'Équilibré',
      description: 'Repas parfaitement équilibrés pour maintenir votre forme optimale au quotidien',
      gradient: 'from-yellow-500 to-amber-500',
      bgGradient: 'from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-200',
      icon: 'scale-balance' as const
    }
  ];

  return (
    <div className="space-y-md-6 sm:space-y-md-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="md-headline-medium mb-md-3 text-md-on-surface">
          Quel est votre objectif ?
        </h2>
        <p className="md-body-large text-md-on-surface-variant">
          Choisissez votre programme nutritionnel adapté à vos besoins
        </p>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md-4 sm:gap-md-5 max-w-5xl mx-auto">
        {goals.map((goal, index) => (
          <Card 
            key={goal.id} 
            className={`cursor-pointer transition-standard hover:md-elevation-3 hover:scale-[1.05] border-2 animate-scale-in ${
              selectedGoal === goal.id 
                ? `md-elevation-2 scale-[1.02] bg-md-primary-container border-md-primary animate-pulse-glow` 
                : 'md-elevation-1 bg-md-surface-container border-md-outline-variant hover:bg-md-surface-container-high'
            }`}
            onClick={() => onGoalSelect(goal.id)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-0">
              <div className={`h-28 sm:h-36 bg-gradient-to-br ${goal.gradient} flex items-center justify-center text-white text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                  <div className="mb-md-2 flex items-center justify-center">
                    <Icon name={goal.icon} size={56} className="brightness-0 invert drop-shadow-md" />
                  </div>
                  <h3 className="md-title-large font-bold text-white drop-shadow-md">{goal.name}</h3>
                </div>
              </div>
              
              <div className="p-md-4 sm:p-md-5">
                <p className="md-body-medium text-md-on-surface-variant leading-relaxed">
                  {goal.description}
                </p>
                
                {selectedGoal === goal.id && (
                  <div className="mt-md-3 flex items-center justify-center">
                    <div className="bg-md-primary text-md-on-primary px-md-3 py-md-2 rounded-full md-label-large font-semibold">
                      ✓ Sélectionné
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default GoalSelection;
