import { AnimatedGoalCard } from "@/components/ui/animated-goal-card";
import { NUTRITIONAL_GOALS } from "@/constants/nutritionalGoals";
import { motion } from "framer-motion";

interface CompactGoalSelectorProps {
  selectedGoal: string;
  onGoalChange: (goalId: string) => void;
}

const CompactGoalSelector = ({ selectedGoal, onGoalChange }: CompactGoalSelectorProps) => {
  return (
    <div className="space-y-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#2B3210]"
      >
        1. Choisissez votre objectif nutritionnel
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {NUTRITIONAL_GOALS.map((goal, index) => (
          <AnimatedGoalCard
            key={goal.id}
            id={goal.id}
            name={goal.name}
            description={goal.description}
            iconSrc={goal.iconSrc}
            staticBg={goal.staticBg}
            animatedBg={goal.animatedBg}
            gradient={goal.gradient}
            isSelected={selectedGoal === goal.id}
            onSelect={() => onGoalChange(goal.id)}
            index={index}
            compact={true}
          />
        ))}
      </div>
    </div>
  );
};

export default CompactGoalSelector;
