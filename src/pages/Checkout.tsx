import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  MapPin, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  ArrowLeft,
  Truck,
  Shield,
  Clock,
  Package,
  ChevronRight
} from "lucide-react";
import NutriFitNavbar from "@/components/NutriFitNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useOrderSubmission } from "@/hooks/useOrderSubmission";
import { addressFormSchema, AddressFormData } from "@/shared/validation/addressSchema";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format, isSunday } from "date-fns";
import { fr } from "date-fns/locale";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, getCartSummary, clearCart } = useCart();
  const { subtotal, deliveryFee, total } = getCartSummary();
  const { mutate: submitOrder, isPending } = useOrderSubmission();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<'address' | 'delivery' | 'payment'>('address');
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'cash'>('card');

  // Redirect if cart is empty or user not logged in
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      country: "Algérie",
    }
  });

  // Disable Sundays and past dates
  const isDateDisabled = (date: Date) => {
    return date < new Date() || isSunday(date);
  };

  const handleAddressSubmit = (data: AddressFormData) => {
    setCurrentStep('delivery');
  };

  const handleDeliverySubmit = () => {
    if (!deliveryDate) {
      toast({
        title: "Date requise",
        description: "Veuillez sélectionner une date de livraison",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep('payment');
  };

  const handleOrderSubmit = async (addressData: AddressFormData) => {
    if (!deliveryDate) {
      toast({
        title: "Date requise",
        description: "Veuillez sélectionner une date de livraison",
        variant: "destructive",
      });
      return;
    }

    const orderItems = items.map(item => ({
      mealId: item.mealId,
      mealName: item.mealName,
      quantity: item.quantity,
      date: deliveryDate.toISOString().split('T')[0],
      price: item.unitPrice,
    }));

    submitOrder(
      {
        items: orderItems,
        address: addressData,
        userId: user.id,
      },
      {
        onSuccess: () => {
          clearCart();
          navigate('/orders', { 
            state: { 
              orderSuccess: true,
              message: "Votre commande a été confirmée avec succès !" 
            }
          });
        },
      }
    );
  };

  // Watch form data for final submission
  const addressData = watch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9]">
      <NutriFitNavbar />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/cart')}
            className="mb-4 text-[#505631] hover:text-[#2B3210]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au panier
          </Button>
          
          <h1 className="font-['Space_Grotesk'] text-5xl font-bold text-[#2B3210] mb-2">
            Finaliser la commande
          </h1>
          <p className="text-[#505631] text-lg">
            Plus que quelques étapes avant de profiter de vos repas !
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#E5E2D9] -z-10" />
              <div 
                className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] transition-all duration-500 -z-10"
                style={{ 
                  width: currentStep === 'address' ? '0%' : currentStep === 'delivery' ? '50%' : '100%' 
                }}
              />

              {[
                { step: 'address', label: 'Adresse', icon: MapPin },
                { step: 'delivery', label: 'Livraison', icon: Calendar },
                { step: 'payment', label: 'Paiement', icon: CreditCard }
              ].map((item, index) => (
                <div key={item.step} className="flex flex-col items-center relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 mb-2",
                      currentStep === item.step
                        ? "bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white shadow-lg"
                        : index < ['address', 'delivery', 'payment'].indexOf(currentStep)
                        ? "bg-[#DE6E27] text-white"
                        : "glass text-[#505631]"
                    )}
                  >
                    {index < ['address', 'delivery', 'payment'].indexOf(currentStep) ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <item.icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <span className={cn(
                    "text-sm font-semibold font-['DM_Sans']",
                    currentStep === item.step ? "text-[#DE6E27]" : "text-[#505631]"
                  )}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* STEP 1: Address Form */}
              {currentStep === 'address' && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glass shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#2B3210]">
                        <MapPin className="w-6 h-6 text-[#DE6E27]" />
                        Adresse de livraison
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit(handleAddressSubmit)} className="space-y-6">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">Prénom *</Label>
                            <Input
                              id="firstName"
                              {...register('firstName')}
                              className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                              placeholder="Jean"
                            />
                            {errors.firstName && (
                              <p className="text-sm text-error mt-1">{errors.firstName.message}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="lastName">Nom *</Label>
                            <Input
                              id="lastName"
                              {...register('lastName')}
                              className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                              placeholder="Dupont"
                            />
                            {errors.lastName && (
                              <p className="text-sm text-error mt-1">{errors.lastName.message}</p>
                            )}
                          </div>
                        </div>

                        {/* Phone */}
                        <div>
                          <Label htmlFor="phone">Téléphone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            {...register('phone')}
                            className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                            placeholder="+213 555 123 456"
                          />
                          {errors.phone && (
                            <p className="text-sm text-error mt-1">{errors.phone.message}</p>
                          )}
                        </div>

                        {/* Street Address */}
                        <div>
                          <Label htmlFor="street">Adresse complète *</Label>
                          <Input
                            id="street"
                            {...register('street')}
                            className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                            placeholder="123 Rue de la République, Appartement 4B"
                          />
                          {errors.street && (
                            <p className="text-sm text-error mt-1">{errors.street.message}</p>
                          )}
                        </div>

                        {/* City & Postal Code */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">Ville *</Label>
                            <Input
                              id="city"
                              {...register('city')}
                              className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                              placeholder="Oran"
                            />
                            {errors.city && (
                              <p className="text-sm text-error mt-1">{errors.city.message}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="postalCode">Code postal *</Label>
                            <Input
                              id="postalCode"
                              {...register('postalCode')}
                              className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                              placeholder="31000"
                            />
                            {errors.postalCode && (
                              <p className="text-sm text-error mt-1">{errors.postalCode.message}</p>
                            )}
                          </div>
                        </div>

                        {/* Country */}
                        <div>
                          <Label htmlFor="country">Pays *</Label>
                          <Input
                            id="country"
                            {...register('country')}
                            className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                            disabled
                          />
                        </div>

                        {/* Delivery Instructions */}
                        <div>
                          <Label htmlFor="instructions">Instructions de livraison (optionnel)</Label>
                          <Textarea
                            id="instructions"
                            {...register('instructions')}
                            className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                            placeholder="Ex: Sonner à l'interphone, 2ème étage, porte à gauche..."
                            rows={3}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full py-6 text-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                          Continuer vers la livraison
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* STEP 2: Delivery Date Selection */}
              {currentStep === 'delivery' && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glass shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#2B3210]">
                        <Calendar className="w-6 h-6 text-[#DE6E27]" />
                        Date de livraison
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Info Banner */}
                      <div className="glass-strong rounded-xl p-4 border-l-4 border-[#DE6E27]">
                        <div className="flex items-start gap-3">
                          <Truck className="w-5 h-5 text-[#DE6E27] mt-0.5" />
                          <div>
                            <p className="font-semibold text-[#2B3210] mb-1">
                              Livraison gratuite
                            </p>
                            <p className="text-sm text-[#505631]">
                              Choisissez votre date de livraison. Les livraisons ne sont pas disponibles le dimanche.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Calendar */}
                      <div className="flex justify-center">
                        <CalendarComponent
                          mode="single"
                          selected={deliveryDate}
                          onSelect={setDeliveryDate}
                          disabled={isDateDisabled}
                          initialFocus
                          className="glass rounded-xl border border-[#E5E2D9] pointer-events-auto"
                          locale={fr}
                        />
                      </div>

                      {/* Selected Date Display */}
                      {deliveryDate && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="glass-strong rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="text-sm text-[#505631]">Livraison prévue le</p>
                                <p className="font-semibold text-[#2B3210]">
                                  {format(deliveryDate, 'EEEE d MMMM yyyy', { locale: fr })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Delivery Time Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="glass rounded-xl p-4 text-center">
                          <Clock className="w-8 h-8 mx-auto mb-2 text-[#DE6E27]" />
                          <p className="text-sm font-semibold text-[#2B3210]">Créneau horaire</p>
                          <p className="text-xs text-[#505631]">10h - 18h</p>
                        </div>
                        <div className="glass rounded-xl p-4 text-center">
                          <Package className="w-8 h-8 mx-auto mb-2 text-[#DE6E27]" />
                          <p className="text-sm font-semibold text-[#2B3210]">Emballage</p>
                          <p className="text-xs text-[#505631]">Isotherme</p>
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep('address')}
                          className="flex-1 glass border-2 border-[#505631] text-[#505631] py-6 rounded-xl hover:bg-[#505631] hover:text-white transition-all duration-300"
                        >
                          <ArrowLeft className="mr-2 h-5 w-5" />
                          Retour
                        </Button>
                        <Button
                          onClick={handleDeliverySubmit}
                          disabled={!deliveryDate}
                          className="flex-1 py-6 bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
                        >
                          Continuer vers le paiement
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* STEP 3: Payment */}
              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Payment Method Selection */}
                  <Card className="glass shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#2B3210]">
                        <CreditCard className="w-6 h-6 text-[#DE6E27]" />
                        Mode de paiement
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4">
                        {/* Card Payment */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedPaymentMethod('card')}
                          className={cn(
                            "glass rounded-xl p-6 cursor-pointer border-2 transition-all duration-300",
                            selectedPaymentMethod === 'card'
                              ? "border-[#DE6E27] bg-[#DE6E27]/5"
                              : "border-transparent hover:border-[#E5E2D9]"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="font-semibold text-[#2B3210]">Carte bancaire</p>
                                <p className="text-sm text-[#505631]">Paiement sécurisé en ligne</p>
                              </div>
                            </div>
                            {selectedPaymentMethod === 'card' && (
                              <CheckCircle className="w-6 h-6 text-[#DE6E27]" />
                            )}
                          </div>
                        </motion.div>

                        {/* Cash on Delivery */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedPaymentMethod('cash')}
                          className={cn(
                            "glass rounded-xl p-6 cursor-pointer border-2 transition-all duration-300",
                            selectedPaymentMethod === 'cash'
                              ? "border-[#DE6E27] bg-[#DE6E27]/5"
                              : "border-transparent hover:border-[#E5E2D9]"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2B3210] to-[#505631] flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="font-semibold text-[#2B3210]">Paiement à la livraison</p>
                                <p className="text-sm text-[#505631]">Payez en espèces au livreur</p>
                              </div>
                            </div>
                            {selectedPaymentMethod === 'cash' && (
                              <CheckCircle className="w-6 h-6 text-[#DE6E27]" />
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Review */}
                  <Card className="glass shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-[#2B3210]">Récapitulatif de la commande</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Delivery Info */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-[#DE6E27] mt-0.5" />
                          <div>
                            <p className="text-sm text-[#505631]">Adresse de livraison</p>
                            <p className="font-semibold text-[#2B3210]">
                              {addressData.firstName} {addressData.lastName}
                            </p>
                            <p className="text-sm text-[#505631]">
                              {addressData.street}<br />
                              {addressData.postalCode} {addressData.city}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-[#DE6E27] mt-0.5" />
                          <div>
                            <p className="text-sm text-[#505631]">Date de livraison</p>
                            <p className="font-semibold text-[#2B3210]">
                              {deliveryDate && format(deliveryDate, 'EEEE d MMMM yyyy', { locale: fr })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Items */}
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{item.quantity}x</Badge>
                              <span className="text-[#2B3210]">{item.mealName}</span>
                            </div>
                            <span className="font-semibold text-[#2B3210]">
                              {(item.unitPrice * item.quantity).toFixed(2)} DA
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('delivery')}
                      disabled={isPending}
                      className="flex-1 glass border-2 border-[#505631] text-[#505631] py-6 rounded-xl hover:bg-[#505631] hover:text-white transition-all duration-300"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Retour
                    </Button>
                    <Button
                      onClick={() => handleOrderSubmit(addressData)}
                      disabled={isPending}
                      className="flex-1 py-6 bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {isPending ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <Package className="w-5 h-5" />
                          </motion.div>
                          Traitement...
                        </>
                      ) : (
                        <>
                          Confirmer la commande
                          <CheckCircle className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar - Sticky */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-3xl p-6 sticky top-24"
            >
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210] mb-6">
                Votre commande
              </h3>

              {/* Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.mealImage}
                        alt={item.mealName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#2B3210] truncate">
                        {item.mealName}
                      </p>
                      <p className="text-xs text-[#505631]">Quantité: {item.quantity}</p>
                      <p className="text-sm font-semibold text-[#DE6E27]">
                        {(item.unitPrice * item.quantity).toFixed(2)} DA
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-[#505631]">
                  <span>Sous-total</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} DA</span>
                </div>
                <div className="flex justify-between text-sm text-[#505631]">
                  <span>Livraison</span>
                  <span className="font-semibold text-success">Gratuit</span>
                </div>
                <Separator />
                <div className="flex justify-between items-baseline">
                  <span className="font-['Space_Grotesk'] text-lg font-bold text-[#2B3210]">
                    Total
                  </span>
                  <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210]">
                    {total.toFixed(2)} DA
                  </span>
                </div>
              </div>

              {/* Security Badges */}
              <div className="space-y-2 pt-6 border-t border-[#E5E2D9]">
                <div className="flex items-center gap-2 text-xs text-[#505631]">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#505631]">
                  <Truck className="w-4 h-4 text-success" />
                  <span>Livraison gratuite garantie</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#505631]">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Satisfaction garantie</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
