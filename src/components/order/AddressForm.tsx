
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
import { MapPin, ArrowRight } from 'lucide-react';
import { addressSchema, type AddressFormData } from '@/shared/validation';
import { motion } from 'framer-motion';

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
    <Card className="glass-strong shadow-2xl border-2 border-[#DE6E27]/20">
      <CardContent className="p-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MapPin className="w-6 h-6 text-[#DE6E27] mr-3" />
          </motion.div>
          <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210]">
            Adresse de livraison
          </h3>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#2B3210] font-semibold">
                      Adresse complète
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="glass border-2 border-[#E5E2D9] focus:border-[#DE6E27] transition-colors duration-300"
                        placeholder="123 Rue de la République"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2B3210] font-semibold">Ville</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="glass border-2 border-[#E5E2D9] focus:border-[#DE6E27] transition-colors duration-300"
                          placeholder="Paris"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2B3210] font-semibold">Code postal</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="glass border-2 border-[#E5E2D9] focus:border-[#DE6E27] transition-colors duration-300"
                          placeholder="75001"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#2B3210] font-semibold">Pays</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="glass border-2 border-[#E5E2D9] focus:border-[#DE6E27] transition-colors duration-300"
                        placeholder="France"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#2B3210] font-semibold">
                      Instructions de livraison (optionnel)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="glass border-2 border-[#E5E2D9] focus:border-[#DE6E27] transition-colors duration-300 min-h-[80px]"
                        placeholder="Exemple: Sonnez au portail, appartement au 2ème étage..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full py-6 text-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold"
              >
                Confirmer l'adresse
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
