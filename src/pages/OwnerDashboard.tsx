import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Package, Users, Truck, Settings, LogOut, TrendingUp, AlertTriangle, Loader2, Plus, Bell, CheckCircle2, XCircle } from "lucide-react";
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
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
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderSectionContent()}
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "analytics":
        if (ordersLoading || inventoryLoading) {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center mb-6 shadow-2xl"
              >
                <Loader2 className="h-10 w-10 text-white" />
              </motion.div>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210] mb-2">
                Chargement des données...
              </p>
              <p className="text-[#505631]">
                Veuillez patienter un instant
              </p>
            </motion.div>
          );
        }

        return (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Revenus Total',
                  value: ordersData?.totalRevenue || '0 DA',
                  icon: TrendingUp,
                  gradient: 'from-[#DE6E27] to-[#ff8040]',
                  bgGradient: 'from-[#DE6E27]/10 to-[#ff8040]/10',
                  trend: '+12.5%',
                  trendUp: true
                },
                {
                  title: 'Commandes',
                  value: ordersData?.totalOrders || 0,
                  icon: Users,
                  gradient: 'from-[#2B3210] to-[#505631]',
                  bgGradient: 'from-[#2B3210]/10 to-[#505631]/10',
                  trend: '+8.2%',
                  trendUp: true
                },
                {
                  title: 'Livraisons',
                  value: ordersData?.pendingDeliveries || 0,
                  icon: Truck,
                  gradient: 'from-info to-success',
                  bgGradient: 'from-info/10 to-success/10',
                  subtitle: 'À traiter'
                },
                {
                  title: 'Ingrédients',
                  value: inventoryData?.activeIngredients || 0,
                  icon: Package,
                  gradient: 'from-success to-info',
                  bgGradient: 'from-success/10 to-info/10',
                  subtitle: 'En stock'
                }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1 + idx * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Card className={cn(
                    "glass-strong rounded-3xl overflow-hidden border-2 border-transparent hover:border-[#DE6E27]/30 transition-all duration-300 shadow-xl hover:shadow-2xl",
                    "relative"
                  )}>
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-50",
                      stat.bgGradient
                    )} />
                    
                    <CardContent className="relative p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#505631] mb-1">
                            {stat.title}
                          </p>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
                          >
                            <p className="font-['Space_Grotesk'] text-4xl font-bold text-[#2B3210]">
                              {stat.value}
                            </p>
                          </motion.div>
                          {stat.subtitle && (
                            <p className="text-xs text-[#505631] mt-1">{stat.subtitle}</p>
                          )}
                          {stat.trend && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + idx * 0.1 }}
                              className={cn(
                                "flex items-center gap-1 mt-2 text-sm font-semibold",
                                stat.trendUp ? "text-success" : "text-error"
                              )}
                            >
                              <TrendingUp className={cn(
                                "w-4 h-4",
                                !stat.trendUp && "rotate-180"
                              )} />
                              <span>{stat.trend}</span>
                              <span className="text-[#505631] text-xs">vs mois dernier</span>
                            </motion.div>
                          )}
                        </div>
                        
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className={cn(
                            "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl",
                            stat.gradient
                          )}
                        >
                          <stat.icon className="w-8 h-8 text-white" />
                        </motion.div>
                      </div>
                      
                      <div className="mt-4 h-2 bg-[#E5E2D9] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ delay: 0.7 + idx * 0.1, duration: 1 }}
                          className={cn(
                            "h-full rounded-full bg-gradient-to-r",
                            stat.gradient
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass-strong rounded-3xl overflow-hidden shadow-2xl border-2 border-[#DE6E27]/20">
                <CardHeader className="bg-gradient-to-br from-[#DE6E27]/10 to-[#ff8040]/10 border-b-2 border-[#DE6E27]/20 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210] mb-2">
                        Commandes Récentes
                      </CardTitle>
                      <CardDescription className="text-[#505631] text-base">
                        Dernières commandes passées aujourd'hui
                      </CardDescription>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Package className="w-8 h-8 text-[#DE6E27]" />
                    </motion.div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {ordersData?.recentOrders && ordersData.recentOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-[#E5E2D9]/30 hover:bg-[#E5E2D9]/30 border-b-2 border-[#E5E2D9]">
                            <TableHead className="font-bold text-[#2B3210] py-4">Commande</TableHead>
                            <TableHead className="font-bold text-[#2B3210]">Client</TableHead>
                            <TableHead className="font-bold text-[#2B3210]">Total</TableHead>
                            <TableHead className="font-bold text-[#2B3210]">Statut</TableHead>
                            <TableHead className="font-bold text-[#2B3210]">Heure</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <AnimatePresence>
                            {ordersData.recentOrders.map((order, idx) => {
                              const statusConfig = getStatusBadge(order.status);
                              return (
                                <motion.tr
                                  key={order.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 20 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="hover:bg-[#DE6E27]/5 transition-colors duration-200 border-b border-[#E5E2D9]/50"
                                >
                                  <TableCell className="font-semibold text-[#2B3210] py-4">
                                    #{order.id}
                                  </TableCell>
                                  <TableCell className="text-[#505631]">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center text-white text-sm font-bold">
                                        {order.customer[0]}
                                      </div>
                                      <span>{order.customer}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="font-bold text-[#DE6E27]">
                                    {order.total}
                                  </TableCell>
                                  <TableCell>
                                    <Badge className={cn(
                                      "glass border-2 font-semibold px-3 py-1",
                                      statusConfig.bg,
                                      statusConfig.text
                                    )}>
                                      {order.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-[#505631]">{order.time}</TableCell>
                                </motion.tr>
                              );
                            })}
                          </AnimatePresence>
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-16 text-center"
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#DE6E27]/20 to-[#ff8040]/20 flex items-center justify-center"
                      >
                        <Package className="w-12 h-12 text-[#DE6E27]" />
                      </motion.div>
                      <p className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210] mb-2">
                        Aucune commande aujourd'hui
                      </p>
                      <p className="text-[#505631]">
                        Les nouvelles commandes apparaîtront ici
                      </p>
                    </motion.div>
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
        <Sidebar className="glass-strong border-r-2 border-[#DE6E27]/30 hidden lg:flex lg:flex-col shadow-2xl">
          <SidebarHeader className="border-b-2 border-[#DE6E27]/30 p-6 bg-gradient-to-br from-[#DE6E27]/5 to-[#ff8040]/5">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl font-bold text-white">N</span>
                </motion.div>
                <div>
                  <h2 className="font-['Space_Grotesk'] text-2xl font-bold bg-gradient-to-r from-[#2B3210] to-[#DE6E27] bg-clip-text text-transparent">
                    NutriFit
                  </h2>
                  <p className="text-sm text-[#505631] font-medium">Admin Panel</p>
                </div>
              </div>
              
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="glass rounded-xl p-3 border-2 border-[#DE6E27]/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2B3210] to-[#505631] flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#2B3210] text-sm truncate">Propriétaire</p>
                    <p className="text-xs text-[#505631] truncate">Accès complet</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </SidebarHeader>

          <SidebarContent className="flex-1 py-4">
            <SidebarGroup>
              <SidebarGroupLabel className="px-6 text-xs font-bold text-[#505631] uppercase tracking-wider mb-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1 px-3">
                  {menuItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          isActive={activeSection === item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={cn(
                            "relative group h-12 px-4 rounded-xl transition-all duration-300",
                            activeSection === item.id
                              ? "glass-strong bg-gradient-to-r from-[#DE6E27]/20 to-[#ff8040]/20 text-[#DE6E27] font-bold shadow-lg scale-105"
                              : "hover:glass hover:bg-[#DE6E27]/5 text-[#505631] hover:text-[#2B3210]"
                          )}
                        >
                          {activeSection === item.id && (
                            <motion.div
                              layoutId="activeSection"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#DE6E27] to-[#ff8040] rounded-r-full"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <item.icon className="w-5 h-5" />
                          </motion.div>
                          
                          <span className="font-semibold">{item.title}</span>
                          
                          <motion.div
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] rounded-full"
                          />
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </motion.div>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t-2 border-[#DE6E27]/30 p-6 bg-gradient-to-br from-[#2B3210]/5 to-[#505631]/5">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                className="w-full glass border-2 border-[#DE6E27] text-[#DE6E27] hover:bg-[#DE6E27] hover:text-white transition-all duration-300 rounded-xl h-12 font-semibold"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Se déconnecter
              </Button>
            </motion.div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1 min-w-0">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-20 shrink-0 items-center gap-4 border-b-2 border-[#DE6E27]/30 px-8 glass-strong shadow-xl sticky top-0 z-50 backdrop-blur-xl"
          >
            <SidebarTrigger className="lg:hidden -ml-1 text-[#DE6E27] hover:bg-[#DE6E27]/10 rounded-lg p-2" />
            
            <div className="flex-1 flex items-center justify-between">
              <div>
                <h1 className="font-['Space_Grotesk'] text-3xl font-bold bg-gradient-to-r from-[#2B3210] to-[#DE6E27] bg-clip-text text-transparent">
                  Dashboard Propriétaire
                </h1>
                <p className="text-sm text-[#505631] font-medium mt-1">
                  Vue d'ensemble de votre activité
                </p>
              </div>
              
              <div className="hidden md:flex items-center gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="glass border-2 border-[#DE6E27] text-[#DE6E27] hover:bg-[#DE6E27] hover:text-white rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Commande
                  </Button>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative w-12 h-12 glass-strong rounded-full flex items-center justify-center border-2 border-[#E5E2D9] hover:border-[#DE6E27] transition-colors"
                >
                  <Bell className="w-5 h-5 text-[#2B3210]" />
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-error to-warning rounded-full flex items-center justify-center text-white text-xs font-bold"
                  >
                    3
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </motion.header>
          
          <main className="flex-1 p-4 md:p-8 min-w-0 bg-gradient-to-br from-slate-50/50 via-white/30 to-emerald-50/50">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default OwnerDashboard;
