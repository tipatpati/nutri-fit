import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCookOrders = (date: string) => {
  return useQuery({
    queryKey: ['cook-orders', date],
    queryFn: async () => {
      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(
            *,
            meal_id,
            quantity,
            meals(
              id,
              name,
              category,
              image_url,
              meal_ingredients(
                quantity,
                ingredients(
                  id,
                  name,
                  unit_of_measurement,
                  current_stock,
                  minimum_stock
                )
              )
            )
          ),
          addresses(
            street_address,
            city,
            postal_code
          ),
          profiles(
            first_name,
            last_name
          )
        `)
        .eq('delivery_date', date)
        .in('status', ['confirmed', 'preparing', 'ready']);

      if (error) throw error;

      // Calculate meal statistics
      const mealStats = new Map();
      orders?.forEach(order => {
        order.order_items?.forEach((item: any) => {
          const mealId = item.meal_id;
          const meal = item.meals;
          if (!meal) return;

          if (!mealStats.has(mealId)) {
            mealStats.set(mealId, {
              id: mealId,
              name: meal.name,
              category: meal.category,
              image: meal.image_url,
              totalOrders: 0,
              prepared: order.status === 'ready' ? item.quantity : 0,
              remaining: order.status !== 'ready' ? item.quantity : 0,
            });
          } else {
            const stats = mealStats.get(mealId);
            stats.totalOrders += item.quantity;
            if (order.status === 'ready') {
              stats.prepared += item.quantity;
            } else {
              stats.remaining += item.quantity;
            }
          }
        });
      });

      // Calculate ingredient requirements
      const ingredientReqs = new Map();
      orders?.forEach(order => {
        order.order_items?.forEach((item: any) => {
          const meal = item.meals;
          if (!meal?.meal_ingredients) return;

          meal.meal_ingredients.forEach((mi: any) => {
            const ingredient = mi.ingredients;
            if (!ingredient) return;

            const key = ingredient.id;
            if (!ingredientReqs.has(key)) {
              ingredientReqs.set(key, {
                id: ingredient.id,
                name: ingredient.name,
                required: 0,
                available: ingredient.current_stock || 0,
                unit: ingredient.unit_of_measurement,
              });
            }
            const req = ingredientReqs.get(key);
            const quantityNeeded = parseFloat(mi.quantity || '0') * item.quantity;
            req.required += quantityNeeded;
          });
        });
      });

      const ingredientRequirements = Array.from(ingredientReqs.values()).map(ing => ({
        ...ing,
        status: ing.available >= ing.required ? 'OK' : 'Manque',
      }));

      return {
        orders: orders || [],
        mealStats: Array.from(mealStats.values()),
        ingredientRequirements,
        totalOrders: orders?.length || 0,
        confirmedCount: orders?.filter(o => o.status === 'confirmed').length || 0,
        preparingCount: orders?.filter(o => o.status === 'preparing').length || 0,
        readyCount: orders?.filter(o => o.status === 'ready').length || 0,
      };
    },
  });
};
