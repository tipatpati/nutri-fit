import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import NutriFitNavbar from "@/components/NutriFitNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getCartSummary, itemCount } = useCart();
  const { subtotal, deliveryFee, discount, total } = getCartSummary();

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9]">
        <NutriFitNavbar />
        <main className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="glass rounded-3xl p-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-32 h-32 mx-auto mb-8 rounded-full bg-[#DE6E27]/10 flex items-center justify-center"
              >
                <ShoppingCart className="w-16 h-16 text-[#DE6E27]" />
              </motion.div>
              
              <h2 className="font-['Space_Grotesk'] text-4xl font-bold text-[#2B3210] mb-4">
                Votre panier est vide
              </h2>
              <p className="text-[#505631] text-lg mb-8">
                Découvrez nos délicieux repas healthy et ajoutez-les à votre panier !
              </p>
              
              <Button
                onClick={() => navigate('/menu')}
                className="bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white px-10 py-6 text-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Découvrir nos repas
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

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
          <h1 className="font-['Space_Grotesk'] text-5xl font-bold text-[#2B3210] mb-2">
            Votre Panier
          </h1>
          <p className="text-[#505631] text-lg">
            {itemCount} {itemCount > 1 ? 'repas sélectionnés' : 'repas sélectionné'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card className="glass hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Image */}
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 group">
                          <img
                            src={item.mealImage || '/placeholder.jpg'}
                            alt={item.mealName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {item.premium && (
                            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white">
                              Premium
                            </Badge>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210] mb-1">
                                {item.mealName}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-error hover:bg-error/10 rounded-lg"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>

                          {/* Nutrition Info */}
                          <div className="flex gap-4 text-sm text-[#505631] mb-4">
                            <span>{item.nutrition.calories} cal</span>
                            <span>•</span>
                            <span>{item.nutrition.protein}g protéines</span>
                            <span>•</span>
                            <span>
                              {item.nutritionalGoal === 'equilibre' && 'Équilibré'}
                              {item.nutritionalGoal === 'perte_poids' && 'Minceur'}
                              {item.nutritionalGoal === 'prise_masse' && 'Prise de masse'}
                            </span>
                          </div>

                          {/* Delivery Date (if set) */}
                          {item.deliveryDate && (
                            <div className="flex items-center gap-2 text-sm text-[#505631] mb-4">
                              <Calendar className="w-4 h-4" />
                              <span>Livraison: {new Date(item.deliveryDate).toLocaleDateString('fr-FR')}</span>
                            </div>
                          )}

                          {/* Quantity & Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="glass rounded-lg hover:border-[#DE6E27] h-10 w-10"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <div className="w-16 text-center font-bold text-[#2B3210] text-lg">
                                {item.quantity}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="glass rounded-lg hover:border-[#DE6E27] h-10 w-10"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-['Space_Grotesk'] font-bold text-[#2B3210]">
                                {(item.unitPrice * item.quantity).toFixed(2)} DA
                              </div>
                              <div className="text-sm text-[#505631]">
                                {item.unitPrice.toFixed(2)} DA / repas
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <Button
              variant="outline"
              onClick={() => navigate('/menu')}
              className="w-full glass border-2 border-[#DE6E27] text-[#DE6E27] py-6 text-lg rounded-xl hover:bg-[#DE6E27] hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continuer mes achats
            </Button>
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-3xl p-8 sticky top-24"
            >
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210] mb-6">
                Résumé
              </h3>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6 pb-6 border-b border-[#E5E2D9]">
                <div className="flex justify-between text-[#505631]">
                  <span>Sous-total ({itemCount} repas)</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} DA</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#505631]">Frais de livraison</span>
                  <span className="font-semibold text-success">Gratuit</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Réduction</span>
                    <span className="font-semibold">-{discount.toFixed(2)} DA</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline mb-8">
                <span className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210]">
                  Total
                </span>
                <div className="text-right">
                  <div className="font-['Space_Grotesk'] text-4xl font-bold text-[#2B3210]">
                    {total.toFixed(2)} DA
                  </div>
                  <div className="text-xs text-[#505631]">TTC</div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => navigate('/checkout')}
                className="w-full py-6 text-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 mb-6"
              >
                Passer commande
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {/* Trust Indicators */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-[#505631]">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center gap-2 text-[#505631]">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Livraison gratuite</span>
                </div>
                <div className="flex items-center gap-2 text-[#505631]">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
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

export default Cart;
