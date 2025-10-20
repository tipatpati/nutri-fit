import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Activity, Wheat, Target, TrendingDown, TrendingUp, CheckCircle } from "lucide-react";

interface CategoryNutritionSelectorProps {
  selectedCategory: 'equilibre' | 'perte_poids' | 'prise_masse';
  onSelectCategory: (category: 'equilibre' | 'perte_poids' | 'prise_masse') => void;
}

const CATEGORY_INFO = {
  equilibre: {
    label: 'Équilibré',
    icon: Target,
    color: '#29B6F6',
    gradient: 'from-info to-info',
    description: 'Alimentation équilibrée pour maintenir votre forme',
    calories: '~550 kcal',
    protein: '~45g',
    carbs: '~60g',
    benefits: ['Équilibre nutritionnel optimal', 'Maintien du poids', 'Énergie stable'],
  },
  perte_poids: {
    label: 'Perte de poids',
    icon: TrendingDown,
    color: '#4CAF50',
    gradient: 'from-success to-success',
    description: 'Programme optimisé pour perdre du poids sainement',
    calories: '~400 kcal',
    protein: '~50g',
    carbs: '~40g',
    benefits: ['Déficit calorique contrôlé', 'Haute teneur en protéines', 'Satiété optimale'],
  },
  prise_masse: {
    label: 'Prise de masse',
    icon: TrendingUp,
    color: '#DE6E27',
    gradient: 'from-orange-primary to-orange-light',
    description: 'Programme riche pour développer votre masse musculaire',
    calories: '~700 kcal',
    protein: '~55g',
    carbs: '~70g',
    benefits: ['Surplus calorique', 'Protéines élevées', 'Énergie maximale'],
  },
};

const CategoryNutritionSelector = ({ selectedCategory, onSelectCategory }: CategoryNutritionSelectorProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-olive-dark text-center font-['Space_Grotesk']">
          Choisissez votre objectif nutritionnel
        </h2>
        <p className="text-lg text-olive-muted text-center">
          Chaque recette sera automatiquement ajustée en fonction de votre objectif
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.keys(CATEGORY_INFO) as Array<keyof typeof CATEGORY_INFO>).map((category, index) => {
          const info = CATEGORY_INFO[category];
          const Icon = info.icon;
          const isSelected = selectedCategory === category;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              onClick={() => onSelectCategory(category)}
              className={`group cursor-pointer glass rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                isSelected ? 'ring-2 scale-[1.02] shadow-xl' : 'hover:scale-[1.02]'
              }`}
              style={{ 
                borderColor: isSelected ? info.color : 'transparent',
                borderWidth: isSelected ? '2px' : '0'
              }}
            >
              {/* Header with Icon */}
              <div className={`p-6 bg-gradient-to-br ${info.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-3 rounded-xl glass-strong"
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Badge className="bg-white text-olive-dark font-semibold shadow-lg">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Sélectionné
                      </Badge>
                    </motion.div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white drop-shadow-md font-['Space_Grotesk']">
                  {info.label}
                </h3>
                <p className="text-white/90 text-sm mt-2">
                  {info.description}
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Nutrition Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-olive-muted">
                      <Flame className="h-4 w-4" style={{ color: info.color }} />
                      <span className="text-sm font-medium">Calories</span>
                    </span>
                    <span className="font-bold text-olive-dark">{info.calories}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-olive-muted">
                      <Activity className="h-4 w-4" style={{ color: info.color }} />
                      <span className="text-sm font-medium">Protéines</span>
                    </span>
                    <span className="font-bold text-olive-dark">{info.protein}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-olive-muted">
                      <Wheat className="h-4 w-4" style={{ color: info.color }} />
                      <span className="text-sm font-medium">Glucides</span>
                    </span>
                    <span className="font-bold text-olive-dark">{info.carbs}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="pt-4 border-t border-beige">
                  <p className="text-xs font-semibold text-olive-dark mb-2">Avantages clés:</p>
                  <ul className="space-y-1.5">
                    {info.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-olive-muted flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: info.color }} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 border-2"
          style={{ borderColor: CATEGORY_INFO[selectedCategory].color }}
        >
          <p className="text-center text-olive-dark leading-relaxed">
            <span className="font-bold">Important:</span> Toutes les recettes affichées ci-dessous sont 
            automatiquement ajustées pour votre objectif{' '}
            <span className="font-bold" style={{ color: CATEGORY_INFO[selectedCategory].color }}>
              {CATEGORY_INFO[selectedCategory].label}
            </span>.
            Les quantités et valeurs nutritionnelles correspondent à cet objectif.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CategoryNutritionSelector;
