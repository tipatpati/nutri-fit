import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Meal, RecipeFormData } from "./types";
import RecipeFormFields from "./RecipeFormFields";
import EnhancedRecipeFormFields from "./EnhancedRecipeFormFields";

interface RecipeFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingMeal: Meal | null;
  formData: RecipeFormData;
  setFormData: (data: RecipeFormData) => void;
  onSave: () => void;
  useEnhancedFields?: boolean;
}

const RecipeForm = ({
  isOpen,
  onClose,
  editingMeal,
  formData,
  setFormData,
  onSave,
  useEnhancedFields = false
}: RecipeFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingMeal ? "Modifier la recette" : "Nouvelle recette"}
          </DialogTitle>
          <DialogDescription>
            {useEnhancedFields 
              ? "Sélectionnez les ingrédients - les quantités seront calculées automatiquement pour chaque objectif"
              : "Remplissez les informations de la recette avec ses composants nutritionnels"}
          </DialogDescription>
        </DialogHeader>
        
        {useEnhancedFields ? (
          <EnhancedRecipeFormFields formData={formData} setFormData={setFormData} />
        ) : (
          <RecipeFormFields formData={formData} setFormData={setFormData} />
        )}

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={onSave}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
          >
            {editingMeal ? "Mettre à jour" : "Créer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeForm;