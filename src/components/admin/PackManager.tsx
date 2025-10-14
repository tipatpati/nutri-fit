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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Packs Repas</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setFormData(defaultFormData)}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Pack
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price_per_meal">Prix par Repas (€) *</Label>
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
                  />
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Prix Total du Pack
                </p>
                <p className="text-2xl font-bold">{totalPrice.toFixed(2)} €</p>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Packs Existants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Repas</TableHead>
                <TableHead>Prix/Repas</TableHead>
                <TableHead>Prix Total</TableHead>
                <TableHead>Actif</TableHead>
                <TableHead>Mis en Avant</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packs?.map((pack) => (
                <TableRow key={pack.id}>
                  <TableCell className="font-medium">{pack.name}</TableCell>
                  <TableCell>{pack.meals_quantity}</TableCell>
                  <TableCell>{pack.price_per_meal.toFixed(2)} €</TableCell>
                  <TableCell className="font-bold">
                    {pack.total_price.toFixed(2)} €
                  </TableCell>
                  <TableCell>
                    {pack.active ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {pack.promoted ? (
                      <span className="text-yellow-600">★</span>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(pack)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(pack.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
