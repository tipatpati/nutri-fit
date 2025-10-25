import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { AddressFormData } from '@/shared/validation';
import { useAuthStore } from '@/shared/stores/useAuthStore';

interface OrderItem {
  mealId: string;
  mealName: string;
  quantity: number;
  date: string;
  price: number;
}

interface OrderSubmissionData {
  items: OrderItem[];
  address: AddressFormData;
  userId?: string;
}

export const useOrderSubmission = () => {
  const queryClient = useQueryClient();
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: async ({ items, address, userId }: OrderSubmissionData) => {
      let finalUserId = userId;

      // Auto-create account if user is not authenticated
      if (!finalUserId) {
        const tempPassword = Math.random().toString(36).slice(-8) + 'Aa1!';
        
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: address.email,
          password: tempPassword,
          options: {
            data: {
              first_name: address.firstName,
              last_name: address.lastName,
            },
            emailRedirectTo: `${window.location.origin}/`,
          }
        });

        if (signUpError) {
          // If account exists, try to sign in or use existing session
          if (signUpError.message.includes('already registered')) {
            throw new Error('Un compte existe déjà avec cet email. Veuillez vous connecter.');
          }
          throw signUpError;
        }

        if (signUpData.user) {
          finalUserId = signUpData.user.id;
          if (signUpData.session) {
            setSession(signUpData.session);
          }
        } else {
          throw new Error('Impossible de créer le compte');
        }
      }
      // Group items by delivery date
      const itemsByDate = items.reduce((acc, item) => {
        if (!acc[item.date]) acc[item.date] = [];
        acc[item.date].push(item);
        return acc;
      }, {} as Record<string, OrderItem[]>);

      const orderIds: string[] = [];

      // Create orders for each delivery date
      for (const [deliveryDate, dateItems] of Object.entries(itemsByDate)) {
        const subtotal = dateItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = 0; // Free delivery
        const totalAmount = subtotal + deliveryFee;

        // Create address record
        const { data: addressData, error: addressError } = await supabase
          .from('addresses')
          .insert({
            user_id: finalUserId,
            label: 'Delivery Address',
            street_address: address.street,
            city: address.city,
            postal_code: address.postalCode,
            country: address.country,
            delivery_instructions: address.instructions || null,
            is_default: false,
          })
          .select()
          .single();

        if (addressError) throw addressError;

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Create order
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: finalUserId,
            order_number: orderNumber,
            status: 'confirmed',
            order_type: 'one_time',
            subtotal,
            delivery_fee: deliveryFee,
            tax_amount: 0,
            discount_amount: 0,
            total_amount: totalAmount,
            delivery_address_id: addressData.id,
            delivery_date: deliveryDate,
            delivery_instructions: address.instructions || null,
          })
          .select()
          .single();

        if (orderError) throw orderError;
        orderIds.push(order.id);

        // Create order items
        const orderItemsData = dateItems.map(item => ({
          order_id: order.id,
          meal_id: item.mealId,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItemsData);

        if (itemsError) throw itemsError;
      }

      return { orderIds };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-orders'] });
      queryClient.invalidateQueries({ queryKey: ['kitchen-capacity'] });
      toast({
        title: 'Commande confirmée',
        description: 'Votre commande a été enregistrée avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer la commande: ' + error.message,
        variant: 'destructive',
      });
    },
  });
};
