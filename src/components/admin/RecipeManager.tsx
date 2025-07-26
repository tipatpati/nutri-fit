import { Plus, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRecipeManager } from "./recipe/hooks/useRecipeManager";
import RecipeForm from "./recipe/RecipeForm";
import RecipeTable from "./recipe/RecipeTable";
const RecipeManager = () => {
  const {
    meals,
    loading,
    isDialogOpen,
    editingMeal,
    formData,
    setFormData,
    handleOpenDialog,
    handleCloseDialog,
    handleSave,
    handleDelete
  } = useRecipeManager();
  if (loading) {
    return <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <ChefHat className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
          <p className="mt-2 text-sm text-gray-600">Chargement des recettes...</p>
        </div>
      </div>;
  }
  return <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <div>
          <CardTitle className="text-[#113B39] text-xl font-bold">Gestion des Recettes</CardTitle>
          <CardDescription className="text-sm text-md-surface-on-surface">Gérez vos recettes et leur composition nutritionnelle</CardDescription>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une recette
        </Button>
      </CardHeader>
      
      <CardContent>
        <RecipeTable meals={meals} onEdit={handleOpenDialog} onDelete={handleDelete} />
      </CardContent>
      
      <RecipeForm isOpen={isDialogOpen} onClose={handleCloseDialog} editingMeal={editingMeal} formData={formData} setFormData={setFormData} onSave={handleSave} />
    </Card>;
};
export default RecipeManager;