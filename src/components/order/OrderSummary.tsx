
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, ShoppingBag, CreditCard } from "lucide-react";
import AddressForm from "./AddressForm";
import { type AddressFormData } from "@/shared/validation";
import { useOrderSubmission } from "@/hooks/useOrderSubmission";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { useCartStore } from "@/shared/stores/useCartStore";
import { toast } from "@/hooks/use-toast";
import { MealPack } from "@/hooks/useSubscriptionPlans";
import { motion } from "framer-motion";

interface SelectedMeal {
  id: string;
  name: string;
  image_url: string;
  category: string;
  premium: boolean;
  date: string;
  quantity: number;
}

interface OrderSummaryProps {
  selectedMeals: SelectedMeal[];
  selectedPackage: MealPack | null;
  onBack: () => void;
  onConfirm: () => void;
}

const OrderSummary = ({ selectedMeals, selectedPackage, onBack, onConfirm }: OrderSummaryProps) => {
  const navigate = useNavigate();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<AddressFormData | null>(null);
  const { user } = useAuthStore();
  const clearCart = useCartStore((state) => state.clearCart);
  const { mutate: submitOrder, isPending } = useOrderSubmission();

  // Group meals by date
  const mealsByDate = selectedMeals.reduce((acc, meal) => {
    if (!acc[meal.date]) {
      acc[meal.date] = [];
    }
    acc[meal.date].push(meal);
    return acc;
  }, {} as Record<string, SelectedMeal[]>);

  const pricePerMeal = selectedPackage?.price_per_meal || 12.99;
  const totalMeals = selectedMeals.reduce((total, meal) => total + meal.quantity, 0);
  const totalPrice = selectedMeals.reduce((total, meal) => {
    return total + (pricePerMeal * meal.quantity);
  }, 0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleAddressSubmit = (addressData: AddressFormData) => {
    setDeliveryAddress(addressData);
    setShowAddressForm(false);
  };

  const handleFinalConfirm = () => {
    if (!deliveryAddress) {
      toast({
        title: 'Erreur',
        description: 'Veuillez renseigner une adresse de livraison',
        variant: 'destructive',
      });
      return;
    }

    const items = selectedMeals.map(meal => ({
      mealId: meal.id,
      mealName: meal.name,
      quantity: meal.quantity,
      date: meal.date,
      price: pricePerMeal,
    }));

    submitOrder(
      {
        items,
        address: deliveryAddress,
        userId: user?.id,
      },
      {
        onSuccess: () => {
          clearCart();
          onConfirm();
          navigate('/orders');
        },
      }
    );
  };

  if (showAddressForm) {
    return (
      <div className="max-w-2xl mx-auto space-y-md-5">
        <div className="text-center">
          <h2 className="md-headline-medium mb-md-3 text-md-on-surface">
            Adresse de livraison
          </h2>
          <p className="md-body-large text-md-on-surface-variant">
            Veuillez renseigner votre adresse de livraison
          </p>
        </div>

        <AddressForm
          onSubmit={handleAddressSubmit}
          defaultValues={deliveryAddress || undefined}
        />

        <Button
          variant="outlined"
          size="lg"
          onClick={() => setShowAddressForm(false)}
          className="w-full"
        >
          <ArrowLeft className="w-5 h-5 mr-md-2" />
          Retour au résumé
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-md-6 sm:space-y-md-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="md-headline-medium mb-md-3 text-md-on-surface">
          Résumé de votre commande
        </h2>
        <p className="md-body-large text-md-on-surface-variant">
          Vérifiez votre sélection avant de confirmer
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md-5 sm:gap-md-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-5">
          {Object.entries(mealsByDate).map(([date, meals], idx) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="glass-strong overflow-hidden shadow-xl border-2 border-[#DE6E27]/20">
                <CardContent className="p-6">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center mb-4"
                  >
                    <Calendar className="w-6 h-6 text-[#DE6E27] mr-3" />
                    <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210] capitalize">
                      {formatDate(date)}
                    </h3>
                  </motion.div>
                  
                  <div className="space-y-3">
                    {meals.map((meal, mealIdx) => (
                      <motion.div
                        key={`${meal.id}-${date}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: mealIdx * 0.05 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="flex items-center gap-4 p-4 glass rounded-2xl border border-transparent hover:border-[#DE6E27]/30 transition-all duration-300"
                      >
                        <motion.img 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          src={meal.image_url} 
                          alt={meal.name}
                          className="w-20 h-20 object-cover rounded-xl shadow-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#2B3210] line-clamp-1">
                            {meal.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-[#505631]">
                              Quantité: {meal.quantity}
                            </span>
                            {meal.premium && (
                              <span className="bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white px-3 py-1 rounded-full text-xs font-semibold">
                                Premium
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210]">
                            {(pricePerMeal * meal.quantity).toFixed(2)} DA
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Delivery Address Section */}
          {deliveryAddress && (
            <Card className="overflow-hidden bg-md-surface-container border-md-outline-variant border md-elevation-1">
              <CardContent className="p-md-4 sm:p-md-6">
                <div className="flex items-center justify-between mb-md-4">
                  <h3 className="md-title-large text-md-on-surface">
                    Adresse de livraison
                  </h3>
                  <Button
                    variant="outlined"
                    size="sm"
                    onClick={() => setShowAddressForm(true)}
                  >
                    Modifier
                  </Button>
                </div>
                <div className="md-body-medium text-md-on-surface space-y-md-1">
                  <p className="font-semibold">{deliveryAddress.firstName} {deliveryAddress.lastName}</p>
                  <p>{deliveryAddress.email}</p>
                  <p>{deliveryAddress.phone}</p>
                  <p className="mt-2">{deliveryAddress.street}</p>
                  <p>{deliveryAddress.postalCode} {deliveryAddress.city}</p>
                  <p>{deliveryAddress.country}</p>
                  {deliveryAddress.instructions && (
                    <p className="mt-md-2 text-md-on-surface-variant md-body-small">
                      Instructions: {deliveryAddress.instructions}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="glass-strong sticky top-24 shadow-2xl border-2 border-[#DE6E27]/20">
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center mb-6">
                  <ShoppingBag className="w-6 h-6 text-[#DE6E27] mr-3" />
                  <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210]">
                    Total
                  </h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-[#E5E2D9]">
                    <span className="text-[#505631]">Nombre de repas</span>
                    <span className="font-bold text-[#2B3210]">{totalMeals}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-[#E5E2D9]">
                    <span className="text-[#505631]">Sous-total</span>
                    <span className="font-bold text-[#2B3210]">{totalPrice.toFixed(2)} DA</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-[#E5E2D9]">
                    <span className="text-[#505631]">Livraison</span>
                    <span className="font-bold text-[#DE6E27]">Gratuite</span>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex justify-between items-center p-6 glass rounded-2xl bg-gradient-to-br from-[#DE6E27]/10 to-[#ff8040]/10"
                  >
                    <span className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210]">
                      Total
                    </span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="font-['Space_Grotesk'] text-4xl font-bold bg-gradient-to-r from-[#DE6E27] to-[#ff8040] bg-clip-text text-transparent"
                    >
                      {totalPrice.toFixed(2)} DA
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>

              <div className="space-y-3">{!deliveryAddress ? (
                  <Button
                    variant="filled"
                    size="lg"
                    onClick={() => setShowAddressForm(true)}
                    className="w-full"
                  >
                    <CreditCard className="w-5 h-5 mr-md-2" />
                    Ajouter une adresse
                  </Button>
                ) : (
                  <Button
                    variant="filled"
                    size="lg"
                    onClick={handleFinalConfirm}
                    disabled={isPending}
                    className="w-full"
                  >
                    <CreditCard className="w-5 h-5 mr-md-2" />
                    {isPending ? 'Envoi en cours...' : 'Confirmer la commande'}
                  </Button>
                )}
                
                <Button
                  variant="outlined"
                  size="lg"
                  onClick={onBack}
                  className="w-full"
                >
                  <ArrowLeft className="w-5 h-5 mr-md-2" />
                  Modifier
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
