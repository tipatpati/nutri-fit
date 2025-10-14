import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIngredients } from "@/hooks/useIngredients";
import IngredientSelector from "./IngredientSelector";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface RecipeIngredient {
  ingredientId: string;
  nutrientType: 'protein' | 'carbs' | 'vegetables';
}

interface EnhancedRecipeFormData {
  name: string;
  description: string;
  premium: boolean;
  badge: string;
  image_url: string;
  ingredients: {
    protein: string | null;
    carbs: string | null;
    vegetables: string | null;
  };
}

interface EnhancedRecipeFormFieldsProps {
  formData: EnhancedRecipeFormData;
  setFormData: (data: EnhancedRecipeFormData) => void;
}

const EnhancedRecipeFormFields = ({ formData, setFormData }: EnhancedRecipeFormFieldsProps) => {
  const { data: allIngredients = [], isLoading } = useIngredients({ active: true });

  const updateIngredient = (nutrientType: 'protein' | 'carbs' | 'vegetables', ingredientId: string) => {
    setFormData({
      ...formData,
      ingredients: {
        ...formData.ingredients,
        [nutrientType]: ingredientId,
      },
    });
  };

  const getSelectedIngredient = (nutrientType: 'protein' | 'carbs' | 'vegetables') => {
    const id = formData.ingredients[nutrientType];
    return allIngredients.find(ing => ing.id === id);
  };

  const getNutritionalPreview = () => {
    const protein = getSelectedIngredient('protein');
    const carbs = getSelectedIngredient('carbs');
    const vegetables = getSelectedIngredient('vegetables');

    if (!protein || !carbs || !vegetables) return null;

    return { protein, carbs, vegetables };
  };

  const preview = getNutritionalPreview();

  if (isLoading) {
    return <div className="text-center py-4">Chargement des ingrédients...</div>;
  }

  return (
    <div className="grid gap-6 py-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Sélectionnez les ingrédients principaux. Les quantités pour chaque catégorie nutritionnelle 
          (Équilibré, Perte de poids, Prise de masse) seront calculées automatiquement.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="name">Nom de la recette</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ex: Poulet grillé aux légumes"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description complète du plat"
          rows={3}
        />
      </div>

      <Card className="p-4 space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          🍽️ Composition nutritionnelle
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              🥩 Protéines
            </Label>
            <IngredientSelector
              ingredients={allIngredients}
              selectedId={formData.ingredients.protein}
              onSelect={(id) => updateIngredient('protein', id)}
              placeholder="Sélectionner une source de protéines..."
              nutrientFilter="protein"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              🌾 Glucides
            </Label>
            <IngredientSelector
              ingredients={allIngredients}
              selectedId={formData.ingredients.carbs}
              onSelect={(id) => updateIngredient('carbs', id)}
              placeholder="Sélectionner une source de glucides..."
              nutrientFilter="carbs"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              🥗 Légumes
            </Label>
            <IngredientSelector
              ingredients={allIngredients}
              selectedId={formData.ingredients.vegetables}
              onSelect={(id) => updateIngredient('vegetables', id)}
              placeholder="Sélectionner des légumes..."
              nutrientFilter="vegetables"
            />
          </div>
        </div>

        {preview && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <h4 className="font-medium mb-2 text-sm">Aperçu nutritionnel (pour 100g)</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Protéines:</span>
                <p className="font-semibold">{preview.protein.nutritional_info?.protein || 0}g</p>
              </div>
              <div>
                <span className="text-muted-foreground">Glucides:</span>
                <p className="font-semibold">{preview.carbs.nutritional_info?.carbs || 0}g</p>
              </div>
              <div>
                <span className="text-muted-foreground">Légumes:</span>
                <p className="font-semibold">{preview.vegetables.nutritional_info?.fiber || 0}g fibres</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="badge">Badge (optionnel)</Label>
          <Input
            id="badge"
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            placeholder="Ex: Riche en protéines"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_url">URL de l'image</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="premium"
          checked={formData.premium}
          onCheckedChange={(checked) => setFormData({ ...formData, premium: checked })}
        />
        <Label htmlFor="premium">Recette premium</Label>
      </div>
    </div>
  );
};

export default EnhancedRecipeFormFields;
