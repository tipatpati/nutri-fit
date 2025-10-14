import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useIngredients, type Ingredient } from "@/hooks/useIngredients";
import { useCreateIngredient, useUpdateIngredient, useDeleteIngredient } from "@/hooks/useIngredientMutations";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingDown, TrendingUp, Plus, Pencil, Trash2 } from "lucide-react";
import InventoryStockAlert from "./InventoryStockAlert";
import RecipeAvailabilityChecker from "./RecipeAvailabilityChecker";
import { IngredientForm } from "./IngredientForm";

const NUTRIENT_ICONS = {
  protein: '🥩',
  carbs: '🌾',
  vegetables: '🥗',
  fat: '🥑',
  condiment: '🧂',
};

const NUTRIENT_LABELS = {
  protein: 'Protéines',
  carbs: 'Glucides',
  vegetables: 'Légumes',
  fat: 'Lipides',
  condiment: 'Condiments',
};

const InventoryDashboard = () => {
  const { data: ingredients = [], isLoading } = useIngredients({ active: true });
  const createMutation = useCreateIngredient();
  const updateMutation = useUpdateIngredient();
  const deleteMutation = useDeleteIngredient();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] = useState<string | null>(null);

  const handleCreate = () => {
    setSelectedIngredient(null);
    setIsFormOpen(true);
  };

  const handleEdit = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setIngredientToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (ingredientToDelete) {
      deleteMutation.mutate(ingredientToDelete);
      setDeleteDialogOpen(false);
      setIngredientToDelete(null);
    }
  };

  const handleFormSubmit = (formData: any) => {
    if (selectedIngredient) {
      updateMutation.mutate(
        { id: selectedIngredient.id, ...formData },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setSelectedIngredient(null);
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          setIsFormOpen(false);
        },
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Chargement de l'inventaire...</div>;
  }

  const lowStockItems = ingredients.filter(
    ing => ing.current_stock <= ing.reorder_point
  );

  const byNutrient = ingredients.reduce((acc, ing) => {
    if (!acc[ing.primary_nutrient]) {
      acc[ing.primary_nutrient] = [];
    }
    acc[ing.primary_nutrient].push(ing);
    return acc;
  }, {} as Record<string, typeof ingredients>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestion de l'inventaire</h2>
          <p className="text-muted-foreground">Gérez vos ingrédients et stocks</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel ingrédient
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Total Ingrédients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ingredients.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Ingrédients actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-orange-500" />
              Stock Faible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Nécessite réapprovisionnement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Stock Correct
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {ingredients.length - lowStockItems.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Bien approvisionné</p>
          </CardContent>
        </Card>
      </div>

      <InventoryStockAlert lowStockItems={lowStockItems} />

      <Card>
        <CardHeader>
          <CardTitle>Inventaire par Catégorie Nutritionnelle</CardTitle>
          <CardDescription>
            Organisation des ingrédients selon leur nutriment principal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(byNutrient).map(([nutrient, items]) => (
              <div key={nutrient} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">
                    {NUTRIENT_ICONS[nutrient as keyof typeof NUTRIENT_ICONS]}
                  </span>
                  <span>{NUTRIENT_LABELS[nutrient as keyof typeof NUTRIENT_LABELS]}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {items.length} ingrédient{items.length > 1 ? 's' : ''}
                  </Badge>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 border rounded text-sm group"
                    >
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            item.current_stock === 0
                              ? 'destructive'
                              : item.current_stock <= item.reorder_point
                              ? 'outline'
                              : 'secondary'
                          }
                          className={
                            item.current_stock > 0 && item.current_stock <= item.reorder_point
                              ? 'border-orange-300 text-orange-700'
                              : ''
                          }
                        >
                          {item.current_stock} {item.unit_of_measurement}
                        </Badge>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <RecipeAvailabilityChecker />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedIngredient ? 'Modifier l\'ingrédient' : 'Nouvel ingrédient'}
            </DialogTitle>
            <DialogDescription>
              {selectedIngredient
                ? 'Modifiez les informations de l\'ingrédient'
                : 'Ajoutez un nouvel ingrédient à l\'inventaire'}
            </DialogDescription>
          </DialogHeader>
          <IngredientForm
            ingredient={selectedIngredient || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setSelectedIngredient(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir désactiver cet ingrédient ? Il sera marqué comme
              inactif et ne sera plus disponible pour les nouvelles recettes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Confirmer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InventoryDashboard;
