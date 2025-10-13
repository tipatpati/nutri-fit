import { Header } from "@/presentation/components/organisms/Header";
import Footer from "@/components/Footer";
import { useCustomerOrders } from "@/hooks/useCustomerOrders";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Package, MapPin } from "lucide-react";

const Orders = () => {
  const { user } = useAuthStore();
  const { data: orders, isLoading } = useCustomerOrders(user?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500';
      case 'preparing':
        return 'bg-yellow-500';
      case 'ready':
        return 'bg-orange-500';
      case 'dispatched':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
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
    <div className="min-h-screen md-surface">
      <Header />
      
      <main className="container mx-auto px-md-3 py-md-6 max-w-6xl">
        <div className="mb-md-8 text-center">
          <h1 className="md-headline-large mb-md-3 text-md-on-surface">
            Mes commandes
          </h1>
          <p className="md-body-large text-md-on-surface-variant">
            Suivez l'état de vos commandes
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-md-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-md-6">
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !orders || orders.length === 0 ? (
          <Card className="overflow-hidden">
            <CardContent className="p-md-8 text-center">
              <Package className="w-16 h-16 mx-auto mb-md-4 text-md-on-surface-variant" />
              <h3 className="md-title-large mb-md-2 text-md-on-surface">
                Aucune commande
              </h3>
              <p className="md-body-medium text-md-on-surface-variant">
                Vous n'avez pas encore passé de commande
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-md-5">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden bg-md-surface-container border-md-outline-variant border md-elevation-1">
                <CardContent className="p-md-5 sm:p-md-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-md-5 gap-md-3">
                    <div>
                      <h3 className="md-title-large text-md-on-surface mb-md-1">
                        Commande {order.order_number}
                      </h3>
                      <p className="md-body-small text-md-on-surface-variant">
                        Passée le {formatDate(order.created_at)}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>

                  {/* Delivery Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md-4 mb-md-5">
                    {order.delivery_date && (
                      <div className="flex items-start gap-md-3">
                        <Calendar className="w-5 h-5 text-md-primary mt-0.5" />
                        <div>
                          <p className="md-label-medium text-md-on-surface-variant">
                            Date de livraison
                          </p>
                          <p className="md-body-medium text-md-on-surface">
                            {formatDate(order.delivery_date)}
                          </p>
                        </div>
                      </div>
                    )}
                    {order.addresses && (
                      <div className="flex items-start gap-md-3">
                        <MapPin className="w-5 h-5 text-md-primary mt-0.5" />
                        <div>
                          <p className="md-label-medium text-md-on-surface-variant">
                            Adresse de livraison
                          </p>
                          <p className="md-body-medium text-md-on-surface">
                            {order.addresses.street_address}
                          </p>
                          <p className="md-body-medium text-md-on-surface">
                            {order.addresses.postal_code} {order.addresses.city}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="space-y-md-3 mb-md-5">
                    <h4 className="md-title-medium text-md-on-surface">
                      Repas commandés
                    </h4>
                    <div className="space-y-md-2">
                      {order.order_items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-md-3 p-md-3 bg-md-surface rounded-md-md border border-md-outline-variant"
                        >
                          <img
                            src={item.meals.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'}
                            alt={item.meals.name}
                            className="w-12 h-12 object-cover rounded-md-sm"
                          />
                          <div className="flex-1">
                            <p className="md-body-medium text-md-on-surface">
                              {item.meals.name}
                            </p>
                            <p className="md-body-small text-md-on-surface-variant">
                              Quantité: {item.quantity}
                            </p>
                          </div>
                          <p className="md-body-medium font-semibold text-md-on-surface">
                            {item.total_price.toFixed(2)}€
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="border-t border-md-outline-variant pt-md-4">
                    <div className="flex justify-between items-center">
                      <span className="md-title-medium text-md-on-surface">
                        Total
                      </span>
                      <span className="md-title-large font-bold text-md-primary">
                        {order.total_amount.toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
