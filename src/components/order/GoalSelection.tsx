import { motion } from "framer-motion";
import { GlareCard } from "@/components/ui/glare-card";
import { CheckCircle } from "lucide-react";
import minceurGoalImage from "@/assets/minceur-goal.jpg";
import equilibreGoalImage from "@/assets/equilibre-goal.jpg";
import priseMasseIcon from "@/assets/icons/prise-masse-icon.png";
import equilibreIcon from "@/assets/icons/equilibre-icon.png";
import minceurIcon from "@/assets/icons/minceur-icon.png";

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
      gradient: 'from-orange-primary via-orange-light to-[#ff9057]',
      iconSrc: priseMasseIcon,
      staticBg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
      animatedBg: 'https://media.giphy.com/media/5h47LsEYbofzcgOz19/giphy.gif'
    },
    {
      id: 'cutting',
      name: 'Minceur',
      description: 'Repas faibles en calories mais riches en nutriments essentiels pour votre bien-être',
      gradient: 'from-[#4CAF50] via-[#66BB6A] to-[#81C784]',
      iconSrc: minceurIcon,
      staticBg: minceurGoalImage,
      animatedBg: 'https://media.giphy.com/media/3o6Zt6fzS6qEbLhKWQ/giphy.gif'
    },
    {
      id: 'balanced',
      name: 'Équilibré',
      description: 'Repas parfaitement équilibrés pour maintenir votre forme optimale au quotidien',
      gradient: 'from-[#29B6F6] via-[#4FC3F7] to-[#81D4FA]',
      iconSrc: equilibreIcon,
      staticBg: equilibreGoalImage,
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
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            onClick={() => onGoalSelect(goal.id)}
            className="cursor-pointer"
          >
            <GlareCard
              backgroundImage={goal.staticBg}
              backgroundClassName="bg-gradient-to-t from-olive-dark/90 via-olive-dark/40 to-transparent"
              className={
                selectedGoal === goal.id ? 'ring-4 ring-orange-primary ring-offset-4 ring-offset-cream' : ''
              }
            >
              {/* Icon Header */}
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${goal.gradient} opacity-40 flex items-center justify-center`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/40 via-white/20 to-transparent backdrop-blur-lg flex items-center justify-center shadow-2xl border border-white/30">
                    <img src={goal.iconSrc} alt={goal.name} className="w-10 h-10 brightness-0 invert drop-shadow-2xl" />
                  </div>
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white drop-shadow-lg text-center mb-3">
                  {goal.name}
                </h3>
                <p className="text-white/90 leading-relaxed text-center text-sm mb-4 drop-shadow-lg">
                  {goal.description}
                </p>
                
                {selectedGoal === goal.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex items-center justify-center"
                  >
                    <div className="bg-gradient-to-r from-orange-primary to-orange-light text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl">
                      <CheckCircle className="w-4 h-4" />
                      Sélectionné
                    </div>
                  </motion.div>
                )}
              </div>
            </GlareCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GoalSelection;
