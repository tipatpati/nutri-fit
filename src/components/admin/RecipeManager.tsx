import { Plus, ChefHat, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRecipeManager } from "./recipe/hooks/useRecipeManager";
import RecipeForm from "./recipe/RecipeForm";
import RecipeTable from "./recipe/RecipeTable";
import EnhancedRecipeFormFields from "./recipe/EnhancedRecipeFormFields";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
const RecipeManager = () => {
  const {
    meals,
    loading,
    isSaving,
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

  const totalRecipes = meals?.length || 0;
  const premiumRecipes = meals?.filter(m => m.premium).length || 0;
  const activeRecipes = totalRecipes; // All recipes shown in table are active

  return <Card>
      <CardHeader className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="font-['Space_Grotesk'] text-3xl font-bold text-[#2B3210] mb-2">
              Gestion des Recettes
            </CardTitle>
            <CardDescription className="text-lg text-[#505631]">
              Gérez vos recettes avec calcul automatique des valeurs nutritionnelles
            </CardDescription>
          </div>
          <Button 
            onClick={() => handleOpenDialog()} 
            className="bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white px-8 py-6 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle recette
          </Button>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { label: 'Total Recettes', value: totalRecipes, icon: ChefHat, color: '#DE6E27' },
            { label: 'Recettes Premium', value: premiumRecipes, icon: Star, color: '#2B3210' },
            { label: 'Recettes Actives', value: activeRecipes, icon: CheckCircle, color: '#4CAF50' }
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-strong rounded-2xl p-6 border-2 border-transparent hover:border-[#DE6E27]/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
              </div>
              <p className="text-[#505631] text-sm font-medium mb-1">{stat.label}</p>
              <p className="font-['Space_Grotesk'] text-4xl font-bold text-[#2B3210]">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </CardHeader>
      
      <CardContent>
        <RecipeTable meals={meals} onEdit={handleOpenDialog} onDelete={handleDelete} />
      </CardContent>
      
      <RecipeForm 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
        editingMeal={editingMeal} 
        formData={formData} 
        setFormData={setFormData} 
        onSave={handleSave}
        isSaving={isSaving}
        useEnhancedFields={true}
      />
    </Card>;
};
export default RecipeManager;