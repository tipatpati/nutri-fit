import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Activity, Wheat, CheckCircle, Info } from "lucide-react";
import priseMasseIcon from "@/assets/icons/prise-masse-icon.png";
import equilibreIcon from "@/assets/icons/equilibre-icon.png";
import minceurIcon from "@/assets/icons/minceur-icon.png";

interface CategoryNutritionSelectorProps {
  selectedCategory: 'equilibre' | 'perte_poids' | 'prise_masse';
  onSelectCategory: (category: 'equilibre' | 'perte_poids' | 'prise_masse') => void;
}

const CATEGORY_INFO = {
  equilibre: {
    label: 'Équilibré',
    iconSrc: equilibreIcon,
    color: '#29B6F6',
    gradient: 'from-[#29B6F6] via-[#4FC3F7] to-[#81D4FA]',
    description: 'Alimentation équilibrée pour maintenir votre forme',
    calories: '~550 kcal',
    protein: '~45g',
    carbs: '~60g',
    benefits: ['Équilibre nutritionnel optimal', 'Maintien du poids', 'Énergie stable'],
  },
  perte_poids: {
    label: 'Minceur',
    iconSrc: minceurIcon,
    color: '#4CAF50',
    gradient: 'from-[#4CAF50] via-[#66BB6A] to-[#81C784]',
    description: 'Programme optimisé pour perdre du poids sainement',
    calories: '~400 kcal',
    protein: '~50g',
    carbs: '~40g',
    benefits: ['Déficit calorique contrôlé', 'Haute teneur en protéines', 'Satiété optimale'],
  },
  prise_masse: {
    label: 'Prise de masse',
    iconSrc: priseMasseIcon,
    color: '#DE6E27',
    gradient: 'from-[#DE6E27] via-[#FF8142] to-[#ff9057]',
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
          const isSelected = selectedCategory === category;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -12, scale: 1.02 }}
              onClick={() => onSelectCategory(category)}
              className={`group cursor-pointer glass-strong rounded-3xl overflow-hidden transition-all duration-500 shadow-xl border-2 ${
                isSelected 
                  ? 'scale-[1.03] shadow-2xl'
                  : 'hover:shadow-2xl'
              }`}
              style={{ 
                borderColor: isSelected ? info.color : 'transparent',
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-10"
              />
              
              {/* Header */}
              <div className={`p-6 bg-gradient-to-br ${info.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm"
                  >
                    <img src={info.iconSrc} alt={info.label} className="h-10 w-10 brightness-0 invert" />
                  </motion.div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Badge className="bg-white text-[#2B3210] font-bold shadow-xl px-4 py-1.5">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Sélectionné
                      </Badge>
                    </motion.div>
                  )}
                </div>
                <h3 className="font-['Space_Grotesk'] text-3xl font-bold text-white drop-shadow-lg">
                  {info.label}
                </h3>
                <p className="text-white/95 mt-2 leading-relaxed">
                  {info.description}
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Nutrition Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#505631]">
                      <Flame className="h-4 w-4" style={{ color: info.color }} />
                      <span className="text-sm font-medium">Calories</span>
                    </span>
                    <span className="font-bold text-[#2B3210]">{info.calories}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#505631]">
                      <Activity className="h-4 w-4" style={{ color: info.color }} />
                      <span className="text-sm font-medium">Protéines</span>
                    </span>
                    <span className="font-bold text-[#2B3210]">{info.protein}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#505631]">
                      <Wheat className="h-4 w-4" style={{ color: info.color }} />
                      <span className="text-sm font-medium">Glucides</span>
                    </span>
                    <span className="font-bold text-[#2B3210]">{info.carbs}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="pt-4 border-t border-[#E5E2D9]">
                  <p className="text-xs font-semibold text-[#2B3210] mb-2">Avantages clés:</p>
                  <ul className="space-y-1.5">
                    {info.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-[#505631] flex items-start gap-2">
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-strong rounded-2xl p-8 border-2 shadow-xl"
          style={{ borderColor: CATEGORY_INFO[selectedCategory].color }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${CATEGORY_INFO[selectedCategory].color}20` }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Info size={24} style={{ color: CATEGORY_INFO[selectedCategory].color }} />
              </motion.div>
            </div>
            <p className="text-[#2B3210] leading-relaxed text-lg">
              <span className="font-bold">Important:</span> Toutes les recettes sont automatiquement ajustées pour{' '}
              <span className="font-bold" style={{ color: CATEGORY_INFO[selectedCategory].color }}>
                {CATEGORY_INFO[selectedCategory].label}
              </span>.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CategoryNutritionSelector;
