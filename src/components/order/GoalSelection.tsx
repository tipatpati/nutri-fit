import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { CheckCircle } from "lucide-react";

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
      gradient: 'from-orange-primary to-orange-light',
      iconColor: '#DE6E27',
      icon: 'muscle' as const
    },
    {
      id: 'cutting',
      name: 'Perte de poids',
      description: 'Repas faibles en calories mais riches en nutriments essentiels pour votre bien-être',
      gradient: 'from-success to-success',
      iconColor: '#4CAF50',
      icon: 'running' as const
    },
    {
      id: 'balanced',
      name: 'Équilibré',
      description: 'Repas parfaitement équilibrés pour maintenir votre forme optimale au quotidien',
      gradient: 'from-info to-info',
      iconColor: '#29B6F6',
      icon: 'scale-balance' as const
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 sm:space-y-10"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-olive-dark mb-3 font-['Space_Grotesk']">
          Quel est votre objectif ?
        </h2>
        <p className="text-lg md:text-xl text-olive-muted">
          Choisissez votre programme nutritionnel adapté à vos besoins
        </p>
      </motion.div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            onClick={() => onGoalSelect(goal.id)}
            className={`group cursor-pointer glass rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
              selectedGoal === goal.id 
                ? 'ring-2 ring-orange-primary scale-[1.02] shadow-xl' 
                : 'hover:scale-[1.02]'
            }`}
          >
            {/* Icon Header */}
            <div className={`h-32 sm:h-40 bg-gradient-to-br ${goal.gradient} flex items-center justify-center text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon name={goal.icon} size={64} className="brightness-0 invert drop-shadow-lg" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white drop-shadow-md mt-3 font-['Space_Grotesk']">
                  {goal.name}
                </h3>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <p className="text-olive-muted leading-relaxed text-center">
                {goal.description}
              </p>
              
              {selectedGoal === goal.id && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mt-4 flex items-center justify-center"
                >
                  <div className="bg-gradient-to-r from-orange-primary to-orange-light text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <CheckCircle className="w-4 h-4" />
                    Sélectionné
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GoalSelection;
