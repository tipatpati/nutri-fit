import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { calculateIngredientQuantities, calculateRecipeNutrition, validateNutritionTargets } from "@/utils/recipeQuantityCalculator";
import type { Ingredient } from "@/hooks/useIngredients";

interface NutritionPreviewProps {
  selectedIngredients: {
    protein: string | null;
    carbs: string | null;
    vegetables: string | null;
  };
  allIngredients: Ingredient[];
}

interface GoalNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantities: {
    protein: number;
    carbs: number;
    vegetables: number;
  };
}

const NutritionPreview = ({ selectedIngredients, allIngredients }: NutritionPreviewProps) => {
  const calculations = useMemo(() => {
    const proteinIng = allIngredients.find(i => i.id === selectedIngredients.protein);
    const carbsIng = allIngredients.find(i => i.id === selectedIngredients.carbs);
    const veggiesIng = allIngredients.find(i => i.id === selectedIngredients.vegetables);

    if (!proteinIng?.nutritional_info || !carbsIng?.nutritional_info || !veggiesIng?.nutritional_info) {
      return null;
    }

    // Calculate quantities for each goal
    const proteinQty = calculateIngredientQuantities('protein', proteinIng.nutritional_info);
    const carbsQty = calculateIngredientQuantities('carbs', carbsIng.nutritional_info);
    const veggiesQty = calculateIngredientQuantities('vegetables', veggiesIng.nutritional_info);

    // Calculate nutrition for Équilibré
    const equilibre = calculateRecipeNutrition([
      { nutrientType: 'protein', quantity: proteinQty.quantity_equilibre, nutrition: proteinIng.nutritional_info },
      { nutrientType: 'carbs', quantity: carbsQty.quantity_equilibre, nutrition: carbsIng.nutritional_info },
      { nutrientType: 'vegetables', quantity: veggiesQty.quantity_equilibre, nutrition: veggiesIng.nutritional_info }
    ]);

    // Calculate nutrition for Minceur
    const pertePoids = calculateRecipeNutrition([
      { nutrientType: 'protein', quantity: proteinQty.quantity_perte_poids, nutrition: proteinIng.nutritional_info },
      { nutrientType: 'carbs', quantity: carbsQty.quantity_perte_poids, nutrition: carbsIng.nutritional_info },
      { nutrientType: 'vegetables', quantity: veggiesQty.quantity_perte_poids, nutrition: veggiesIng.nutritional_info }
    ]);

    // Calculate nutrition for Prise de Masse
    const priseMasse = calculateRecipeNutrition([
      { nutrientType: 'protein', quantity: proteinQty.quantity_prise_masse, nutrition: proteinIng.nutritional_info },
      { nutrientType: 'carbs', quantity: carbsQty.quantity_prise_masse, nutrition: carbsIng.nutritional_info },
      { nutrientType: 'vegetables', quantity: veggiesQty.quantity_prise_masse, nutrition: veggiesIng.nutritional_info }
    ]);

    return {
      equilibre: {
        ...equilibre,
        quantities: {
          protein: proteinQty.quantity_equilibre,
          carbs: carbsQty.quantity_equilibre,
          vegetables: veggiesQty.quantity_equilibre
        },
        validation: validateNutritionTargets(equilibre, 'equilibre')
      },
      pertePoids: {
        ...pertePoids,
        quantities: {
          protein: proteinQty.quantity_perte_poids,
          carbs: carbsQty.quantity_perte_poids,
          vegetables: veggiesQty.quantity_perte_poids
        },
        validation: validateNutritionTargets(pertePoids, 'perte_poids')
      },
      priseMasse: {
        ...priseMasse,
        quantities: {
          protein: proteinQty.quantity_prise_masse,
          carbs: carbsQty.quantity_prise_masse,
          vegetables: veggiesQty.quantity_prise_masse
        },
        validation: validateNutritionTargets(priseMasse, 'prise_masse')
      },
      ingredients: { proteinIng, carbsIng, veggiesIng }
    };
  }, [selectedIngredients, allIngredients]);

  if (!calculations) {
    return (
      <div className="glass rounded-2xl p-8 text-center border border-orange-primary/10">
        <p className="text-olive-muted">
          Sélectionnez tous les ingrédients pour voir l'aperçu nutritionnel
        </p>
      </div>
    );
  }

  const ValidationIcon = ({ valid, deviations }: { valid: boolean; deviations: any }) => {
    const maxDeviation = Math.max(
      Math.abs(deviations.calories),
      Math.abs(deviations.protein),
      Math.abs(deviations.carbs)
    );

    if (valid || maxDeviation < 5) {
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    } else if (maxDeviation < 15) {
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    } else {
      return <XCircle className="h-5 w-5 text-error" />;
    }
  };

  const GoalCard = ({ 
    title, 
    color, 
    borderColor, 
    nutrition, 
    quantities,
    validation,
    ingredientNames
  }: { 
    title: string; 
    color: string; 
    borderColor: string; 
    nutrition: GoalNutrition;
    quantities: { protein: number; carbs: number; vegetables: number };
    validation: { valid: boolean; deviations: any };
    ingredientNames: { protein: string; carbs: string; vegetables: string };
  }) => (
    <Card className={`glass rounded-2xl p-6 border-2 ${borderColor} hover:scale-[1.02] transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-heading text-xl font-bold text-olive-dark">
          {title}
        </h4>
        <ValidationIcon valid={validation.valid} deviations={validation.deviations} />
      </div>

      {/* Calories - Large Display */}
      <div className="text-center mb-6 py-4 glass-strong rounded-xl">
        <div className="text-6xl font-bold text-olive-dark">{nutrition.calories}</div>
        <div className="text-sm text-olive-muted font-medium mt-1">calories</div>
      </div>

      {/* Macros Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center p-3 glass-strong rounded-lg">
          <div className="text-3xl font-bold text-orange-primary">{nutrition.protein}g</div>
          <div className="text-xs text-olive-muted mt-1">Protéines</div>
        </div>
        <div className="text-center p-3 glass-strong rounded-lg">
          <div className="text-3xl font-bold text-info">{nutrition.carbs}g</div>
          <div className="text-xs text-olive-muted mt-1">Glucides</div>
        </div>
        <div className="text-center p-3 glass-strong rounded-lg">
          <div className="text-3xl font-bold text-warning">{nutrition.fat}g</div>
          <div className="text-xs text-olive-muted mt-1">Lipides</div>
        </div>
      </div>

      {/* Ingredient Quantities */}
      <div className="space-y-2 pt-4 border-t border-beige">
        <p className="text-xs font-semibold text-olive-dark mb-2">Quantités par ingrédient:</p>
        <div className="flex justify-between text-xs text-olive-muted">
          <span className="truncate flex-1">{ingredientNames.protein}:</span>
          <span className="font-semibold text-olive-dark ml-2">{quantities.protein}g</span>
        </div>
        <div className="flex justify-between text-xs text-olive-muted">
          <span className="truncate flex-1">{ingredientNames.carbs}:</span>
          <span className="font-semibold text-olive-dark ml-2">{quantities.carbs}g</span>
        </div>
        <div className="flex justify-between text-xs text-olive-muted">
          <span className="truncate flex-1">{ingredientNames.vegetables}:</span>
          <span className="font-semibold text-olive-dark ml-2">{quantities.vegetables}g</span>
        </div>
      </div>

      {/* Deviation badges */}
      {!validation.valid && (
        <div className="mt-4 pt-4 border-t border-beige">
          <p className="text-xs text-olive-muted mb-2">Écarts par rapport à la cible:</p>
          <div className="flex flex-wrap gap-2">
            {Math.abs(validation.deviations.calories) > 5 && (
              <Badge variant="outline" className="text-xs">
                Cal: {validation.deviations.calories > 0 ? '+' : ''}{validation.deviations.calories}%
              </Badge>
            )}
            {Math.abs(validation.deviations.protein) > 5 && (
              <Badge variant="outline" className="text-xs">
                Prot: {validation.deviations.protein > 0 ? '+' : ''}{validation.deviations.protein}%
              </Badge>
            )}
            {Math.abs(validation.deviations.carbs) > 5 && (
              <Badge variant="outline" className="text-xs">
                Gluc: {validation.deviations.carbs > 0 ? '+' : ''}{validation.deviations.carbs}%
              </Badge>
            )}
          </div>
        </div>
      )}
    </Card>
  );

  const ingredientNames = {
    protein: calculations.ingredients.proteinIng.name,
    carbs: calculations.ingredients.carbsIng.name,
    vegetables: calculations.ingredients.veggiesIng.name
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-heading text-2xl font-bold text-olive-dark">
          Aperçu Nutritionnel
        </h3>
        <Badge className="glass-strong border border-orange-primary text-orange-primary">
          Calcul automatique
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GoalCard
          title="Minceur"
          color="text-success"
          borderColor="border-success"
          nutrition={calculations.pertePoids}
          quantities={calculations.pertePoids.quantities}
          validation={calculations.pertePoids.validation}
          ingredientNames={ingredientNames}
        />
        
        <GoalCard
          title="Équilibré"
          color="text-info"
          borderColor="border-info"
          nutrition={calculations.equilibre}
          quantities={calculations.equilibre.quantities}
          validation={calculations.equilibre.validation}
          ingredientNames={ingredientNames}
        />
        
        <GoalCard
          title="Prise de Masse"
          color="text-warning"
          borderColor="border-warning"
          nutrition={calculations.priseMasse}
          quantities={calculations.priseMasse.quantities}
          validation={calculations.priseMasse.validation}
          ingredientNames={ingredientNames}
        />
      </div>
    </div>
  );
};

export default NutritionPreview;
