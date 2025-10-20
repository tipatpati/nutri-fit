import { Check, Package } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useSubscriptionPlans } from "@/hooks/useSubscriptionPlans";

const Packs = () => {
  const { data: plans = [], isLoading } = useSubscriptionPlans();

  if (isLoading) {
    return (
      <section className="py-24 lg:py-32 bg-[hsl(var(--md-sys-color-surface))]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">Chargement des packs...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 lg:py-36 bg-[#FBF8EF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DE6E27]/10 rounded-full text-sm font-semibold text-[#DE6E27] border border-[#DE6E27]/20 mb-6">
            <Package className="w-5 h-5" />
            Nos formules
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#2B3210] mb-6 leading-tight font-heading">
            Choisissez votre pack
          </h2>
          <p className="text-lg md:text-xl text-[#505631] max-w-3xl mx-auto leading-relaxed">
            Des formules flexibles adaptées à vos besoins et votre rythme de vie
          </p>
        </div>

        {/* Packs Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, index) => {
            const features = Array.isArray(plan.features) ? plan.features : [];
            const colorClasses = [
              "from-emerald-500 to-green-600",
              "from-orange-500 to-red-600",
              "from-[#DE6E27] to-[#505631]",
              "from-purple-500 to-pink-600"
            ];
            const color = colorClasses[index % colorClasses.length];

            return (
              <div 
                key={plan.id}
                className={`relative overflow-hidden bg-white/70 backdrop-blur-xl border rounded-xl transition-all duration-300 hover:shadow-2xl ${
                  plan.promoted ? 'border-[#DE6E27] scale-105 shadow-xl' : 'border-[#E5E2D9] hover:border-[#DE6E27]'
                }`}
              >
                {plan.promoted && (
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#DE6E27] via-[#2B3210] to-[#DE6E27] animate-shimmer" 
                    style={{ backgroundSize: '200% 100%' }}
                  />
                )}
                
                <div className="space-y-6 p-6">
                  {plan.promoted && (
                    <div className="bg-[#DE6E27] px-4 py-2 w-fit rounded-full">
                      <span className="text-xs text-white font-bold">Plus populaire</span>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-2xl font-bold text-[#2B3210] mb-2 font-heading">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-[#2B3210]">
                        {plan.total_price.toFixed(2)} DA
                      </span>
                    </div>
                    <p className="text-sm text-[#505631] mt-1">
                      {plan.price_per_meal.toFixed(2)} DA par repas
                    </p>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${color} rounded-full text-white`}>
                    <Icon name="shaker-bottle" size={16} className="text-white" />
                    <span className="text-sm font-semibold">{plan.meals_quantity} repas</span>
                  </div>
                </div>

                <div className="space-y-6 p-6 pt-0">
                  {plan.description && (
                    <p className="text-sm text-[#505631] mb-4">
                      {plan.description}
                    </p>
                  )}
                  
                  <div className="space-y-3">
                    {features.map((feature: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#2B3210] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#505631]">
                          {typeof feature === 'string' ? feature : feature.name || ''}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link to="/forfaits" className="block">
                    <Button 
                      variant={plan.promoted ? "filled" : "outlined"}
                      className={`w-full ${plan.promoted ? 'bg-[#DE6E27] hover:bg-[#DE6E27]/90 text-white' : 'border-[#DE6E27] text-[#DE6E27] hover:bg-[#DE6E27] hover:text-white'} font-bold py-3 rounded-xl transition-all duration-300 hover:-translate-y-1`}
                    >
                      Choisir ce pack
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="text-center p-8 bg-white/70 backdrop-blur-xl border border-[#E5E2D9] rounded-xl hover:border-[#DE6E27] hover:shadow-lg transition-all duration-300 group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#DE6E27]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name="calendar" size={28} className="text-[#DE6E27]" />
            </div>
            <h4 className="text-lg font-bold text-[#2B3210] mb-2 group-hover:text-[#DE6E27] transition-colors font-heading">
              Sans engagement
            </h4>
            <p className="text-sm text-[#505631]">
              Pause ou annulation à tout moment
            </p>
          </div>

          <div className="text-center p-8 bg-white/70 backdrop-blur-xl border border-[#E5E2D9] rounded-xl hover:border-[#DE6E27] hover:shadow-lg transition-all duration-300 group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#DE6E27]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name="delivery-truck" size={28} className="text-[#DE6E27]" />
            </div>
            <h4 className="text-lg font-bold text-[#2B3210] mb-2 group-hover:text-[#DE6E27] transition-colors font-heading">
              Livraison gratuite
            </h4>
            <p className="text-sm text-[#505631]">
              Sur tous nos packs, directement chez vous
            </p>
          </div>

          <div className="text-center p-8 bg-white/70 backdrop-blur-xl border border-[#E5E2D9] rounded-xl hover:border-[#DE6E27] hover:shadow-lg transition-all duration-300 group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#DE6E27]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name="scale-balance" size={28} className="text-[#DE6E27]" />
            </div>
            <h4 className="text-lg font-bold text-[#2B3210] mb-2 group-hover:text-[#DE6E27] transition-colors font-heading">
              Personnalisable
            </h4>
            <p className="text-sm text-[#505631]">
              Adaptez votre menu selon vos préférences
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packs;
