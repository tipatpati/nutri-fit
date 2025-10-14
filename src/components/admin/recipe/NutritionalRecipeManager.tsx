import { useState, useEffect } from "react";
import { Plus, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { NUTRITIONAL_CATEGORIES, getCategoryById } from "@/constants/nutritionalCategories";
import { Meal, RecipeFormData } from "./types";
import RecipeForm from "./RecipeForm";
import NutritionalRecipeTable from "./NutritionalRecipeTable";

const NutritionalRecipeManager = () => {
  const [baseRecipes, setBaseRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<RecipeFormData>({
    name: "",
    description: "",
    meat: "",
    vegetables: "",
    carbs: "",
    category: "Équilibré",
    premium: false,
    badge: "",
    image_url: "",
    ingredients: {
      protein: null,
      carbs: null,
      vegetables: null,
    }
  });

  useEffect(() => {
    fetchBaseRecipes();
  }, []);

  const fetchBaseRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Filter for base recipes on the frontend since the column might not exist yet
      const baseRecipesData = data?.filter(meal => meal.base_recipe === true) || [];
      setBaseRecipes(baseRecipesData as Meal[]);
    } catch (error) {
      console.error('Error fetching base recipes:', error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les recettes de base",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      meat: "",
      vegetables: "",
      carbs: "",
      category: "Équilibré",
      premium: false,
      badge: "",
      image_url: "",
      ingredients: {
        protein: null,
        carbs: null,
        vegetables: null,
      }
    });
    setEditingMeal(null);
  };

  const handleOpenDialog = (meal?: Meal) => {
    if (meal) {
      setEditingMeal(meal);
      setFormData({
        name: meal.name,
        description: meal.description,
        meat: meal.meat,
        vegetables: meal.vegetables,
        carbs: meal.carbs,
        category: meal.category,
        premium: meal.premium,
        badge: meal.badge || "",
        image_url: meal.image_url || "",
        ingredients: {
          protein: null,
          carbs: null,
          vegetables: null,
        }
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const createCategoryVariants = async (baseRecipe: any) => {
    const variants = [];
    
    for (const category of NUTRITIONAL_CATEGORIES) {
      const variant = {
        ...baseRecipe,
        id: undefined, // Let Supabase generate new ID
        category: category.name,
        base_recipe: false,
        calories_per_serving: category.nutritional_profile.calories_per_serving,
        protein_grams: category.nutritional_profile.protein_grams,
        carbs_grams: category.nutritional_profile.carbs_grams,
        fat_grams: category.nutritional_profile.fat_grams,
      };
      variants.push(variant);
    }

    return variants;
  };

  const handleSave = async () => {
    try {
      if (editingMeal) {
        // Update base recipe
        const { error } = await supabase
          .from('meals')
          .update(formData)
          .eq('id', editingMeal.id);

        if (error) throw error;

        // Update all category variants
        for (const category of NUTRITIONAL_CATEGORIES) {
          const { error: variantError } = await supabase
            .from('meals')
            .update({
              ...formData,
              category: category.name,
              calories_per_serving: category.nutritional_profile.calories_per_serving,
              protein_grams: category.nutritional_profile.protein_grams,
              carbs_grams: category.nutritional_profile.carbs_grams,
              fat_grams: category.nutritional_profile.fat_grams,
            })
            .eq('name', formData.name)
            .eq('category', category.name)
            .eq('base_recipe', false);

          if (variantError) throw variantError;
        }

        toast({
          title: "Succès",
          description: "Recette et ses variantes mises à jour avec succès"
        });
      } else {
        // Create base recipe
        const baseRecipeData = {
          ...formData,
          base_recipe: true,
          category: 'Base' // Base recipes don't have a specific category
        };

        const { data: baseRecipe, error: baseError } = await supabase
          .from('meals')
          .insert([baseRecipeData])
          .select()
          .single();

        if (baseError) throw baseError;

        // Create category variants
        const variants = await createCategoryVariants(baseRecipe);
        
        const { error: variantsError } = await supabase
          .from('meals')
          .insert(variants);

        if (variantsError) throw variantsError;

        toast({
          title: "Succès",
          description: "Recette créée avec toutes ses variantes nutritionnelles"
        });
      }

      fetchBaseRecipes();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving meal:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la recette",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette recette et toutes ses variantes ?")) return;

    try {
      // Delete base recipe and all variants
      const { error } = await supabase
        .from('meals')
        .delete()
        .eq('name', name);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Recette et toutes ses variantes supprimées avec succès"
      });

      fetchBaseRecipes();
    } catch (error) {
      console.error('Error deleting meal:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la recette",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <ChefHat className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
          <p className="mt-2 text-sm text-gray-600">Chargement des recettes...</p>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <div>
          <CardTitle className="text-emerald-800 text-xl font-bold">
            Gestion des Recettes Nutritionnelles
          </CardTitle>
          <CardDescription className="text-sm text-emerald-800">
            Créez des recettes qui s'adaptent automatiquement aux catégories nutritionnelles
          </CardDescription>
        </div>
        <Button 
          onClick={() => handleOpenDialog()} 
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une recette
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
          <h3 className="font-semibold text-emerald-800 mb-2">Catégories Nutritionnelles Actives:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {NUTRITIONAL_CATEGORIES.map((category) => (
              <div key={category.id} className="p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <h4 className="font-medium text-emerald-800">{category.name}</h4>
                </div>
                <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                <div className="text-xs text-gray-500">
                  <div>Calories: {category.nutritional_profile.calories_per_serving}</div>
                  <div>Protéines: {category.nutritional_profile.protein_grams}g</div>
                  <div>Glucides: {category.nutritional_profile.carbs_grams}g</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <NutritionalRecipeTable 
          meals={baseRecipes} 
          onEdit={handleOpenDialog} 
          onDelete={handleDelete} 
        />
      </CardContent>
      
      <RecipeForm 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
        editingMeal={editingMeal} 
        formData={formData} 
        setFormData={setFormData} 
        onSave={handleSave} 
      />
    </Card>
  );
};

export default NutritionalRecipeManager;