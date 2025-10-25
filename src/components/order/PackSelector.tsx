import { Check, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useSubscriptionPlans } from "@/hooks/useSubscriptionPlans";

interface PackSelectorProps {
  selectedPackId: string | null;
  onPackSelect: (packId: string) => void;
}

const PackSelector = ({ selectedPackId, onPackSelect }: PackSelectorProps) => {
  const { data: plans = [], isLoading } = useSubscriptionPlans();

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#DE6E27]" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#2B3210]"
      >
        2. Sélectionnez votre pack
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {plans.map((plan, index) => {
          const isSelected = selectedPackId === plan.id;
          const features = Array.isArray(plan.features) ? plan.features : [];

          return (
            <motion.button
              key={plan.id}
              onClick={() => onPackSelect(plan.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative overflow-hidden glass-strong rounded-2xl p-6 text-left transition-all duration-300 ${
                isSelected
                  ? 'border-4 border-[#DE6E27] shadow-2xl shadow-[#DE6E27]/30'
                  : 'border-2 border-transparent hover:border-[#DE6E27]/30'
              } ${plan.promoted ? 'md:scale-105' : ''}`}
            >
              {/* Selected Checkmark */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#DE6E27] flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
              )}

              {/* Popular Badge */}
              {plan.promoted && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white text-xs font-bold">
                  Plus Populaire
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210]">
                  {plan.name}
                </h3>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-[#2B3210] to-[#DE6E27] bg-clip-text text-transparent">
                    {plan.total_price.toFixed(0)}
                  </span>
                  <span className="text-lg text-[#505631]">.00 DA</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#DE6E27]/10 rounded-full">
                  <Package className="w-4 h-4 text-[#DE6E27]" />
                  <span className="text-sm font-semibold text-[#DE6E27]">
                    {plan.meals_quantity} repas
                  </span>
                </div>

                {features.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {features.slice(0, 3).map((feature: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#DE6E27] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-[#505631] leading-relaxed">
                          {typeof feature === 'string' ? feature : feature.name || ''}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PackSelector;
