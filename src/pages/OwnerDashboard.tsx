import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Package, Users, Truck, Settings, LogOut, TrendingUp, AlertTriangle, Loader2 } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import RecipeManager from "@/components/admin/RecipeManager";
import NutritionalRecipeManager from "@/components/admin/recipe/NutritionalRecipeManager";
import NutritionalCalculator from "@/components/admin/recipe/NutritionalCalculator";
import UserRolesManager from "@/components/admin/UserRolesManager";
import { PackManager } from "@/components/admin/PackManager";
import { useOrdersAnalytics } from "@/hooks/useOrdersAnalytics";
import { useInventoryData } from "@/hooks/useInventoryData";
import { useDeliveryData } from "@/hooks/useDeliveryData";
import DataMigrationPanel from "@/components/admin/DataMigrationPanel";
import InventoryDashboard from "@/components/admin/inventory/InventoryDashboard";

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
    { title: "Meal Packs", icon: Package, id: "packs" },
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

  const getStatusBadge = (status: string) => {
    const config = {
      "En stock": { bg: "border-success/30", text: "text-success" },
      "Stock faible": { bg: "border-warning/30", text: "text-warning" },
      "Stock critique": { bg: "border-error/30", text: "text-error" },
      "Confirmé": { bg: "border-info/30", text: "text-info" },
      "En préparation": { bg: "border-warning/30", text: "text-warning" },
      "En route": { bg: "border-info/30", text: "text-info" },
      "Livré": { bg: "border-success/30", text: "text-success" },
    };
    return config[status as keyof typeof config] || { bg: "border-[#505631]/30", text: "text-[#505631]" };
  };

  const renderContent = () => {
    switch (activeSection) {
      case "analytics":
        if (ordersLoading || inventoryLoading) {
          return (
            <div className="flex items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-10 w-10 text-[#DE6E27]" />
              </motion.div>
            </div>
          );
        }

        return (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="glass hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-w-0">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 pt-3 md:px-6 md:pt-6">
                    <CardTitle className="text-xs md:text-sm font-medium text-[#2B3210] truncate">Revenus Total</CardTitle>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                    <div className="text-lg md:text-3xl font-bold text-[#2B3210] truncate">{ordersData?.totalRevenue || '€0.00'}</div>
                    <p className="text-xs text-[#505631]">Ce mois</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="glass hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-w-0">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 pt-3 md:px-6 md:pt-6">
                    <CardTitle className="text-xs md:text-sm font-medium text-[#2B3210]">Commandes</CardTitle>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                    <div className="text-lg md:text-3xl font-bold text-[#2B3210]">{ordersData?.totalOrders || 0}</div>
                    <p className="text-xs text-[#505631]">Ce mois</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="glass hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-w-0">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 pt-3 md:px-6 md:pt-6">
                    <CardTitle className="text-xs md:text-sm font-medium text-[#2B3210] truncate">Livraisons</CardTitle>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center">
                      <Truck className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                    <div className="text-lg md:text-3xl font-bold text-[#2B3210]">{ordersData?.pendingDeliveries || 0}</div>
                    <p className="text-xs text-[#505631]">À traiter</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="glass hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-w-0">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 pt-3 md:px-6 md:pt-6">
                    <CardTitle className="text-xs md:text-sm font-medium text-[#2B3210] truncate">Ingrédients</CardTitle>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                    <div className="text-lg md:text-3xl font-bold text-[#2B3210]">{inventoryData?.activeIngredients || 0}</div>
                    <p className="text-xs text-[#505631]">En stock</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="glass hover:shadow-2xl transition-all duration-300">
                <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                  <CardTitle className="text-[#2B3210] text-sm md:text-base">Commandes Récentes</CardTitle>
                  <CardDescription className="text-xs md:text-sm text-[#505631]">Dernières commandes passées aujourd'hui</CardDescription>
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  {ordersData?.recentOrders && ordersData.recentOrders.length > 0 ? (
                    <div className="glass rounded-2xl overflow-hidden">
                      <Table>
                        <TableHeader className="bg-[#E5E2D9]/50">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="text-xs px-2 md:px-4">Commande</TableHead>
                            <TableHead className="text-xs px-2 md:px-4 min-w-[100px]">Client</TableHead>
                            <TableHead className="text-xs px-2 md:px-4">Total</TableHead>
                            <TableHead className="text-xs px-2 md:px-4 min-w-[90px]">Statut</TableHead>
                            <TableHead className="text-xs px-2 md:px-4">Heure</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ordersData.recentOrders.map((order) => {
                            const statusConfig = getStatusBadge(order.status);
                            return (
                              <TableRow key={order.id} className="hover:bg-[#DE6E27]/5 transition-colors duration-200">
                                <TableCell className="font-medium text-xs px-2 md:px-4">{order.id}</TableCell>
                                <TableCell className="text-xs px-2 md:px-4">{order.customer}</TableCell>
                                <TableCell className="text-xs px-2 md:px-4">{order.total}</TableCell>
                                <TableCell className="text-xs px-2 md:px-4">
                                  <Badge className={cn("glass border-2", statusConfig.bg, statusConfig.text)}>
                                    {order.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs px-2 md:px-4">{order.time}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="glass rounded-3xl p-16 text-center">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#DE6E27]/10 flex items-center justify-center">
                        <Package className="w-8 h-8 text-[#DE6E27]" />
                      </motion.div>
                      <p className="text-[#505631]">Aucune commande aujourd'hui</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );
      case "recipes":
        return (
          <div className="space-y-4 md:space-y-6">
            <DataMigrationPanel />
            <NutritionalCalculator />
            <NutritionalRecipeManager />
            <RecipeManager />
          </div>
        );
      case "packs":
        return <PackManager />;
      case "inventory":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#113B39] mb-2">Inventaire</h2>
              <p className="text-md-surface-on-surface">Gestion du stock d'ingrédients et disponibilité des recettes</p>
            </div>

            <InventoryDashboard />
          </div>
        );
      case "orders":
        if (ordersLoading) {
          return (
            <div className="flex items-center justify-center py-12">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <Loader2 className="h-10 w-10 text-[#DE6E27]" />
              </motion.div>
            </div>
          );
        }

        return (
          <div className="space-y-4 md:space-y-6">
            <Card className="glass hover:shadow-2xl transition-all duration-300">
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#2B3210] text-sm md:text-base">Toutes les Commandes</CardTitle>
                <CardDescription className="text-xs md:text-sm text-[#505631]">Vue d'ensemble de toutes les commandes du jour</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                {ordersData?.recentOrders && ordersData.recentOrders.length > 0 ? (
                  <div className="glass rounded-2xl overflow-hidden">
                    <Table>
                      <TableHeader className="bg-[#E5E2D9]/50">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-xs px-2 md:px-4">ID</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[100px]">Client</TableHead>
                          <TableHead className="text-xs px-2 md:px-4">Total</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[90px]">Statut</TableHead>
                          <TableHead className="text-xs px-2 md:px-4">Heure</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ordersData.recentOrders.map((order) => {
                          const statusConfig = getStatusBadge(order.status);
                          return (
                            <TableRow key={order.id} className="hover:bg-[#DE6E27]/5 transition-colors duration-200">
                              <TableCell className="font-medium text-xs px-2 md:px-4">{order.id}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{order.customer}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{order.total}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">
                                <Badge className={cn("glass border-2", statusConfig.bg, statusConfig.text)}>
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{order.time}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="glass rounded-3xl p-16 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#DE6E27]/10 flex items-center justify-center">
                      <Package className="w-8 h-8 text-[#DE6E27]" />
                    </motion.div>
                    <p className="text-[#505631]">Aucune commande aujourd'hui</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      case "deliveries":
        if (deliveryLoading) {
          return (
            <div className="flex items-center justify-center py-12">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <Loader2 className="h-10 w-10 text-[#DE6E27]" />
              </motion.div>
            </div>
          );
        }

        return (
          <div className="space-y-4 md:space-y-6">
            <Card className="glass hover:shadow-2xl transition-all duration-300">
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#2B3210] text-sm md:text-base">Suivi des Livraisons</CardTitle>
                <CardDescription className="text-xs md:text-sm text-[#505631]">Supervision de toutes les livraisons actives</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                {deliveryData?.activeDeliveries && deliveryData.activeDeliveries.length > 0 ? (
                  <div className="glass rounded-2xl overflow-hidden">
                    <Table>
                      <TableHeader className="bg-[#E5E2D9]/50">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-xs px-2 md:px-4">ID</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[100px]">Chauffeur</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[80px]">Zone</TableHead>
                          <TableHead className="text-xs px-2 md:px-4">Commandes</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[90px]">Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deliveryData.activeDeliveries.map((delivery) => {
                          const statusConfig = getStatusBadge(delivery.status);
                          return (
                            <TableRow key={delivery.id} className="hover:bg-[#DE6E27]/5 transition-colors duration-200">
                              <TableCell className="font-medium text-xs px-2 md:px-4">{delivery.id}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{delivery.driver}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{delivery.zone}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{delivery.orders}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">
                                <Badge className={cn("glass border-2", statusConfig.bg, statusConfig.text)}>
                                  {delivery.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="glass rounded-3xl p-16 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#DE6E27]/10 flex items-center justify-center">
                      <Truck className="w-8 h-8 text-[#DE6E27]" />
                    </motion.div>
                    <p className="text-[#505631]">Aucune livraison active</p>
                  </div>
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9]">
        <Sidebar className="glass-strong border-r border-[#DE6E27]/20 hidden lg:block">
          <SidebarHeader className="border-b border-[#DE6E27]/20 p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#2B3210] to-[#DE6E27] bg-clip-text text-transparent">NutriFit Admin</h2>
            <p className="text-sm md:text-base text-[#505631] font-medium">Propriétaire</p>
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
                        className="text-sm md:text-base hover:bg-[#DE6E27]/5 transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-[#DE6E27]/20 data-[active=true]:to-[#ff8040]/20 data-[active=true]:text-[#DE6E27] data-[active=true]:font-semibold rounded-xl"
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
          <SidebarFooter className="border-t border-[#DE6E27]/20 p-4 md:p-6">
            <Button variant="outline" className="w-full justify-start text-sm md:text-base glass border-2 border-[#DE6E27] text-[#DE6E27] hover:bg-[#DE6E27] hover:text-white transition-all duration-300 rounded-xl" onClick={handleLogout}>
              <LogOut className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
              Se déconnecter
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1 min-w-0">
          <header className="flex h-16 md:h-20 shrink-0 items-center gap-3 border-b border-[#DE6E27]/20 px-4 md:px-8 glass-strong shadow-lg">
            <SidebarTrigger className="-ml-1 text-[#DE6E27] hover:bg-[#DE6E27]/10 rounded-lg" />
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-[#2B3210] to-[#DE6E27] bg-clip-text text-transparent truncate">Dashboard Propriétaire</h1>
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
