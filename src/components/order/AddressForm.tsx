
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MapPin } from 'lucide-react';

const addressSchema = z.object({
  street: z.string().min(1, 'L\'adresse est requise'),
  city: z.string().min(1, 'La ville est requise'),
  postalCode: z.string().min(5, 'Le code postal doit contenir au moins 5 caractères'),
  country: z.string().min(1, 'Le pays est requis'),
  instructions: z.string().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  defaultValues?: Partial<AddressFormData>;
}

const AddressForm = ({ onSubmit, defaultValues }: AddressFormProps) => {
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: defaultValues?.street || '',
      city: defaultValues?.city || '',
      postalCode: defaultValues?.postalCode || '',
      country: defaultValues?.country || 'France',
      instructions: defaultValues?.instructions || '',
    },
  });

  return (
    <Card className="shadow-lg bg-white/90 backdrop-blur-sm border-0">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center mb-4 sm:mb-6">
          <MapPin className="w-5 h-5 text-emerald-600 mr-2" />
          <h3 className="text-base sm:text-lg font-semibold text-slate-800">
            Adresse de livraison
          </h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse complète</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Rue de la République"
                      {...field}
                      className="bg-white border-gray-300 focus:border-emerald-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Paris"
                        {...field}
                        className="bg-white border-gray-300 focus:border-emerald-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code postal</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="75001"
                        {...field}
                        className="bg-white border-gray-300 focus:border-emerald-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pays</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="France"
                      {...field}
                      className="bg-white border-gray-300 focus:border-emerald-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions de livraison (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Exemple: Sonnez au portail, appartement au 2ème étage..."
                      {...field}
                      className="bg-white border-gray-300 focus:border-emerald-500 min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Confirmer l'adresse
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
