import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/presentation/components/organisms/Header";
import Footer from "@/components/Footer";
import { useCustomerOrders } from "@/hooks/useCustomerOrders";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Package, MapPin, CheckCircle, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Orders = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  const { data: orders, isLoading } = useCustomerOrders(user?.id);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  // Check for success message from checkout
  useEffect(() => {
    if (location.state?.orderSuccess) {
      setShowSuccessMessage(true);
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const toggleOrderExpanded = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: { bg: 'bg-gray-500/10', text: 'text-gray-700', border: 'border-gray-500/20' },
      confirmed: { bg: 'bg-blue-500/10', text: 'text-blue-700', border: 'border-blue-500/20' },
      preparing: { bg: 'bg-yellow-500/10', text: 'text-yellow-700', border: 'border-yellow-500/20' },
      ready: { bg: 'bg-orange-500/10', text: 'text-orange-700', border: 'border-orange-500/20' },
      dispatched: { bg: 'bg-purple-500/10', text: 'text-purple-700', border: 'border-purple-500/20' },
      delivered: { bg: 'bg-green-500/10', text: 'text-green-700', border: 'border-green-500/20' },
      cancelled: { bg: 'bg-red-500/10', text: 'text-red-700', border: 'border-red-500/20' },
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      draft: 'Brouillon',
      confirmed: 'Confirmée',
      preparing: 'En préparation',
      ready: 'Prête',
      dispatched: 'En livraison',
      delivered: 'Livrée',
      cancelled: 'Annulée',
    };
    return labels[status] || status;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9]">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Success Message */}
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-8"
            >
              <Card className="glass-strong border-2 border-success/30 shadow-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-success to-green-600 flex items-center justify-center flex-shrink-0"
                      >
                        <CheckCircle className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210] mb-1">
                          Commande confirmée avec succès ! 🎉
                        </h3>
                        <p className="text-[#505631]">
                          {location.state?.message || "Votre commande a été enregistrée et sera traitée dans les plus brefs délais."}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowSuccessMessage(false)}
                      className="hover:bg-success/10"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-['Space_Grotesk'] text-5xl font-bold text-[#2B3210] mb-2">
            Mes Commandes
          </h1>
          <p className="text-[#505631] text-lg">
            Suivez l'état de vos commandes en temps réel
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="glass">
                <CardContent className="p-6">
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !orders || orders.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="glass shadow-xl">
              <CardContent className="p-16 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#DE6E27]/10 flex items-center justify-center"
                >
                  <Package className="w-12 h-12 text-[#DE6E27]" />
                </motion.div>
                <h3 className="font-['Space_Grotesk'] text-3xl font-bold text-[#2B3210] mb-3">
                  Aucune commande
                </h3>
                <p className="text-[#505631] text-lg mb-8">
                  Vous n'avez pas encore passé de commande
                </p>
                <Button
                  onClick={() => window.location.href = '/menu'}
                  className="bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white px-10 py-6 text-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  Découvrir nos repas
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order, index) => {
              const statusColors = getStatusColor(order.status);
              const isExpanded = expandedOrders.has(order.id);
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-6">
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                        <div>
                          <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210] mb-2">
                            Commande {order.order_number}
                          </h3>
                          <p className="text-[#505631]">
                            Passée le {formatDate(order.created_at)}
                          </p>
                        </div>
                        <Badge 
                          className={cn(
                            "px-4 py-2 text-sm font-semibold border-2",
                            statusColors.bg,
                            statusColors.text,
                            statusColors.border
                          )}
                        >
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>

                      {/* Quick Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {order.delivery_date && (
                          <div className="flex items-start gap-3 glass-strong rounded-xl p-4">
                            <Calendar className="w-5 h-5 text-[#DE6E27] mt-0.5" />
                            <div>
                              <p className="text-sm text-[#505631] font-medium">
                                Date de livraison
                              </p>
                              <p className="text-[#2B3210] font-semibold">
                                {formatDate(order.delivery_date)}
                              </p>
                            </div>
                          </div>
                        )}
                        {order.addresses && (
                          <div className="flex items-start gap-3 glass-strong rounded-xl p-4">
                            <MapPin className="w-5 h-5 text-[#DE6E27] mt-0.5" />
                            <div>
                              <p className="text-sm text-[#505631] font-medium">
                                Adresse de livraison
                              </p>
                              <p className="text-[#2B3210] font-semibold">
                                {order.addresses.city}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Total */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
                        <span className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210]">
                          Total
                        </span>
                        <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#DE6E27]">
                          {order.total_amount.toFixed(2)} DA
                        </span>
                      </div>

                      {/* Expandable Details */}
                      <Button
                        variant="ghost"
                        onClick={() => toggleOrderExpanded(order.id)}
                        className="w-full mt-4 hover:bg-[#DE6E27]/10 rounded-xl"
                      >
                        <span className="text-[#2B3210] font-semibold">
                          {isExpanded ? 'Masquer' : 'Voir'} les détails
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="ml-2 w-5 h-5" />
                        ) : (
                          <ChevronDown className="ml-2 w-5 h-5" />
                        )}
                      </Button>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-6 space-y-4">
                              <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#2B3210]">
                                Repas commandés
                              </h4>
                              <div className="space-y-3">
                                {order.order_items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center gap-4 glass-strong rounded-xl p-4 hover:scale-[1.02] transition-transform duration-200"
                                  >
                                    <img
                                      src={item.meals.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'}
                                      alt={item.meals.name}
                                      className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                      <p className="font-semibold text-[#2B3210]">
                                        {item.meals.name}
                                      </p>
                                      <p className="text-sm text-[#505631]">
                                        Quantité: {item.quantity}
                                      </p>
                                    </div>
                                    <p className="font-bold text-[#DE6E27]">
                                      {item.total_price.toFixed(2)} DA
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
