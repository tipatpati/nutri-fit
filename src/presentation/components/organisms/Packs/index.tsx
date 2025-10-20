import { Check, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useSubscriptionPlans } from "@/hooks/useSubscriptionPlans";

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
        <div className="text-center mb-16 md:mb-20 animate-fade-in">
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
        </div>

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
              <div
                key={plan.id}
                className={`relative overflow-hidden glass rounded-2xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ${
                  plan.promoted ? 'scale-105' : ''
                }`}
              >
                {/* Floating Popular Badge */}
                {plan.promoted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-orange-primary to-orange-light shadow-lg shadow-orange-primary/50 z-10">
                    <span className="text-white font-semibold text-sm">Plus Populaire</span>
                  </div>
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
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-orange-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-olive-muted leading-relaxed">
                          {typeof feature === 'string' ? feature : feature.name || ''}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link to="/forfaits" className="block">
                    <Button 
                      className={`w-full font-bold py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                        plan.promoted 
                          ? 'bg-gradient-to-br from-orange-primary to-orange-light text-white shadow-lg shadow-orange-primary/30' 
                          : 'glass border-2 border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white'
                      }`}
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
          <div className="text-center p-8 glass rounded-2xl hover:shadow-lg transition-all duration-300 group">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Icon name="calendar" size={32} className="text-orange-primary" />
            </div>
            <h4 className="text-xl font-bold text-olive-dark mb-3 group-hover:text-orange-primary transition-colors font-heading">
              Sans engagement
            </h4>
            <p className="text-base text-olive-muted leading-relaxed">
              Pause ou annulation à tout moment
            </p>
          </div>

          <div className="text-center p-8 glass rounded-2xl hover:shadow-lg transition-all duration-300 group">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Icon name="delivery-truck" size={32} className="text-orange-primary" />
            </div>
            <h4 className="text-xl font-bold text-olive-dark mb-3 group-hover:text-orange-primary transition-colors font-heading">
              Livraison gratuite
            </h4>
            <p className="text-base text-olive-muted leading-relaxed">
              Sur tous nos packs, directement chez vous
            </p>
          </div>

          <div className="text-center p-8 glass rounded-2xl hover:shadow-lg transition-all duration-300 group">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Icon name="scale-balance" size={32} className="text-orange-primary" />
            </div>
            <h4 className="text-xl font-bold text-olive-dark mb-3 group-hover:text-orange-primary transition-colors font-heading">
              Personnalisable
            </h4>
            <p className="text-base text-olive-muted leading-relaxed">
              Adaptez votre menu selon vos préférences
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packs;
