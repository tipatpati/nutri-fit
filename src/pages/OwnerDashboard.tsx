import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Package, Users, Truck, Settings, LogOut, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import RecipeManager from "@/components/admin/RecipeManager";
import NutritionalRecipeManager from "@/components/admin/recipe/NutritionalRecipeManager";
import NutritionalCalculator from "@/components/admin/recipe/NutritionalCalculator";
import UserRolesManager from "@/components/admin/UserRolesManager";
import { useOrdersAnalytics } from "@/hooks/useOrdersAnalytics";
import { useInventoryData } from "@/hooks/useInventoryData";
import { useDeliveryData } from "@/hooks/useDeliveryData";

const OwnerDashboard = () => {
  const [activeSection, setActiveSection] = useState("analytics");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch real data from database
  const { data: ordersData, isLoading: ordersLoading } = useOrdersAnalytics();
  const { data: inventoryData, isLoading: inventoryLoading } = useInventoryData();
  const { data: deliveryData, isLoading: deliveryLoading } = useDeliveryData();

  const menuItems = [
    { title: "Analytics", icon: BarChart3, id: "analytics" },
    { title: "Recipes", icon: Package, id: "recipes" },
    { title: "Inventory", icon: Package, id: "inventory" },
    { title: "Orders", icon: Users, id: "orders" },
    { title: "Deliveries", icon: Truck, id: "deliveries" },
    { title: "Settings", icon: Settings, id: "settings" },
  ];

  const handleLogout = () => {
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès"
    });
    navigate("/admin");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En stock": return "text-emerald-600";
      case "Stock faible": return "text-amber-600";
      case "Stock critique": return "text-red-600";
      case "Confirmé": return "text-blue-600";
      case "En préparation": return "text-amber-600";
      case "En route": return "text-purple-600";
      case "Livré": return "text-emerald-600";
      default: return "text-md-surface-on-surface";
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "analytics":
        if (ordersLoading || inventoryLoading) {
          return (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-md-primary" />
            </div>
          );
        }

        return (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              <Card className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 pt-3 md:px-6 md:pt-6">
                  <CardTitle className="text-xs md:text-sm font-medium truncate">Revenus Total</CardTitle>
                  <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-green-600 flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="text-lg md:text-2xl font-bold text-md-primary truncate">{ordersData?.totalRevenue || '€0.00'}</div>
                  <p className="text-xs text-green-600">Ce mois</p>
                </CardContent>
              </Card>
              <Card className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 pt-3 md:px-6 md:pt-6">
                  <CardTitle className="text-xs md:text-sm font-medium">Commandes</CardTitle>
                  <Users className="h-3 w-3 md:h-4 md:w-4 text-md-primary flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="text-lg md:text-2xl font-bold text-md-primary">{ordersData?.totalOrders || 0}</div>
                  <p className="text-xs text-green-600">Ce mois</p>
                </CardContent>
              </Card>
              <Card className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 pt-3 md:px-6 md:pt-6">
                  <CardTitle className="text-xs md:text-sm font-medium truncate">Livraisons</CardTitle>
                  <Truck className="h-3 w-3 md:h-4 md:w-4 text-md-tertiary flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="text-lg md:text-2xl font-bold text-md-tertiary">{ordersData?.pendingDeliveries || 0}</div>
                  <p className="text-xs text-emerald-800">À traiter</p>
                </CardContent>
              </Card>
              <Card className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 pt-3 md:px-6 md:pt-6">
                  <CardTitle className="text-xs md:text-sm font-medium truncate">Ingrédients</CardTitle>
                  <Package className="h-3 w-3 md:h-4 md:w-4 text-md-primary flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="text-lg md:text-2xl font-bold text-md-primary">{inventoryData?.activeIngredients || 0}</div>
                  <p className="text-xs text-emerald-800">En stock</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-md-primary text-sm md:text-base">Commandes Récentes</CardTitle>
                <CardDescription className="text-xs md:text-sm text-md-surface-on-surface">Dernières commandes passées aujourd'hui</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                {ordersData?.recentOrders && ordersData.recentOrders.length > 0 ? (
                  <div className="overflow-x-auto -mx-3 md:mx-0">
                    <div className="min-w-full inline-block align-middle">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs px-2 md:px-4">Commande</TableHead>
                            <TableHead className="text-xs px-2 md:px-4 min-w-[100px]">Client</TableHead>
                            <TableHead className="text-xs px-2 md:px-4">Total</TableHead>
                            <TableHead className="text-xs px-2 md:px-4 min-w-[90px]">Statut</TableHead>
                            <TableHead className="text-xs px-2 md:px-4">Heure</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ordersData.recentOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium text-xs px-2 md:px-4">{order.id}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{order.customer}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{order.total}</TableCell>
                              <TableCell className={`${getStatusColor(order.status)} text-xs px-2 md:px-4`}>{order.status}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{order.time}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">Aucune commande aujourd'hui</p>
                )}
              </CardContent>
            </Card>
          </div>
        );
      case "recipes":
        return (
          <div className="space-y-4 md:space-y-6">
            <NutritionalCalculator />
            <NutritionalRecipeManager />
            <RecipeManager />
          </div>
        );
      case "inventory":
        if (inventoryLoading) {
          return (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-md-primary" />
            </div>
          );
        }

        return (
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-md-primary text-sm md:text-base">Gestion des Ingrédients</CardTitle>
                <CardDescription className="text-xs md:text-sm">Stock actuel et niveaux d'alerte</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                {inventoryData?.inventory && inventoryData.inventory.length > 0 ? (
                  <div className="overflow-x-auto -mx-3 md:mx-0">
                    <div className="min-w-full inline-block align-middle">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs px-2 md:px-4 min-w-[120px]">Ingrédient</TableHead>
                            <TableHead className="text-xs px-2 md:px-4">Quantité</TableHead>
                            <TableHead className="text-xs px-2 md:px-4">Unité</TableHead>
                            <TableHead className="text-xs px-2 md:px-4">Niveau min.</TableHead>
                            <TableHead className="text-xs px-2 md:px-4 min-w-[100px]">Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {inventoryData.inventory.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs px-2 md:px-4">{item.name}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{item.quantity}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{item.unit}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{item.minLevel}</TableCell>
                              <TableCell className={`flex items-center gap-1 md:gap-2 ${getStatusColor(item.status)} text-xs px-2 md:px-4`}>
                                {item.status === "Stock critique" && <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />}
                                <span className="truncate">{item.status}</span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">Aucun ingrédient en stock</p>
                )}
              </CardContent>
            </Card>
          </div>
        );
      case "orders":
        if (ordersLoading) {
          return (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-md-primary" />
            </div>
          );
        }

        return (
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-md-primary text-sm md:text-base">Toutes les Commandes</CardTitle>
                <CardDescription className="text-xs md:text-sm">Vue d'ensemble de toutes les commandes du jour</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                {ordersData?.recentOrders && ordersData.recentOrders.length > 0 ? (
                  <div className="overflow-x-auto -mx-3 md:mx-0">
                    <div className="min-w-full inline-block align-middle">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs px-2 md:px-4">ID</TableHead>
                            <TableHead className="text-xs px-2 md:px-4 min-w-[100px]">Client</TableHead>
                            <TableHead className="text-xs px-2 md:px-4">Total</TableHead>
                            <TableHead className="text-xs px-2 md:px-4 min-w-[90px]">Statut</TableHead>
                            <TableHead className="text-xs px-2 md:px-4">Heure</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ordersData.recentOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium text-xs px-2 md:px-4">{order.id}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{order.customer}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{order.total}</TableCell>
                              <TableCell className={`${getStatusColor(order.status)} text-xs px-2 md:px-4`}>{order.status}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{order.time}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">Aucune commande aujourd'hui</p>
                )}
              </CardContent>
            </Card>
          </div>
        );
      case "deliveries":
        if (deliveryLoading) {
          return (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-md-primary" />
            </div>
          );
        }

        return (
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-md-primary text-sm md:text-base">Suivi des Livraisons</CardTitle>
                <CardDescription className="text-xs md:text-sm">Supervision de toutes les livraisons actives</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                {deliveryData?.activeDeliveries && deliveryData.activeDeliveries.length > 0 ? (
                  <div className="overflow-x-auto -mx-3 md:mx-0">
                    <div className="min-w-full inline-block align-middle">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs px-2 md:px-4">ID</TableHead>
                            <TableHead className="text-xs px-2 md:px-4 min-w-[100px]">Chauffeur</TableHead>
                            <TableHead className="text-xs px-2 md:px-4 min-w-[80px]">Zone</TableHead>
                            <TableHead className="text-xs px-2 md:px-4">Commandes</TableHead>
                            <TableHead className="text-xs px-2 md:px-4 min-w-[90px]">Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {deliveryData.activeDeliveries.map((delivery) => (
                            <TableRow key={delivery.id}>
                              <TableCell className="font-medium text-xs px-2 md:px-4">{delivery.id}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{delivery.driver}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{delivery.zone}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{delivery.orders}</TableCell>
                              <TableCell className={`${getStatusColor(delivery.status)} text-xs px-2 md:px-4`}>{delivery.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">Aucune livraison active</p>
                )}
              </CardContent>
            </Card>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-4 md:space-y-6">
            <UserRolesManager />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
        <Sidebar className="border-r border-emerald-100/50 bg-white/90 backdrop-blur-sm hidden lg:block">
          <SidebarHeader className="border-b border-emerald-100/50 p-4 md:p-6 bg-gradient-to-r from-emerald-50/80 to-emerald-100/40">
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-800 bg-clip-text text-transparent">NutiFit Admin</h2>
            <p className="text-sm md:text-base text-emerald-800 font-medium">Propriétaire</p>
          </SidebarHeader>
          <SidebarContent className="bg-gradient-to-b from-white/95 to-emerald-50/50">
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-semibold text-emerald-700">Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                        className="text-sm md:text-base hover:bg-emerald-50/80 transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-emerald-100 data-[active=true]:to-emerald-50 data-[active=true]:text-emerald-800 data-[active=true]:font-semibold rounded-xl"
                      >
                        <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-emerald-100/50 p-4 md:p-6 bg-gradient-to-r from-emerald-50/80 to-emerald-100/40">
            <Button variant="outline" className="w-full justify-start text-sm md:text-base border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 rounded-xl" onClick={handleLogout}>
              <LogOut className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
              Se déconnecter
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1 min-w-0">
          <header className="flex h-16 md:h-20 shrink-0 items-center gap-3 border-b border-emerald-100/50 px-4 md:px-8 bg-white/90 backdrop-blur-sm shadow-sm">
            <SidebarTrigger className="-ml-1 text-emerald-700 hover:bg-emerald-50 rounded-lg" />
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-slate-800 to-emerald-800 bg-clip-text text-transparent truncate">Dashboard Propriétaire</h1>
          </header>
          
          <main className="flex-1 p-4 md:p-8 min-w-0 bg-gradient-to-br from-slate-50/50 via-white/30 to-emerald-50/50">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default OwnerDashboard;
