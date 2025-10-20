import { Check, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useSubscriptionPlans } from "@/hooks/useSubscriptionPlans";
import { motion } from "framer-motion";

const Packs = () => {
  const { data: plans = [], isLoading } = useSubscriptionPlans();

  if (isLoading) {
    return (
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">Chargement des packs...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-primary/10 rounded-full text-sm font-semibold text-orange-primary border border-orange-primary/20 mb-6">
            <Package className="w-5 h-5" />
            Nos formules
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-olive-dark mb-6 leading-tight tracking-tight font-heading">
            Choisissez votre pack
          </h2>
          <p className="text-lg md:text-xl text-olive-muted max-w-3xl mx-auto leading-relaxed">
            Des formules flexibles adaptées à vos besoins et votre rythme de vie
          </p>
        </motion.div>

        {/* Packs Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mb-12">
          {plans.map((plan, index) => {
            const features = Array.isArray(plan.features) ? plan.features : [];
            const colorClasses = [
              "from-emerald-500 to-green-600",
              "from-orange-500 to-red-600",
              "from-orange-primary to-olive-muted",
              "from-purple-500 to-pink-600"
            ];
            const color = colorClasses[index % colorClasses.length];

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative overflow-hidden glass rounded-2xl shadow-lg ${
                  plan.promoted ? 'scale-105' : ''
                }`}
              >
                {/* Floating Popular Badge */}
                {plan.promoted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.15 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-orange-primary to-orange-light shadow-lg shadow-orange-primary/50 z-10"
                  >
                    <span className="text-white font-semibold text-sm">Plus Populaire</span>
                  </motion.div>
                )}
                
                <div className="space-y-6 p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-olive-dark mb-2 font-heading">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-bold text-olive-dark">
                        {plan.total_price.toFixed(0)}
                      </span>
                      <span className="text-2xl text-olive-muted">.00 DA</span>
                    </div>
                    <p className="text-sm text-olive-muted mt-1">
                      {plan.price_per_meal.toFixed(2)} DA par repas
                    </p>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${color} rounded-full text-white`}>
                    <Icon name="shaker-bottle" size={16} className="text-white" />
                    <span className="text-sm font-semibold">{plan.meals_quantity} repas</span>
                  </div>
                </div>

                <div className="space-y-6 p-8 pt-0">
                  {plan.description && (
                    <p className="text-sm text-olive-muted mb-4">
                      {plan.description}
                    </p>
                  )}
                  
                  <div className="space-y-3">
                    {features.map((feature: any, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.15 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-orange-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-olive-muted leading-relaxed">
                          {typeof feature === 'string' ? feature : feature.name || ''}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <Link to="/forfaits" className="block">
                    <Button 
                      className={`w-full font-bold py-4 rounded-xl transition-all duration-300 ${
                        plan.promoted 
                          ? 'bg-gradient-to-br from-orange-primary to-orange-light text-white shadow-lg shadow-orange-primary/30' 
                          : 'glass border-2 border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white'
                      }`}
                    >
                      Choisir ce pack
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
        {[
            { icon: "calendar" as const, title: "Sans engagement", description: "Pause ou annulation à tout moment" },
            { icon: "delivery-truck" as const, title: "Livraison gratuite", description: "Sur tous nos packs, directement chez vous" },
            { icon: "scale-balance" as const, title: "Personnalisable", description: "Adaptez votre menu selon vos préférences" }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="text-center p-8 glass rounded-2xl hover:shadow-lg transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 12 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-primary/10 flex items-center justify-center"
              >
                <Icon name={item.icon} size={32} className="text-orange-primary" />
              </motion.div>
              <h4 className="text-xl font-bold text-olive-dark mb-3 group-hover:text-orange-primary transition-colors font-heading">
                {item.title}
              </h4>
              <p className="text-base text-olive-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Packs;
