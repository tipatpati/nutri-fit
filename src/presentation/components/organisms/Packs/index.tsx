import { Check, Package, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useSubscriptionPlans } from "@/hooks/useSubscriptionPlans";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import packsBackground from "@/assets/packs-background.jpg";

const Packs = () => {
  const { data: plans = [], isLoading } = useSubscriptionPlans();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

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
    <section ref={containerRef} className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-full"
      >
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${packsBackground})`,
            backgroundAttachment: 'fixed'
          }}
        />
        {/* Cream overlay for readability */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-br from-[#FBF8EF]/95 via-[#E5E2D9]/90 to-[#FBF8EF]/95"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass-strong rounded-full border-2 border-[#DE6E27]/20 mb-6"
          >
            <Package className="w-5 h-5 text-[#DE6E27]" />
            <span className="font-semibold text-[#2B3210]">Nos formules</span>
          </motion.div>
          <h2 className="font-['Space_Grotesk'] text-5xl md:text-6xl lg:text-7xl font-bold text-[#2B3210] mb-6">
            Choisissez votre pack
          </h2>
          <p className="text-xl text-[#505631] max-w-3xl mx-auto">
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
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className={`relative overflow-hidden glass-strong rounded-3xl shadow-xl border-2 ${
                  plan.promoted 
                    ? 'border-[#DE6E27] scale-105 shadow-2xl shadow-[#DE6E27]/20' 
                    : 'border-transparent hover:border-[#DE6E27]/30'
                } transition-all duration-300`}
              >
                {/* Shimmer effect on hover */}
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                />
                
                {/* Popular Badge */}
                {plan.promoted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-[#DE6E27] to-[#ff8040] shadow-2xl shadow-[#DE6E27]/50 z-10 border-2 border-white"
                  >
                    <span className="text-white font-bold text-sm">Plus Populaire</span>
                  </motion.div>
                )}
                
                <div className="space-y-6 p-8">
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210] mb-2">
                      {plan.name}
                    </h3>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-baseline gap-2"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-7xl font-bold bg-gradient-to-r from-[#2B3210] to-[#DE6E27] bg-clip-text text-transparent"
                      >
                        {plan.total_price.toFixed(0)}
                      </motion.span>
                      <span className="text-2xl text-[#505631]">.00 DA</span>
                    </motion.div>
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
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
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
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-8 glass-strong rounded-3xl hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-[#DE6E27]/30"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#DE6E27]/20 to-[#ff8040]/20 flex items-center justify-center"
              >
                <Icon name={item.icon} size={32} className="text-[#DE6E27]" />
              </motion.div>
              <h4 className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210] mb-3 group-hover:text-[#DE6E27] transition-colors">
                {item.title}
              </h4>
              <p className="text-[#505631] leading-relaxed">
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
