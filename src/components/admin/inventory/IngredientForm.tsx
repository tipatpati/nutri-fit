import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Ingredient } from '@/hooks/useIngredients';

const ingredientSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  type: z.string().min(1, 'Le type est requis'),
  primary_nutrient: z.enum(['protein', 'carbs', 'vegetables', 'fat', 'condiment']),
  unit_of_measurement: z.string().default('g'),
  current_stock: z.coerce.number().min(0, 'Le stock doit être positif'),
  reorder_point: z.coerce.number().min(0, 'Le seuil doit être positif'),
  minimum_stock: z.coerce.number().min(0, 'Le stock minimum doit être positif'),
  cost_per_unit: z.coerce.number().optional(),
  nutritional_info: z.object({
    calories: z.coerce.number().min(0),
    protein: z.coerce.number().min(0),
    carbs: z.coerce.number().min(0),
    fat: z.coerce.number().min(0),
    fiber: z.coerce.number().optional(),
    sugar: z.coerce.number().optional(),
    sodium: z.coerce.number().optional(),
  }).optional(),
});

type IngredientFormValues = z.infer<typeof ingredientSchema>;

interface IngredientFormProps {
  ingredient?: Ingredient;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function IngredientForm({ ingredient, onSubmit, onCancel }: IngredientFormProps) {
  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: ingredient ? {
      name: ingredient.name,
      type: ingredient.type,
      primary_nutrient: ingredient.primary_nutrient,
      unit_of_measurement: ingredient.unit_of_measurement,
      current_stock: ingredient.current_stock,
      reorder_point: ingredient.reorder_point,
      minimum_stock: ingredient.minimum_stock,
      cost_per_unit: ingredient.cost_per_unit,
      nutritional_info: ingredient.nutritional_info || undefined,
    } : {
      name: '',
      type: '',
      primary_nutrient: 'condiment' as const,
      unit_of_measurement: 'g',
      current_stock: 0,
      reorder_point: 10,
      minimum_stock: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'ingrédient" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="viande, légume, céréale..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="primary_nutrient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nutriment principal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="protein">Protéines</SelectItem>
                    <SelectItem value="carbs">Glucides</SelectItem>
                    <SelectItem value="vegetables">Légumes</SelectItem>
                    <SelectItem value="fat">Lipides</SelectItem>
                    <SelectItem value="condiment">Condiment</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="current_stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock actuel</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit_of_measurement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unité</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="g">Grammes (g)</SelectItem>
                    <SelectItem value="kg">Kilogrammes (kg)</SelectItem>
                    <SelectItem value="ml">Millilitres (ml)</SelectItem>
                    <SelectItem value="l">Litres (l)</SelectItem>
                    <SelectItem value="unit">Unité</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="minimum_stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock minimum</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reorder_point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seuil de réappro</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cost_per_unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coût unitaire (DZD)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">Informations nutritionnelles (pour 100g/ml)</h4>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="nutritional_info.calories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calories</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nutritional_info.protein"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Protéines (g)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nutritional_info.carbs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Glucides (g)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nutritional_info.fat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lipides (g)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nutritional_info.fiber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fibres (g)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nutritional_info.sugar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sucres (g)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {ingredient ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
