import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface MealPack {
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

export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ["subscription-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscription_plans")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as MealPack[];
    },
  });
};
