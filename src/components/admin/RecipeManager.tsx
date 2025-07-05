import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Meal {
  id: string;
  name: string;
  description: string;
  meat: string;
  vegetables: string;
  carbs: string;
  category: string;
  premium: boolean;
  badge?: string;
  image_url?: string;
}

const RecipeManager = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Prise de masse": return "text-orange-600";
      case "Perte de poids": return "text-emerald-600";
      case "Équilibré": return "text-amber-600";
      default: return "text-slate-600";
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
          <CardTitle className="text-[#113B39] text-xl font-bold">Gestion des Recettes</CardTitle>
          <CardDescription className="text-sm">Gérez vos recettes et leur composition nutritionnelle</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => handleOpenDialog()}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une recette
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMeal ? "Modifier la recette" : "Nouvelle recette"}
              </DialogTitle>
              <DialogDescription>
                Remplissez les informations de la recette avec ses composants nutritionnels
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de la recette</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Chicken Boost - Riz Énergie"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Équilibré">Équilibré</SelectItem>
                      <SelectItem value="Perte de poids">Perte de poids</SelectItem>
                      <SelectItem value="Prise de masse">Prise de masse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description complète du plat"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meat">Viandes/Protéines</Label>
                  <Input
                    id="meat"
                    value={formData.meat}
                    onChange={(e) => setFormData({ ...formData, meat: e.target.value })}
                    placeholder="Ex: Blanc de poulet grillé"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vegetables">Légumes</Label>
                  <Input
                    id="vegetables"
                    value={formData.vegetables}
                    onChange={(e) => setFormData({ ...formData, vegetables: e.target.value })}
                    placeholder="Ex: Légumes vapeur"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs">Glucides</Label>
                  <Input
                    id="carbs"
                    value={formData.carbs}
                    onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                    placeholder="Ex: Riz basmati"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="badge">Badge (optionnel)</Label>
                  <Input
                    id="badge"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Ex: Repas protéiné"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">URL de l'image</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="premium"
                  checked={formData.premium}
                  onCheckedChange={(checked) => setFormData({ ...formData, premium: checked })}
                />
                <Label htmlFor="premium">Recette premium</Label>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCloseDialog}>
                Annuler
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
              >
                {editingMeal ? "Mettre à jour" : "Créer"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {meals.length === 0 ? (
          <div className="text-center py-8">
            <ChefHat className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Aucune recette disponible</p>
            <p className="text-xs text-gray-500">Cliquez sur "Ajouter une recette" pour commencer</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Recette</TableHead>
                  <TableHead>Viandes</TableHead>
                  <TableHead>Légumes</TableHead>
                  <TableHead>Glucides</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Premium</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meals.map((meal) => (
                  <TableRow key={meal.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{meal.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">{meal.description}</div>
                        {meal.badge && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mt-1">
                            {meal.badge}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{meal.meat}</TableCell>
                    <TableCell className="text-sm">{meal.vegetables}</TableCell>
                    <TableCell className="text-sm">{meal.carbs}</TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${getCategoryColor(meal.category)}`}>
                        {meal.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      {meal.premium ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800">
                          Premium
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">Standard</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleOpenDialog(meal)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(meal.id)}
                          className="text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeManager;