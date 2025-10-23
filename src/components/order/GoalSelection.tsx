import { motion } from "framer-motion";
import { AnimatedGoalCard } from "@/components/ui/animated-goal-card";

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
      icon: 'muscle' as const,
      staticBg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
      animatedBg: 'https://media.giphy.com/media/5h47LsEYbofzcgOz19/giphy.gif'
    },
    {
      id: 'cutting',
      name: 'Minceur',
      description: 'Repas faibles en calories mais riches en nutriments essentiels pour votre bien-être',
      gradient: 'from-success to-success',
      icon: 'running' as const,
      staticBg: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=2070&auto=format&fit=crop',
      animatedBg: 'https://media.giphy.com/media/3o6Zt6fzS6qEbLhKWQ/giphy.gif'
    },
    {
      id: 'balanced',
      name: 'Équilibré',
      description: 'Repas parfaitement équilibrés pour maintenir votre forme optimale au quotidien',
      gradient: 'from-info to-info',
      icon: 'scale-balance' as const,
      staticBg: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop',
      animatedBg: 'https://media.giphy.com/media/l2QDSt60JFjOdgQjC/giphy.gif'
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
          <AnimatedGoalCard
            key={goal.id}
            id={goal.id}
            name={goal.name}
            description={goal.description}
            icon={goal.icon}
            staticBg={goal.staticBg}
            animatedBg={goal.animatedBg}
            gradient={goal.gradient}
            isSelected={selectedGoal === goal.id}
            onSelect={() => onGoalSelect(goal.id)}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default GoalSelection;
