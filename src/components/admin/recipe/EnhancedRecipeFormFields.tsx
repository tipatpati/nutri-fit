import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIngredients } from "@/hooks/useIngredients";
import IngredientSelector from "./IngredientSelector";
import ImageUpload from "./ImageUpload";
import NutritionPreview from "./NutritionPreview";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 py-6"
    >
      {/* Info Alert */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Alert className="glass-strong border-2 border-[#DE6E27]/30 shadow-lg">
          <Info className="h-5 w-5 text-[#DE6E27]" />
          <AlertDescription className="text-[#505631] leading-relaxed">
            <span className="font-bold text-[#2B3210]">Mode automatique activé:</span> Les quantités pour les 3 objectifs nutritionnels (Équilibré, Perte de poids, Prise de masse) sont calculées automatiquement selon les ingrédients sélectionnés.
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Basic Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <Label className="text-base font-bold text-[#2B3210]">
            Nom de la recette *
          </Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Poulet grillé aux légumes"
            className="glass-strong border-2 border-[#E5E2D9] focus:border-[#DE6E27] py-6 text-lg rounded-xl transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-base font-bold text-[#2B3210]">
            Description *
          </Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description complète du plat..."
            rows={4}
            className="glass-strong border-2 border-[#E5E2D9] focus:border-[#DE6E27] text-lg rounded-xl transition-all duration-300 resize-none"
          />
        </div>
      </motion.div>

      {/* Ingredients Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-strong rounded-3xl overflow-hidden border-2 border-[#DE6E27]/20 shadow-xl">
          <CardHeader className="bg-gradient-to-br from-[#DE6E27]/10 to-[#ff8040]/10 border-b border-[#DE6E27]/20">
            <CardTitle className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210] flex items-center gap-3">
              🍽️ Composition Nutritionnelle
            </CardTitle>
            <CardDescription className="text-[#505631]">
              Sélectionnez les ingrédients principaux pour chaque catégorie
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {[
              { key: 'protein', icon: '🥩', label: 'Source de Protéines', color: '#DE6E27' },
              { key: 'carbs', icon: '🌾', label: 'Source de Glucides', color: '#505631' },
              { key: 'vegetables', icon: '🥗', label: 'Légumes', color: '#4CAF50' }
            ].map((item, idx) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="space-y-3"
              >
                <Label className="flex items-center gap-3 text-lg font-bold text-[#2B3210]">
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Label>
                <div className="glass rounded-xl p-1 border-2 transition-all duration-300" style={{ borderColor: formData.ingredients[item.key as keyof typeof formData.ingredients] ? item.color : '#E5E2D9' }}>
                  <IngredientSelector
                    ingredients={allIngredients}
                    selectedId={formData.ingredients[item.key as keyof typeof formData.ingredients]}
                    onSelect={(id) => updateIngredient(item.key as any, id)}
                    placeholder={`Sélectionner ${item.label.toLowerCase()}...`}
                    nutrientFilter={item.key as any}
                  />
                </div>
                {formData.ingredients[item.key as keyof typeof formData.ingredients] && (
                  <motion.div
                    initial={{ scale: 0, x: -10 }}
                    animate={{ scale: 1, x: 0 }}
                    className="flex items-center gap-2 text-success text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-semibold">Ingrédient sélectionné</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Real-time Nutrition Preview */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <NutritionPreview
              selectedIngredients={formData.ingredients}
              allIngredients={allIngredients}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Upload */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <Label className="text-base font-bold text-[#2B3210]">
          Image de la recette
        </Label>
        <ImageUpload
          currentImageUrl={formData.image_url}
          onImageChange={(url) => setFormData({ ...formData, image_url: url })}
        />
      </motion.div>

      {/* Badge Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-2"
      >
        <Label htmlFor="badge" className="text-base font-bold text-[#2B3210]">
          Badge (optionnel)
        </Label>
        <Input
          id="badge"
          value={formData.badge}
          onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
          placeholder="Ex: Riche en protéines, Végétarien, Sans gluten"
          className="glass-strong border-2 border-[#E5E2D9] focus:border-[#DE6E27] py-6 text-lg rounded-xl transition-all duration-300"
        />
      </motion.div>

      {/* Premium Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-4 glass-strong rounded-xl p-6 border-2 border-transparent hover:border-[#DE6E27]/30 transition-all duration-300"
      >
        <Switch
          id="premium"
          checked={formData.premium}
          onCheckedChange={(checked) => setFormData({ ...formData, premium: checked })}
          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#DE6E27] data-[state=checked]:to-[#ff8040]"
        />
        <Label htmlFor="premium" className="text-[#2B3210] font-semibold cursor-pointer flex items-center gap-2">
          <span className="text-xl">⭐</span>
          Recette premium
        </Label>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedRecipeFormFields;
