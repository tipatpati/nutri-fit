import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Meal, RecipeFormData } from "../types";
import { calculateIngredientQuantities } from "@/utils/recipeQuantityCalculator";
import { useCreateMealIngredients, useDeleteMealIngredients } from "@/hooks/useMealIngredients";
import { useIngredients } from "@/hooks/useIngredients";

export const useRecipeManager = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const { toast } = useToast();
  
  const { data: allIngredients = [] } = useIngredients({ active: true });
  const createMealIngredients = useCreateMealIngredients();
  const deleteMealIngredients = useDeleteMealIngredients();

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
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMeals(data || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les recettes",
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

  const handleSave = async () => {
    try {
      // Validate ingredient selection
      if (!formData.ingredients.protein || !formData.ingredients.carbs || !formData.ingredients.vegetables) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner tous les ingrédients (protéine, glucides, légumes)",
          variant: "destructive"
        });
        return;
      }

      // Get ingredient details
      const proteinIng = allIngredients.find(i => i.id === formData.ingredients.protein);
      const carbsIng = allIngredients.find(i => i.id === formData.ingredients.carbs);
      const vegetablesIng = allIngredients.find(i => i.id === formData.ingredients.vegetables);

      if (!proteinIng || !carbsIng || !vegetablesIng) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la récupération des données des ingrédients",
          variant: "destructive"
        });
        return;
      }

      // Generate display text for backward compatibility
      const meatText = proteinIng.name;
      const carbsText = carbsIng.name;
      const vegetablesText = vegetablesIng.name;

      if (editingMeal) {
        // Update existing meal
        const { error: mealError } = await supabase
          .from("meals")
          .update({
            name: formData.name,
            description: formData.description,
            meat: meatText,
            vegetables: vegetablesText,
            carbs: carbsText,
            category: formData.category,
            premium: formData.premium,
            badge: formData.badge || null,
            image_url: formData.image_url || null,
            base_recipe: true,
          })
          .eq("id", editingMeal.id);

        if (mealError) throw mealError;

        // Delete old ingredients and create new ones
        await deleteMealIngredients.mutateAsync(editingMeal.id);

        const ingredientsToCreate = [
          {
            meal_id: editingMeal.id,
            ingredient_id: proteinIng.id,
            nutrient_type: 'protein' as const,
            ...calculateIngredientQuantities('protein', proteinIng.nutritional_info || { calories: 0, protein: 0, carbs: 0, fat: 0 }),
            is_primary: true,
          },
          {
            meal_id: editingMeal.id,
            ingredient_id: carbsIng.id,
            nutrient_type: 'carbs' as const,
            ...calculateIngredientQuantities('carbs', carbsIng.nutritional_info || { calories: 0, protein: 0, carbs: 0, fat: 0 }),
            is_primary: true,
          },
          {
            meal_id: editingMeal.id,
            ingredient_id: vegetablesIng.id,
            nutrient_type: 'vegetables' as const,
            ...calculateIngredientQuantities('vegetables', vegetablesIng.nutritional_info || { calories: 0, protein: 0, carbs: 0, fat: 0 }),
            is_primary: true,
          },
        ];

        await createMealIngredients.mutateAsync(ingredientsToCreate);
        
        toast({
          title: "Succès",
          description: "Recette mise à jour avec succès"
        });
      } else {
        // Create new meal
        const { data: newMeal, error: mealError } = await supabase
          .from("meals")
          .insert({
            name: formData.name,
            description: formData.description,
            meat: meatText,
            vegetables: vegetablesText,
            carbs: carbsText,
            category: formData.category,
            premium: formData.premium,
            badge: formData.badge || null,
            image_url: formData.image_url || null,
            base_recipe: true,
            active: true,
          })
          .select()
          .single();

        if (mealError) throw mealError;

        // Calculate quantities for all categories and create meal_ingredients
        const ingredientsToCreate = [
          {
            meal_id: newMeal.id,
            ingredient_id: proteinIng.id,
            nutrient_type: 'protein' as const,
            ...calculateIngredientQuantities('protein', proteinIng.nutritional_info || { calories: 0, protein: 0, carbs: 0, fat: 0 }),
            is_primary: true,
          },
          {
            meal_id: newMeal.id,
            ingredient_id: carbsIng.id,
            nutrient_type: 'carbs' as const,
            ...calculateIngredientQuantities('carbs', carbsIng.nutritional_info || { calories: 0, protein: 0, carbs: 0, fat: 0 }),
            is_primary: true,
          },
          {
            meal_id: newMeal.id,
            ingredient_id: vegetablesIng.id,
            nutrient_type: 'vegetables' as const,
            ...calculateIngredientQuantities('vegetables', vegetablesIng.nutritional_info || { calories: 0, protein: 0, carbs: 0, fat: 0 }),
            is_primary: true,
          },
        ];

        await createMealIngredients.mutateAsync(ingredientsToCreate);

        toast({
          title: "Succès",
          description: "Recette créée avec succès"
        });
      }

      fetchMeals();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la sauvegarde de la recette",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) return;

    try {
      const { error } = await supabase
        .from('meals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Recette supprimée avec succès"
      });

      fetchMeals();
    } catch (error) {
      console.error('Error deleting meal:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la recette",
        variant: "destructive"
      });
    }
  };

  return {
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
  };
};