
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { addressSchema, type AddressFormData } from '@/shared/validation';

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
    <Card className="md-elevation-2 bg-md-surface border-md-outline">
      <CardContent className="p-md-4 sm:p-md-6">
        <div className="flex items-center mb-md-4 sm:mb-md-6">
          <MapPin className="w-5 h-5 text-md-primary mr-md-2" />
          <h3 className="md-title-large text-md-on-surface">
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
                      className="bg-md-surface border-md-outline focus:border-md-primary"
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
                        className="bg-md-surface border-md-outline focus:border-md-primary"
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
                        className="bg-md-surface border-md-outline focus:border-md-primary"
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
                      className="bg-md-surface border-md-outline focus:border-md-primary"
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
                      className="bg-md-surface border-md-outline focus:border-md-primary min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-md-primary text-md-on-primary hover:bg-md-primary/90 py-md-3 rounded-md-lg font-semibold md-elevation-2 hover:md-elevation-3 transition-all duration-md-medium2"
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
