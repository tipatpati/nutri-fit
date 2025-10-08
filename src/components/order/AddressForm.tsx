
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
    <Card className="md-elevation-2 bg-md-surface-container border-md-outline-variant border">
      <CardContent className="p-md-5 sm:p-md-6">
        <div className="flex items-center mb-md-5 sm:mb-md-6">
          <MapPin className="w-5 h-5 text-md-primary mr-md-2" />
          <h3 className="md-title-large text-md-on-surface">
            Adresse de livraison
          </h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-md-4">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="md-body-medium text-md-on-surface">Adresse complète</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Rue de la République"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md-body-medium text-md-on-surface">Ville</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Paris"
                        {...field}
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
                    <FormLabel className="md-body-medium text-md-on-surface">Code postal</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="75001"
                        {...field}
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
                  <FormLabel className="md-body-medium text-md-on-surface">Pays</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="France"
                      {...field}
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
                  <FormLabel className="md-body-medium text-md-on-surface">Instructions de livraison (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Exemple: Sonnez au portail, appartement au 2ème étage..."
                      {...field}
                      className="min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="filled"
              size="lg"
              type="submit"
              className="w-full"
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
