import { Check, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { useSubscriptionPlans, MealPack } from "@/hooks/useSubscriptionPlans";

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
            <Card 
              key={plan.id}
              className={`cursor-pointer relative overflow-hidden transition-all duration-md-medium2 hover:md-elevation-3 hover:scale-[1.02] border-2 ${
                isSelected
                  ? 'md-elevation-2 scale-[1.02] bg-md-primary-container border-md-primary' 
                  : plan.promoted
                  ? 'border-md-outline md-elevation-1 bg-md-surface-container border-md-primary/30'
                  : 'md-elevation-1 bg-md-surface-container border-md-outline-variant hover:bg-md-surface-container-high'
              }`}
              onClick={() => onPackageSelect(plan)}
            >
              {plan.promoted && !isSelected && (
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-md-primary to-md-tertiary" />
              )}
              
              <CardHeader className="space-y-4 pb-6">
                {plan.promoted && !isSelected && (
                  <Badge className="w-fit bg-gradient-to-r from-md-primary to-md-tertiary text-md-on-primary border-0">
                    Plus populaire
                  </Badge>
                )}
                
                {isSelected && (
                  <div className="flex items-center justify-center">
                    <div className="bg-md-primary text-md-on-primary px-md-3 py-md-2 rounded-full md-label-large font-semibold">
                      ✓ Sélectionné
                    </div>
                  </div>
                )}
                
                <div>
                  <CardTitle className="md-title-large text-md-on-surface mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-md-on-surface">
                      {plan.total_price.toFixed(2)} DA
                    </span>
                  </div>
                  <p className="md-body-small text-md-on-surface-variant mt-1">
                    {plan.price_per_meal.toFixed(2)} DA par repas
                  </p>
                </div>

                <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${color} rounded-full text-white`}>
                  <Icon name="shaker-bottle" size={16} className="brightness-0 invert" />
                  <span className="md-label-medium">{plan.meals_quantity} repas</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {plan.description && (
                  <p className="md-body-small text-md-on-surface-variant">
                    {plan.description}
                  </p>
                )}
                
                <div className="space-y-2">
                  {features.slice(0, 3).map((feature: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        <Check className="w-4 h-4 text-md-primary" />
                      </div>
                      <span className="md-body-small text-md-on-surface-variant">
                        {typeof feature === 'string' ? feature : feature.name || ''}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-8">
        <div className="text-center p-4 bg-md-surface-container rounded-xl border border-md-outline-variant">
          <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-br from-md-primary-container to-md-secondary-container rounded-lg flex items-center justify-center">
            <Icon name="calendar" size={20} className="brightness-0 opacity-70" />
          </div>
          <h4 className="md-title-small text-md-on-surface mb-1">
            Sans engagement
          </h4>
          <p className="md-body-small text-md-on-surface-variant">
            Pause ou annulation à tout moment
          </p>
        </div>

        <div className="text-center p-4 bg-md-surface-container rounded-xl border border-md-outline-variant">
          <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-br from-md-primary-container to-md-secondary-container rounded-lg flex items-center justify-center">
            <Icon name="delivery-truck" size={20} className="brightness-0 opacity-70" />
          </div>
          <h4 className="md-title-small text-md-on-surface mb-1">
            Livraison gratuite
          </h4>
          <p className="md-body-small text-md-on-surface-variant">
            Sur tous nos packs, directement chez vous
          </p>
        </div>

        <div className="text-center p-4 bg-md-surface-container rounded-xl border border-md-outline-variant">
          <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-br from-md-primary-container to-md-secondary-container rounded-lg flex items-center justify-center">
            <Icon name="scale-balance" size={20} className="brightness-0 opacity-70" />
          </div>
          <h4 className="md-title-small text-md-on-surface mb-1">
            Personnalisable
          </h4>
          <p className="md-body-small text-md-on-surface-variant">
            Adaptez votre menu selon vos préférences
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackSelection;
