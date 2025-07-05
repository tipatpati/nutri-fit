
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, ShoppingBag, CreditCard } from "lucide-react";
import AddressForm, { AddressFormData } from "./AddressForm";

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
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<AddressFormData | null>(null);

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
    console.log('Order confirmed with address:', deliveryAddress);
    onConfirm();
  };

  if (showAddressForm) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-slate-800">
            Adresse de livraison
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Veuillez renseigner votre adresse de livraison
          </p>
        </div>

        <AddressForm
          onSubmit={handleAddressSubmit}
          defaultValues={deliveryAddress || undefined}
        />

        <Button
          variant="outline"
          onClick={() => setShowAddressForm(false)}
          className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au résumé
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-slate-800">
          Résumé de votre commande
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Vérifiez votre sélection avant de confirmer
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {Object.entries(mealsByDate).map(([date, meals]) => (
            <Card key={date} className="overflow-hidden shadow-lg bg-white/90 backdrop-blur-sm border-0">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-emerald-600 mr-2" />
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                    {formatDate(date)}
                  </h3>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {meals.map((meal) => (
                    <div key={`${meal.id}-${date}`} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                      <img 
                        src={meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'} 
                        alt={meal.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-800 text-sm sm:text-base line-clamp-1">
                          {meal.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs sm:text-sm text-gray-600">
                            Quantité: {meal.quantity}
                          </span>
                          {meal.premium && (
                            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-800 text-sm sm:text-base">
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
            <Card className="overflow-hidden shadow-lg bg-white/90 backdrop-blur-sm border-0">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                    Adresse de livraison
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddressForm(true)}
                    className="text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                  >
                    Modifier
                  </Button>
                </div>
                <div className="text-sm sm:text-base text-gray-700 space-y-1">
                  <p>{deliveryAddress.street}</p>
                  <p>{deliveryAddress.postalCode} {deliveryAddress.city}</p>
                  <p>{deliveryAddress.country}</p>
                  {deliveryAddress.instructions && (
                    <p className="mt-2 text-gray-600 italic">
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
          <Card className="sticky top-24 shadow-lg bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center mb-4 sm:mb-6">
                <ShoppingBag className="w-5 h-5 text-emerald-600 mr-2" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                  Total de la commande
                </h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm sm:text-base text-gray-600">Nombre de repas</span>
                  <span className="font-medium text-slate-800">{totalMeals}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm sm:text-base text-gray-600">Sous-total</span>
                  <span className="font-medium text-slate-800">{totalPrice.toFixed(2)}€</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm sm:text-base text-gray-600">Livraison</span>
                  <span className="font-medium text-green-600">Gratuite</span>
                </div>
                
                <div className="flex justify-between items-center py-3 sm:py-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl px-3 sm:px-4">
                  <span className="text-base sm:text-lg font-semibold text-slate-800">Total</span>
                  <span className="text-lg sm:text-xl font-bold text-emerald-700">{totalPrice.toFixed(2)}€</span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {!deliveryAddress ? (
                  <Button
                    onClick={() => setShowAddressForm(true)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Ajouter une adresse
                  </Button>
                ) : (
                  <Button
                    onClick={handleFinalConfirm}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Confirmer la commande
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-semibold"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Modifier la sélection
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
