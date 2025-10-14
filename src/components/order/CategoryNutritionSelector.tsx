import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Activity, Wheat, Target, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

interface CategoryNutritionSelectorProps {
  selectedCategory: 'equilibre' | 'perte_poids' | 'prise_masse';
  onSelectCategory: (category: 'equilibre' | 'perte_poids' | 'prise_masse') => void;
}

const CATEGORY_INFO = {
  equilibre: {
    label: 'Équilibré',
    icon: Target,
    color: 'bg-blue-500',
    description: 'Alimentation équilibrée pour maintenir votre forme',
    calories: '~550 kcal',
    protein: '~45g',
    carbs: '~60g',
    benefits: ['Équilibre nutritionnel optimal', 'Maintien du poids', 'Énergie stable'],
  },
  perte_poids: {
    label: 'Perte de poids',
    icon: TrendingDown,
    color: 'bg-green-500',
    description: 'Programme optimisé pour perdre du poids sainement',
    calories: '~400 kcal',
    protein: '~50g',
    carbs: '~40g',
    benefits: ['Déficit calorique contrôlé', 'Haute teneur en protéines', 'Satiété optimale'],
  },
  prise_masse: {
    label: 'Prise de masse',
    icon: TrendingUp,
    color: 'bg-orange-500',
    description: 'Programme riche pour développer votre masse musculaire',
    calories: '~700 kcal',
    protein: '~55g',
    carbs: '~70g',
    benefits: ['Surplus calorique', 'Protéines élevées', 'Énergie maximale'],
  },
};

const CategoryNutritionSelector = ({ selectedCategory, onSelectCategory }: CategoryNutritionSelectorProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choisissez votre objectif nutritionnel</h2>
        <p className="text-muted-foreground">
          Chaque recette sera automatiquement ajustée en fonction de votre objectif
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(CATEGORY_INFO) as Array<keyof typeof CATEGORY_INFO>).map((category) => {
          const info = CATEGORY_INFO[category];
          const Icon = info.icon;
          const isSelected = selectedCategory === category;

          return (
            <Card
              key={category}
              className={`cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
              }`}
              onClick={() => onSelectCategory(category)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${info.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {isSelected && (
                    <Badge variant="default">Sélectionné</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{info.label}</CardTitle>
                <CardDescription className="text-sm">
                  {info.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      Calories
                    </span>
                    <span className="font-semibold">{info.calories}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Activity className="h-4 w-4 text-red-500" />
                      Protéines
                    </span>
                    <span className="font-semibold">{info.protein}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Wheat className="h-4 w-4 text-amber-500" />
                      Glucides
                    </span>
                    <span className="font-semibold">{info.carbs}</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs font-medium mb-2">Avantages:</p>
                  <ul className="space-y-1">
                    {info.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full"
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(category);
                  }}
                >
                  {isSelected ? 'Objectif sélectionné' : 'Choisir cet objectif'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedCategory && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-center">
              <span className="font-semibold">Important:</span> Toutes les recettes affichées ci-dessous sont 
              automatiquement ajustées pour votre objectif <span className="font-semibold">{CATEGORY_INFO[selectedCategory].label}</span>.
              Les quantités et valeurs nutritionnelles correspondent à cet objectif.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CategoryNutritionSelector;
