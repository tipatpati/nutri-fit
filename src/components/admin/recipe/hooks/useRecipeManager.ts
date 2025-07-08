import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Meal, RecipeFormData } from "../types";

export const useRecipeManager = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
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
    image_url: ""
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
      image_url: ""
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
        image_url: meal.image_url || ""
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
      if (editingMeal) {
        const { error } = await supabase
          .from('meals')
          .update(formData)
          .eq('id', editingMeal.id);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Recette mise à jour avec succès"
        });
      } else {
        const { error } = await supabase
          .from('meals')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Recette créée avec succès"
        });
      }

      fetchMeals();
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