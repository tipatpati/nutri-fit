import { Check, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <section className="py-24 lg:py-32 bg-[hsl(var(--md-sys-color-surface))]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--md-sys-color-surface-container-highest))] rounded-[var(--md-sys-shape-corner-full)] md-label-medium text-[hsl(var(--md-sys-color-on-surface))] border border-[hsl(var(--md-sys-color-outline-variant))] mb-4">
            <Package className="w-4 h-4 text-[hsl(var(--md-sys-color-secondary))]" />
            Nos formules
          </div>
          <h2 className="md-display-large text-[hsl(var(--md-sys-color-on-surface))] mb-6">
            Choisissez votre pack
          </h2>
          <p className="md-body-large text-neutral-500 max-w-3xl mx-auto leading-relaxed">
            Des formules flexibles adaptées à vos besoins et votre rythme de vie
          </p>
        </div>

        {/* Packs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, index) => {
            const features = Array.isArray(plan.features) ? plan.features : [];
            const colorClasses = [
              "from-emerald-500 to-green-500",
              "from-orange-500 to-red-500",
              "from-[hsl(var(--md-sys-color-secondary))] to-[hsl(var(--md-sys-color-tertiary))]",
              "from-purple-500 to-pink-500"
            ];
            const color = colorClasses[index % colorClasses.length];

            return (
              <Card 
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 hover:md-elevation-4 ${
                  plan.promoted ? 'border-2 border-[hsl(var(--md-sys-color-primary))] md-elevation-2' : 'border border-[hsl(var(--md-sys-color-outline-variant))]'
                }`}
              >
                {plan.promoted && (
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-tertiary))]" />
                )}
                
                <CardHeader className="space-y-4 pb-6">
                  {plan.promoted && (
                    <Badge className="w-fit bg-gradient-to-r from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-tertiary))] text-white border-0">
                      Plus populaire
                    </Badge>
                  )}
                  
                  <div>
                    <CardTitle className="md-headline-medium text-[hsl(var(--md-sys-color-on-surface))] mb-2">
                      {plan.name}
                    </CardTitle>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-[hsl(var(--md-sys-color-on-surface))]">
                        {plan.total_price.toFixed(2)}€
                      </span>
                    </div>
                    <p className="md-body-small text-neutral-500 mt-1">
                      {plan.price_per_meal.toFixed(2)}€ par repas
                    </p>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${color} rounded-[var(--md-sys-shape-corner-full)] text-white`}>
                    <Icon name="shaker-bottle" size={16} className="brightness-0 invert" />
                    <span className="md-label-medium">{plan.meals_quantity} repas</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {plan.description && (
                    <p className="md-body-small text-neutral-500 mb-4">
                      {plan.description}
                    </p>
                  )}
                  
                  <div className="space-y-3">
                    {features.map((feature: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          <Check className="w-5 h-5 text-[hsl(var(--md-sys-color-primary))]" />
                        </div>
                        <span className="md-body-small text-neutral-500">
                          {typeof feature === 'string' ? feature : feature.name || ''}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link to="/forfaits" className="block">
                    <Button 
                      className={`w-full ${
                        plan.promoted 
                          ? 'bg-gradient-to-r from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-tertiary))] hover:opacity-90 text-white' 
                          : ''
                      }`}
                      variant={plan.promoted ? "default" : "outlined"}
                    >
                      Choisir ce pack
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-[hsl(var(--md-sys-color-surface-container))] rounded-[var(--md-sys-shape-corner-large)]">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--md-sys-color-primary-container))] to-[hsl(var(--md-sys-color-secondary-container))] rounded-[var(--md-sys-shape-corner-large)] flex items-center justify-center">
              <Icon name="calendar" size={24} className="brightness-0 opacity-70" />
            </div>
            <h4 className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))] mb-2">
              Sans engagement
            </h4>
            <p className="md-body-small text-neutral-500">
              Pause ou annulation à tout moment
            </p>
          </div>

          <div className="text-center p-6 bg-[hsl(var(--md-sys-color-surface-container))] rounded-[var(--md-sys-shape-corner-large)]">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--md-sys-color-primary-container))] to-[hsl(var(--md-sys-color-secondary-container))] rounded-[var(--md-sys-shape-corner-large)] flex items-center justify-center">
              <Icon name="delivery-truck" size={24} className="brightness-0 opacity-70" />
            </div>
            <h4 className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))] mb-2">
              Livraison gratuite
            </h4>
            <p className="md-body-small text-neutral-500">
              Sur tous nos packs, directement chez vous
            </p>
          </div>

          <div className="text-center p-6 bg-[hsl(var(--md-sys-color-surface-container))] rounded-[var(--md-sys-shape-corner-large)]">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--md-sys-color-primary-container))] to-[hsl(var(--md-sys-color-secondary-container))] rounded-[var(--md-sys-shape-corner-large)] flex items-center justify-center">
              <Icon name="scale-balance" size={24} className="brightness-0 opacity-70" />
            </div>
            <h4 className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))] mb-2">
              Personnalisable
            </h4>
            <p className="md-body-small text-neutral-500">
              Adaptez votre menu selon vos préférences
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packs;
