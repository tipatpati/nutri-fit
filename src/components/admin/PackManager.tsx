import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface MealPack {
  id: string;
  name: string;
  description: string;
  meals_quantity: number;
  price_per_meal: number;
  total_price: number;
  features: string[] | null;
  active: boolean;
  promoted: boolean;
  display_order: number;
}

interface PackFormData {
  name: string;
  description: string;
  meals_quantity: number;
  price_per_meal: number;
  features: string;
  promoted: boolean;
  active: boolean;
  display_order: number;
}

const defaultFormData: PackFormData = {
  name: '',
  description: '',
  meals_quantity: 4,
  price_per_meal: 12.99,
  features: '',
  promoted: false,
  active: true,
  display_order: 0,
};

export const PackManager = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPack, setEditingPack] = useState<MealPack | null>(null);
  const [formData, setFormData] = useState<PackFormData>(defaultFormData);

  // Fetch packs
  const { data: packs, isLoading } = useQuery({
    queryKey: ['meal-packs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as MealPack[];
    },
  });

  // Create pack mutation
  const createPackMutation = useMutation({
    mutationFn: async (data: PackFormData) => {
      const features = data.features
        .split('\n')
        .filter((f) => f.trim())
        .map((f) => f.trim());

      const totalPrice = data.meals_quantity * data.price_per_meal;

      const { error } = await supabase.from('subscription_plans').insert([{
        name: data.name,
        description: data.description,
        meals_quantity: data.meals_quantity,
        price_per_meal: data.price_per_meal,
        total_price: totalPrice,
        features: features.length > 0 ? features : null,
        promoted: data.promoted,
        active: data.active,
        display_order: data.display_order,
        delivery_frequency: 'one_time',
      }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-packs'] });
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
      toast({ title: 'Pack créé avec succès' });
      setIsDialogOpen(false);
      setFormData(defaultFormData);
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update pack mutation
  const updatePackMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PackFormData }) => {
      const features = data.features
        .split('\n')
        .filter((f) => f.trim())
        .map((f) => f.trim());

      const { error } = await supabase
        .from('subscription_plans')
        .update({
          name: data.name,
          description: data.description,
          meals_quantity: data.meals_quantity,
          price_per_meal: data.price_per_meal,
          features,
          promoted: data.promoted,
          active: data.active,
          display_order: data.display_order,
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-packs'] });
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
      toast({ title: 'Pack modifié avec succès' });
      setIsDialogOpen(false);
      setEditingPack(null);
      setFormData(defaultFormData);
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete pack mutation
  const deletePackMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('subscription_plans')
        .update({ active: false })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-packs'] });
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
      toast({ title: 'Pack désactivé avec succès' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPack) {
      updatePackMutation.mutate({ id: editingPack.id, data: formData });
    } else {
      createPackMutation.mutate(formData);
    }
  };

  const handleEdit = (pack: MealPack) => {
    setEditingPack(pack);
    setFormData({
      name: pack.name,
      description: pack.description,
      meals_quantity: pack.meals_quantity,
      price_per_meal: pack.price_per_meal,
      features: pack.features?.join('\n') || '',
      promoted: pack.promoted,
      active: pack.active,
      display_order: pack.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir désactiver ce pack?')) {
      deletePackMutation.mutate(id);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingPack(null);
    setFormData(defaultFormData);
  };

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  const totalPrice = formData.meals_quantity * formData.price_per_meal;

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h2 className="font-['Space_Grotesk'] text-4xl font-bold text-[#2B3210] mb-2">
            Gestion des Packs
          </h2>
          <p className="text-[#505631] text-lg">
            Créez et gérez vos formules d'abonnement
          </p>
        </div>
        <Button 
          onClick={() => {
            setFormData(defaultFormData);
            setIsDialogOpen(true);
          }}
          className="bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white px-8 py-6 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-semibold"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau Pack
        </Button>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-strong max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-[#DE6E27]/30 shadow-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPack ? 'Modifier le Pack' : 'Créer un Nouveau Pack'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du Pack *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="glass-strong border-2 border-[#E5E2D9] focus:border-[#DE6E27] rounded-xl transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={3}
                  className="glass-strong border-2 border-[#E5E2D9] focus:border-[#DE6E27] rounded-xl transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meals_quantity">Nombre de Repas *</Label>
                  <Input
                    id="meals_quantity"
                    type="number"
                    min="1"
                    value={formData.meals_quantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        meals_quantity: parseInt(e.target.value) || 0,
                      })
                    }
                    required
                    className="glass-strong border-2 border-[#E5E2D9] focus:border-[#DE6E27] rounded-xl transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price_per_meal">Prix par Repas (DA) *</Label>
                  <Input
                    id="price_per_meal"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price_per_meal}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price_per_meal: parseFloat(e.target.value) || 0,
                      })
                    }
                    required
                    className="glass-strong border-2 border-[#E5E2D9] focus:border-[#DE6E27] rounded-xl transition-all duration-300"
                  />
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Prix Total du Pack
                </p>
                <p className="text-2xl font-bold">{totalPrice.toFixed(2)} DA</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">
                  Caractéristiques (une par ligne)
                </Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  rows={4}
                  placeholder="Livraison gratuite&#10;Repas équilibrés&#10;Sans engagement"
                  className="glass-strong border-2 border-[#E5E2D9] focus:border-[#DE6E27] rounded-xl transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_order">Ordre d'affichage</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      display_order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="glass-strong border-2 border-[#E5E2D9] focus:border-[#DE6E27] rounded-xl transition-all duration-300"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="promoted"
                    checked={formData.promoted}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, promoted: checked })
                    }
                  />
                  <Label htmlFor="promoted">Pack Mis en Avant</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, active: checked })
                    }
                  />
                  <Label htmlFor="active">Actif</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDialogClose}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  {editingPack ? 'Modifier' : 'Créer'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

      <Card className="glass-strong rounded-3xl overflow-hidden shadow-xl border-2 border-[#DE6E27]/20">
        <CardHeader className="bg-gradient-to-br from-[#DE6E27]/10 to-[#ff8040]/10 border-b border-[#DE6E27]/20">
          <CardTitle className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210]">
            Packs Existants
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#E5E2D9]/50 hover:bg-[#E5E2D9]/50">
                  <TableHead className="font-bold text-[#2B3210]">Nom</TableHead>
                  <TableHead className="font-bold text-[#2B3210]">Repas</TableHead>
                  <TableHead className="font-bold text-[#2B3210]">Prix/Repas</TableHead>
                  <TableHead className="font-bold text-[#2B3210]">Prix Total</TableHead>
                  <TableHead className="font-bold text-[#2B3210]">Statut</TableHead>
                  <TableHead className="font-bold text-[#2B3210]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packs?.map((pack, idx) => (
                  <motion.tr
                    key={pack.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-[#DE6E27]/5 transition-colors duration-200 border-b border-[#E5E2D9]"
                  >
                    <TableCell className="font-semibold text-[#2B3210]">
                      <div className="flex items-center gap-2">
                        {pack.name}
                        {pack.promoted && (
                          <Badge className="bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white border-0">
                            ⭐ Populaire
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="glass border-2 border-[#2B3210] text-[#2B3210] font-bold">
                        {pack.meals_quantity} repas
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-[#505631]">
                      {pack.price_per_meal.toFixed(2)} DA
                    </TableCell>
                    <TableCell>
                      <span className="font-['Space_Grotesk'] text-xl font-bold text-[#DE6E27]">
                        {pack.total_price.toFixed(2)} DA
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {pack.active ? (
                          <Badge className="bg-success/20 text-success border-success font-bold">
                            ✓ Actif
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[#505631]">
                            Inactif
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(pack)}
                          className="hover:bg-[#DE6E27]/10 hover:border-[#DE6E27]"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(pack.id)}
                          className="hover:bg-error/10 hover:border-error text-error"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
