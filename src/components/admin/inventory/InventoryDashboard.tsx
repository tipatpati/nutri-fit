import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIngredients } from "@/hooks/useIngredients";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingDown, TrendingUp } from "lucide-react";
import InventoryStockAlert from "./InventoryStockAlert";
import RecipeAvailabilityChecker from "./RecipeAvailabilityChecker";

const NUTRIENT_ICONS = {
  protein: '🥩',
  carbs: '🌾',
  vegetables: '🥗',
  fat: '🥑',
  condiment: '🧂',
};

const NUTRIENT_LABELS = {
  protein: 'Protéines',
  carbs: 'Glucides',
  vegetables: 'Légumes',
  fat: 'Lipides',
  condiment: 'Condiments',
};

const InventoryDashboard = () => {
  const { data: ingredients = [], isLoading } = useIngredients({ active: true });

  if (isLoading) {
    return <div className="text-center py-8">Chargement de l'inventaire...</div>;
  }

  const lowStockItems = ingredients.filter(
    ing => ing.current_stock <= ing.reorder_point
  );

  const byNutrient = ingredients.reduce((acc, ing) => {
    if (!acc[ing.primary_nutrient]) {
      acc[ing.primary_nutrient] = [];
    }
    acc[ing.primary_nutrient].push(ing);
    return acc;
  }, {} as Record<string, typeof ingredients>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Total Ingrédients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ingredients.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Ingrédients actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-orange-500" />
              Stock Faible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Nécessite réapprovisionnement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Stock Correct
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {ingredients.length - lowStockItems.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Bien approvisionné</p>
          </CardContent>
        </Card>
      </div>

      <InventoryStockAlert lowStockItems={lowStockItems} />

      <Card>
        <CardHeader>
          <CardTitle>Inventaire par Catégorie Nutritionnelle</CardTitle>
          <CardDescription>
            Organisation des ingrédients selon leur nutriment principal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(byNutrient).map(([nutrient, items]) => (
              <div key={nutrient} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">
                    {NUTRIENT_ICONS[nutrient as keyof typeof NUTRIENT_ICONS]}
                  </span>
                  <span>{NUTRIENT_LABELS[nutrient as keyof typeof NUTRIENT_LABELS]}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {items.length} ingrédient{items.length > 1 ? 's' : ''}
                  </Badge>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 border rounded text-sm"
                    >
                      <span className="font-medium">{item.name}</span>
                      <Badge
                        variant={
                          item.current_stock === 0
                            ? 'destructive'
                            : item.current_stock <= item.reorder_point
                            ? 'outline'
                            : 'secondary'
                        }
                        className={
                          item.current_stock > 0 && item.current_stock <= item.reorder_point
                            ? 'border-orange-300 text-orange-700'
                            : ''
                        }
                      >
                        {item.current_stock} {item.unit_of_measurement}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <RecipeAvailabilityChecker />
    </div>
  );
};

export default InventoryDashboard;
