import { motion } from "framer-motion";
import { NutritionGoalCard } from "@/components/ui/nutrition-goal-card";
import minceurBackground from "@/assets/minceur-background.jpg";
import slimBodyIcon from "@/assets/icons/slim-body.png";
import yogaIcon from "@/assets/icons/yoga.png";
import armMuscleIcon from "@/assets/icons/arm-muscle.png";

interface GoalSelectionProps {
  selectedGoal: string | null;
  onGoalSelect: (goal: string) => void;
  onProceed: () => void;
}

const GoalSelection = ({ selectedGoal, onGoalSelect, onProceed }: GoalSelectionProps) => {
  const goals = [
    {
      id: "weight_loss",
      title: "Minceur",
      description: "Perdez du poids sainement avec nos repas équilibrés et contrôlés en calories",
      calorieRange: "1200-1500 kcal/jour",
      goalType: "weight_loss" as const,
      staticBg: minceurBackground,
      animatedBg: minceurBackground,
      icon: slimBodyIcon,
      isPopular: true,
    },
    {
      id: "balanced",
      title: "Équilibre Nutritionnel",
      description: "Maintenez un équilibre parfait entre protéines, glucides et lipides pour votre bien-être",
      calorieRange: "1600-2000 kcal/jour",
      goalType: "balanced" as const,
      staticBg: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
      animatedBg: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=800&auto=format&fit=crop",
      icon: yogaIcon,
    },
    {
      id: "muscle_gain",
      title: "Prise de Masse",
      description: "Développez votre masse musculaire avec des repas riches en protéines et nutriments essentiels",
      calorieRange: "2200-2800 kcal/jour",
      goalType: "muscle_gain" as const,
      staticBg: "https://images.unsplash.com/photo-1532384816664-01b8b7238c8d?w=800&auto=format&fit=crop",
      animatedBg: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&auto=format&fit=crop",
      icon: armMuscleIcon,
    },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {goals.map((goal, index) => (
          <NutritionGoalCard
            key={goal.id}
            id={goal.id}
            title={goal.title}
            description={goal.description}
            calorieRange={goal.calorieRange}
            staticBg={goal.staticBg}
            animatedBg={goal.animatedBg}
            goalType={goal.goalType}
            isSelected={selectedGoal === goal.id}
            onSelect={() => onGoalSelect(goal.id)}
            index={index}
            isPopular={goal.isPopular}
            icon={goal.icon}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default GoalSelection;
