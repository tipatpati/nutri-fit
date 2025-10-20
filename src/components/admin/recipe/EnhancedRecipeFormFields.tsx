import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useIngredients } from "@/hooks/useIngredients";
import IngredientSelector from "./IngredientSelector";
import ImageUpload from "./ImageUpload";
import NutritionPreview from "./NutritionPreview";
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
    <div className="grid gap-8 py-6">
      <Alert className="glass border border-orange-primary/20">
        <Info className="h-5 w-5 text-orange-primary" />
        <AlertDescription className="text-olive-muted">
          Sélectionnez les ingrédients principaux. Les quantités pour chaque catégorie nutritionnelle 
          (Équilibré, Perte de poids, Prise de masse) seront calculées automatiquement.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold text-olive-dark">
          Nom de la recette
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ex: Poulet grillé aux légumes"
          className="glass border border-beige focus:border-orange-primary focus:ring-orange-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-semibold text-olive-dark">
          Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description complète du plat"
          rows={3}
          className="glass border border-beige focus:border-orange-primary focus:ring-orange-primary/20"
        />
      </div>

      <Card className="glass rounded-2xl p-6 border border-orange-primary/10">
        <h3 className="font-heading text-xl font-bold text-olive-dark mb-6 flex items-center gap-2">
          🍽️ Composition nutritionnelle
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold text-olive-dark">
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
            <Label className="flex items-center gap-2 text-sm font-semibold text-olive-dark">
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
            <Label className="flex items-center gap-2 text-sm font-semibold text-olive-dark">
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

      </Card>

      {/* Real-time Nutrition Preview */}
      {preview && (
        <NutritionPreview
          selectedIngredients={formData.ingredients}
          allIngredients={allIngredients}
        />
      )}

      {/* Image Upload */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-olive-dark">
          Image de la recette
        </Label>
        <ImageUpload
          currentImageUrl={formData.image_url}
          onImageChange={(url) => setFormData({ ...formData, image_url: url })}
        />
      </div>

      {/* Badge Input */}
      <div className="space-y-2">
        <Label htmlFor="badge" className="text-sm font-semibold text-olive-dark">
          Badge (optionnel)
        </Label>
        <Input
          id="badge"
          value={formData.badge}
          onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
          placeholder="Ex: Riche en protéines, Végétarien, Sans gluten"
          className="glass border border-beige focus:border-orange-primary focus:ring-orange-primary/20"
        />
      </div>

      {/* Premium Toggle */}
      <div className="flex items-center gap-3 glass rounded-xl p-4">
        <Switch
          id="premium"
          checked={formData.premium}
          onCheckedChange={(checked) => setFormData({ ...formData, premium: checked })}
          className="data-[state=checked]:bg-orange-primary"
        />
        <Label htmlFor="premium" className="text-olive-dark font-medium cursor-pointer">
          Recette premium
        </Label>
      </div>
    </div>
  );
};

export default EnhancedRecipeFormFields;
