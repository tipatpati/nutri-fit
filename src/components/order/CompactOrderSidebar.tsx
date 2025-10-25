import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Package, ShoppingCart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddressForm from "./AddressForm";
import { AddressFormData } from "@/shared/validation/addressSchema";
import { useOrderSubmission } from "@/hooks/useOrderSubmission";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface SelectedMeal {
  id: string;
  name: string;
  image_url: string;
  category: string;
  premium: boolean;
  date: string;
  quantity: number;
}

interface CompactOrderSidebarProps {
  selectedMeals: SelectedMeal[];
  onRemoveMeal: (mealId: string) => void;
  totalPrice: number;
  selectedPackId: string | null;
}

const CompactOrderSidebar = ({ 
  selectedMeals, 
  onRemoveMeal,
  totalPrice,
  selectedPackId
}: CompactOrderSidebarProps) => {
  const [deliveryAddress, setDeliveryAddress] = useState<AddressFormData | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const submitOrder = useOrderSubmission();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalMeals = selectedMeals.reduce((sum, meal) => sum + meal.quantity, 0);

  const handleAddressSubmit = (data: AddressFormData) => {
    setDeliveryAddress(data);
  };

  const handleConfirmOrder = async () => {
    if (!deliveryAddress || !deliveryDate || !selectedPackId) {
      return;
    }

    const basePrice = 800;
    const orderItems = selectedMeals.map(meal => ({
      mealId: meal.id,
      mealName: meal.name,
      quantity: meal.quantity,
      date: deliveryDate.toISOString().split('T')[0],
      price: meal.premium ? 1200 : basePrice
    }));

    submitOrder.mutate(
      {
        items: orderItems,
        address: deliveryAddress,
        userId: user?.id,
        packId: selectedPackId
      },
      {
        onSuccess: () => {
          navigate('/orders');
        }
      }
    );
  };

  const canConfirm = deliveryAddress && deliveryDate && totalMeals > 0 && selectedPackId;

  return (
    <div className="space-y-4">
      {/* Order Summary Card */}
      <Card className="glass-strong p-6 border-2 border-[#DE6E27]/20">
        <div className="flex items-center gap-3 mb-4">
          <ShoppingCart className="w-6 h-6 text-[#DE6E27]" />
          <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210]">
            Votre commande
          </h3>
        </div>

        {/* Selected Meals */}
        <AnimatePresence mode="popLayout">
          {totalMeals === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-[#505631]"
            >
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Aucun repas sélectionné</p>
            </motion.div>
          ) : (
            <div className="space-y-2 max-h-[200px] overflow-y-auto mb-4">
              {selectedMeals.map(meal => (
                <motion.div
                  key={meal.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between gap-2 p-3 rounded-lg glass hover:bg-[#E5E2D9] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#2B3210] text-sm truncate">
                      {meal.name}
                    </p>
                    <p className="text-xs text-[#505631]">Quantité: {meal.quantity}</p>
                  </div>
                  <button
                    onClick={() => onRemoveMeal(meal.id)}
                    className="p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Total */}
        <div className="border-t-2 border-[#E5E2D9] pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#505631]">Total repas:</span>
            <span className="font-bold text-[#2B3210]">{totalMeals}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-[#2B3210]">Total:</span>
            <span className="text-2xl font-bold text-[#DE6E27]">
              {totalPrice.toFixed(2)} DZD
            </span>
          </div>
        </div>
      </Card>

      {/* Delivery Date Picker */}
      {totalMeals > 0 && (
        <Card className="glass-strong p-6 border-2 border-[#DE6E27]/20">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-[#DE6E27]" />
            <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#2B3210]">
              Date de livraison
            </h4>
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !deliveryDate && "text-[#505631]"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {deliveryDate ? (
                  format(deliveryDate, "PPP", { locale: fr })
                ) : (
                  <span>Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={deliveryDate}
                onSelect={setDeliveryDate}
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() + 3))}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </Card>
      )}

      {/* Address Form */}
      {totalMeals > 0 && deliveryDate && (
        <Card className="glass-strong p-6 border-2 border-[#DE6E27]/20">
          <AddressForm 
            onSubmit={handleAddressSubmit}
            defaultValues={deliveryAddress || undefined}
          />
        </Card>
      )}

      {/* Confirm Button */}
      {totalMeals > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onClick={handleConfirmOrder}
            disabled={!canConfirm || submitOrder.isPending}
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-[#DE6E27] to-[#ff8040] hover:shadow-2xl transition-all duration-300"
          >
            {submitOrder.isPending ? "Traitement..." : "Confirmer la commande"}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default CompactOrderSidebar;
