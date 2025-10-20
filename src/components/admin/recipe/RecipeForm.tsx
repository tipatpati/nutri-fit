import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
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
  isSaving?: boolean;
  useEnhancedFields?: boolean;
}

const RecipeForm = ({
  isOpen,
  onClose,
  editingMeal,
  formData,
  setFormData,
  onSave,
  isSaving = false,
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

        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isSaving}
            className="glass border-2 border-olive-dark text-olive-dark hover:bg-olive-dark hover:text-cream"
          >
            Annuler
          </Button>
          <Button 
            onClick={onSave}
            disabled={isSaving}
            className="bg-gradient-to-br from-orange-primary to-orange-light text-white font-semibold px-8 py-3 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              editingMeal ? "Mettre à jour" : "Créer"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeForm;