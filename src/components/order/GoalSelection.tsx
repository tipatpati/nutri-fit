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
            whileHover={{ y: -12, scale: 1.03 }}
            onClick={() => onGoalSelect(goal.id)}
            className={`group cursor-pointer glass-strong rounded-3xl overflow-hidden transition-all duration-500 shadow-xl border-2 ${
              selectedGoal === goal.id 
                ? 'border-[#DE6E27] scale-[1.03] shadow-2xl shadow-[#DE6E27]/20' 
                : 'border-transparent hover:border-[#DE6E27]/30 hover:shadow-2xl'
            }`}
          >
            {/* Shimmer effect on hover */}
            <motion.div
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
            />
            
            {/* Icon Header */}
            <div className={`h-44 bg-gradient-to-br ${goal.gradient} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon name={goal.icon} size={72} className="brightness-0 invert drop-shadow-2xl" />
                </motion.div>
                <h3 className="font-['Space_Grotesk'] text-3xl font-bold text-white drop-shadow-lg mt-4">
                  {goal.name}
                </h3>
              </motion.div>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <p className="text-[#505631] leading-relaxed text-center text-lg">
                {goal.description}
              </p>
              
              {selectedGoal === goal.id && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mt-6 flex items-center justify-center"
                >
                  <div className="bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white px-6 py-3 rounded-full text-base font-bold flex items-center gap-2 shadow-xl">
                    <CheckCircle className="w-5 h-5" />
                    Objectif sélectionné
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
