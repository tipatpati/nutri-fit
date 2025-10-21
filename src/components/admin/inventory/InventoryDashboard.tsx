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
import { Package, TrendingDown, TrendingUp, Plus, Pencil, Trash2, AlertTriangle } from "lucide-react";
import InventoryStockAlert from "./InventoryStockAlert";
import RecipeAvailabilityChecker from "./RecipeAvailabilityChecker";
import { IngredientForm } from "./IngredientForm";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h2 className="font-['Space_Grotesk'] text-4xl font-bold text-[#2B3210] mb-2">
            Gestion de l'Inventaire
          </h2>
          <p className="text-[#505631] text-lg">
            Gérez vos ingrédients et suivez les stocks en temps réel
          </p>
        </div>
        <Button 
          onClick={handleCreate}
          className="bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white px-8 py-6 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-semibold"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvel ingrédient
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {[
          {
            title: 'Total Ingrédients',
            value: ingredients.length,
            icon: Package,
            color: '#2B3210',
            bgGradient: 'from-[#2B3210]/10 to-[#505631]/10'
          },
          {
            title: 'Stock Faible',
            value: lowStockItems.length,
            icon: TrendingDown,
            color: '#ff8040',
            bgGradient: 'from-warning/10 to-error/10',
            alert: lowStockItems.length > 0
          },
          {
            title: 'Stock Correct',
            value: ingredients.length - lowStockItems.length,
            icon: TrendingUp,
            color: '#4CAF50',
            bgGradient: 'from-success/10 to-info/10'
          }
        ].map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative overflow-hidden"
          >
            <Card className={`glass-strong rounded-3xl border-2 border-transparent hover:border-[#DE6E27]/30 transition-all duration-300 ${stat.alert ? 'ring-2 ring-warning/50' : ''}`}>
              <CardContent className="p-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-10 h-10" style={{ color: stat.color }} />
                    {stat.alert && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <AlertTriangle className="w-6 h-6 text-warning" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-[#505631] font-medium mb-2">{stat.title}</p>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                    className="font-['Space_Grotesk'] text-5xl font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <InventoryStockAlert lowStockItems={lowStockItems} />

      <Card className="glass-strong rounded-3xl shadow-xl border-2 border-[#DE6E27]/20">
        <CardHeader className="bg-gradient-to-br from-[#DE6E27]/10 to-[#ff8040]/10 border-b border-[#DE6E27]/20">
          <CardTitle className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210]">
            Inventaire par Catégorie
          </CardTitle>
          <CardDescription className="text-[#505631]">
            Organisation par nutriment principal
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {Object.entries(byNutrient).map(([nutrient, items], idx) => (
              <motion.div
                key={nutrient}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-2xl p-6 border-2 border-transparent hover:border-[#DE6E27]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210] flex items-center gap-3">
                    <span className="text-4xl">
                      {NUTRIENT_ICONS[nutrient as keyof typeof NUTRIENT_ICONS]}
                    </span>
                    <span>{NUTRIENT_LABELS[nutrient as keyof typeof NUTRIENT_LABELS]}</span>
                  </h3>
                  <Badge className="glass border-2 border-[#DE6E27] text-[#DE6E27] px-4 py-1.5 font-bold text-base">
                    {items.length} ingrédient{items.length > 1 ? 's' : ''}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((item, itemIdx) => {
                    const isLowStock = item.current_stock <= item.reorder_point;
                    const isOutOfStock = item.current_stock === 0;
                    
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 + itemIdx * 0.02 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="group glass-strong rounded-xl p-4 border-2 border-transparent hover:border-[#DE6E27]/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-[#2B3210] flex-1 truncate">
                            {item.name}
                          </span>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 hover:bg-[#DE6E27]/10"
                              onClick={() => handleEdit(item)}
                            >
                              <Pencil className="h-3.5 w-3.5 text-[#DE6E27]" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 hover:bg-error/10"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5 text-error" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge
                            className={cn(
                              "font-bold",
                              isOutOfStock && "bg-error text-white",
                              isLowStock && !isOutOfStock && "bg-warning/20 text-warning border-warning",
                              !isLowStock && !isOutOfStock && "bg-success/20 text-success border-success"
                            )}
                          >
                            {item.current_stock} {item.unit_of_measurement}
                          </Badge>
                          
                          {isOutOfStock && (
                            <span className="text-error text-xs font-bold">Rupture!</span>
                          )}
                        </div>
                        
                        {/* Stock Progress Bar */}
                        <div className="mt-3 h-2 bg-[#E5E2D9] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((item.current_stock / (item.reorder_point * 2)) * 100, 100)}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 + itemIdx * 0.02 }}
                            className={cn(
                              "h-full rounded-full",
                              isOutOfStock && "bg-error",
                              isLowStock && !isOutOfStock && "bg-warning",
                              !isLowStock && !isOutOfStock && "bg-success"
                            )}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
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
