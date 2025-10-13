
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
  onBack: () => void;
  onConfirm: () => void;
}

const OrderSummary = ({ selectedMeals, onBack, onConfirm }: OrderSummaryProps) => {
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

  const totalMeals = selectedMeals.reduce((total, meal) => total + meal.quantity, 0);
  const totalPrice = selectedMeals.reduce((total, meal) => {
    const basePrice = meal.premium ? 15.99 : 12.99;
    return total + (basePrice * meal.quantity);
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
    if (!user) {
      toast({
        title: 'Erreur',
        description: 'Vous devez être connecté pour passer commande',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

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
      price: meal.premium ? 15.99 : 12.99,
    }));

    submitOrder(
      {
        items,
        address: deliveryAddress,
        userId: user.id,
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
        <div className="lg:col-span-2 space-y-md-4 sm:space-y-md-5">
          {Object.entries(mealsByDate).map(([date, meals]) => (
            <Card key={date} className="overflow-hidden bg-md-surface-container border-md-outline-variant border md-elevation-1">
              <CardContent className="p-md-4 sm:p-md-6">
                <div className="flex items-center mb-md-4">
                  <Calendar className="w-5 h-5 text-md-primary mr-md-2" />
                  <h3 className="md-title-large text-md-on-surface capitalize">
                    {formatDate(date)}
                  </h3>
                </div>
                
                <div className="space-y-md-3">
                  {meals.map((meal) => (
                    <div key={`${meal.id}-${date}`} className="flex items-center gap-md-3 sm:gap-md-4 p-md-3 sm:p-md-4 bg-md-surface rounded-md-md border border-md-outline-variant">
                      <img 
                        src={meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'} 
                        alt={meal.name}
                        className="w-14 h-14 sm:w-18 sm:h-18 object-cover rounded-md-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="md-title-medium text-md-on-surface line-clamp-1">
                          {meal.name}
                        </h4>
                        <div className="flex items-center gap-md-2 mt-md-1">
                          <span className="md-body-small text-md-on-surface-variant">
                            Quantité: {meal.quantity}
                          </span>
                          {meal.premium && (
                            <span className="bg-md-tertiary-container text-md-on-tertiary-container px-md-2 py-md-1 rounded-full md-label-small font-medium">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="md-title-medium font-bold text-md-on-surface">
                          {((meal.premium ? 15.99 : 12.99) * meal.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                  <p>{deliveryAddress.street}</p>
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
          <Card className="sticky top-24 bg-md-surface-container border-md-outline-variant border md-elevation-2">
            <CardContent className="p-md-5 sm:p-md-6">
              <div className="flex items-center mb-md-5 sm:mb-md-6">
                <ShoppingBag className="w-5 h-5 text-md-primary mr-md-2" />
                <h3 className="md-title-large text-md-on-surface">
                  Total
                </h3>
              </div>
              
              <div className="space-y-md-3 sm:space-y-md-4 mb-md-6">
                <div className="flex justify-between items-center py-md-2 border-b border-md-outline-variant">
                  <span className="md-body-medium text-md-on-surface-variant">Nombre de repas</span>
                  <span className="md-body-medium font-semibold text-md-on-surface">{totalMeals}</span>
                </div>
                
                <div className="flex justify-between items-center py-md-2 border-b border-md-outline-variant">
                  <span className="md-body-medium text-md-on-surface-variant">Sous-total</span>
                  <span className="md-body-medium font-semibold text-md-on-surface">{totalPrice.toFixed(2)}€</span>
                </div>
                
                <div className="flex justify-between items-center py-md-2 border-b border-md-outline-variant">
                  <span className="md-body-medium text-md-on-surface-variant">Livraison</span>
                  <span className="md-body-medium font-semibold text-md-primary">Gratuite</span>
                </div>
                
                <div className="flex justify-between items-center py-md-4 bg-md-primary-container rounded-md-md px-md-4">
                  <span className="md-title-medium font-bold text-md-on-primary-container">Total</span>
                  <span className="md-title-large font-bold text-md-on-primary-container">{totalPrice.toFixed(2)}€</span>
                </div>
              </div>

              <div className="space-y-md-3">
                {!deliveryAddress ? (
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
