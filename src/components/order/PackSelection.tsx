import { Check, Package, Star, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { useSubscriptionPlans, MealPack } from "@/hooks/useSubscriptionPlans";
import { motion } from "framer-motion";

interface PackSelectionProps {
  selectedPackage: MealPack | null;
  onPackageSelect: (pack: MealPack) => void;
}

const PackSelection = ({ selectedPackage, onPackageSelect }: PackSelectionProps) => {
  const { data: plans = [], isLoading } = useSubscriptionPlans();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="md-body-large text-md-on-surface-variant">Chargement des packs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-md-6 sm:space-y-md-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="md-headline-medium mb-md-3 text-md-on-surface">
          Choisissez votre pack
        </h2>
        <p className="md-body-large text-md-on-surface-variant">
          Des formules flexibles adaptées à vos besoins et votre rythme de vie
        </p>
      </div>

      {/* Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md-4 sm:gap-md-5 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const features = Array.isArray(plan.features) ? plan.features : [];
          const colorClasses = [
            "from-emerald-500 to-green-500",
            "from-orange-500 to-red-500",
            "from-blue-500 to-cyan-500",
            "from-purple-500 to-pink-500"
          ];
          const color = colorClasses[index % colorClasses.length];
          const isSelected = selectedPackage?.id === plan.id;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => onPackageSelect(plan)}
              className="cursor-pointer relative"
            >
              <Card className={`glass-strong overflow-hidden transition-all duration-500 shadow-xl border-2 h-full ${
                isSelected
                  ? 'border-[#DE6E27] scale-[1.02] shadow-2xl shadow-[#DE6E27]/20' 
                  : plan.promoted
                  ? 'border-[#DE6E27]/50 shadow-xl'
                  : 'border-transparent hover:border-[#DE6E27]/30'
              }`}>
                {/* Shimmer Effect */}
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-10"
                />
                
                {/* Popular Badge */}
                {plan.promoted && !isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-[#DE6E27] to-[#ff8040] shadow-2xl shadow-[#DE6E27]/50 z-20 border-2 border-white"
                  >
                    <span className="text-white font-bold text-sm flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      Le plus populaire
                    </span>
                  </motion.div>
                )}
                
                {/* Selected Badge */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-[#2B3210] to-[#505631] shadow-2xl z-20 border-2 border-white"
                  >
                    <span className="text-white font-bold text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Sélectionné
                    </span>
                  </motion.div>
                )}
                
                <CardHeader className="space-y-4 pb-6 pt-8">
                  <div>
                    <CardTitle className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210] mb-3">
                      {plan.name}
                    </CardTitle>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-baseline gap-2"
                    >
                      <span className="text-5xl font-bold bg-gradient-to-r from-[#2B3210] to-[#DE6E27] bg-clip-text text-transparent">
                        {plan.total_price.toFixed(0)}
                      </span>
                      <span className="text-xl text-[#505631]">.00 DA</span>
                    </motion.div>
                    <p className="text-sm text-[#505631] mt-2">
                      {plan.price_per_meal.toFixed(2)} DA par repas
                    </p>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${color} rounded-full text-white shadow-lg`}
                  >
                    <Icon name="shaker-bottle" size={18} className="brightness-0 invert" />
                    <span className="font-semibold">{plan.meals_quantity} repas</span>
                  </motion.div>
                </CardHeader>

                <CardContent className="space-y-4 pb-8">
                  {plan.description && (
                    <p className="text-[#505631] leading-relaxed">
                      {plan.description}
                    </p>
                  )}
                  
                  <div className="space-y-3">
                    {features.slice(0, 3).map((feature: any, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-[#DE6E27] mt-0.5 flex-shrink-0" />
                        <span className="text-[#505631] leading-relaxed">
                          {typeof feature === 'string' ? feature : feature.name || ''}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-8">
        {[
          { icon: 'calendar' as const, title: 'Sans engagement', desc: 'Pause ou annulation à tout moment' },
          { icon: 'delivery-truck' as const, title: 'Livraison gratuite', desc: 'Sur tous nos packs' },
          { icon: 'scale-balance' as const, title: 'Personnalisable', desc: 'Adaptez votre menu' }
        ].map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 glass-strong rounded-2xl border-2 border-transparent hover:border-[#DE6E27]/30 transition-all duration-300"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#DE6E27]/20 to-[#ff8040]/20 rounded-2xl flex items-center justify-center"
            >
              <Icon name={item.icon} size={28} className="text-[#DE6E27]" />
            </motion.div>
            <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#2B3210] mb-2">
              {item.title}
            </h4>
            <p className="text-[#505631]">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PackSelection;
