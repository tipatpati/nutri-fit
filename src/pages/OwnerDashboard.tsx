
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

const OwnerDashboard = () => {
  const [activeSection, setActiveSection] = useState("analytics");
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { title: "Analytics", icon: BarChart3, id: "analytics" },
    { title: "Inventory", icon: Package, id: "inventory" },
    { title: "Orders", icon: Users, id: "orders" },
    { title: "Deliveries", icon: Truck, id: "deliveries" },
    { title: "Settings", icon: Settings, id: "settings" },
  ];

  // Enhanced mock data
  const mockStats = {
    totalRevenue: "€12,450",
    totalOrders: 156,
    pendingDeliveries: 23,
    activeIngredients: 48
  };

  const mockRecentOrders = [
    { id: "#ORD-001", customer: "Marie Dubois", total: "€45.50", status: "Confirmé", time: "14:30" },
    { id: "#ORD-002", customer: "Jean Martin", total: "€32.00", status: "En préparation", time: "14:15" },
    { id: "#ORD-003", customer: "Sophie Laurent", total: "€58.75", status: "Livré", time: "13:45" },
    { id: "#ORD-004", customer: "Pierre Rousseau", total: "€41.25", status: "En route", time: "13:30" },
    { id: "#ORD-005", customer: "Claire Moreau", total: "€37.80", status: "Confirmé", time: "13:00" }
  ];

  const mockInventory = [
    { name: "Poulet Bio", quantity: 25, unit: "kg", status: "En stock", minLevel: 10 },
    { name: "Quinoa", quantity: 8, unit: "kg", status: "Stock faible", minLevel: 10 },
    { name: "Brocoli", quantity: 15, unit: "kg", status: "En stock", minLevel: 5 },
    { name: "Huile d'olive", quantity: 2, unit: "L", status: "Stock critique", minLevel: 5 },
    { name: "Avocat", quantity: 30, unit: "pcs", status: "En stock", minLevel: 20 }
  ];

  const mockActiveDeliveries = [
    { id: "LIV-001", driver: "Marc Leclerc", zone: "Paris 15e", orders: 5, status: "En route" },
    { id: "LIV-002", driver: "Julie Petit", zone: "Boulogne", orders: 3, status: "En cours" },
    { id: "LIV-003", driver: "Thomas Blanc", zone: "Neuilly", orders: 7, status: "En préparation" }
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
      case "En stock": return "text-green-600";
      case "Stock faible": return "text-yellow-600";
      case "Stock critique": return "text-red-600";
      case "Confirmé": return "text-blue-600";
      case "En préparation": return "text-yellow-600";
      case "En route": return "text-purple-600";
      case "Livré": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "analytics":
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              <Card className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 pt-3 md:px-6 md:pt-6">
                  <CardTitle className="text-xs md:text-sm font-medium truncate">Revenus Total</CardTitle>
                  <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-green-600 flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="text-lg md:text-2xl font-bold text-[#113B39] truncate">{mockStats.totalRevenue}</div>
                  <p className="text-xs text-green-600">+20.1% ce mois</p>
                </CardContent>
              </Card>
              <Card className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 pt-3 md:px-6 md:pt-6">
                  <CardTitle className="text-xs md:text-sm font-medium">Commandes</CardTitle>
                  <Users className="h-3 w-3 md:h-4 md:w-4 text-[#113B39] flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="text-lg md:text-2xl font-bold text-[#113B39]">{mockStats.totalOrders}</div>
                  <p className="text-xs text-green-600">+15% ce mois</p>
                </CardContent>
              </Card>
              <Card className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 pt-3 md:px-6 md:pt-6">
                  <CardTitle className="text-xs md:text-sm font-medium truncate">Livraisons</CardTitle>
                  <Truck className="h-3 w-3 md:h-4 md:w-4 text-[#FF4D00] flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="text-lg md:text-2xl font-bold text-[#FF4D00]">{mockStats.pendingDeliveries}</div>
                  <p className="text-xs text-gray-600">À traiter</p>
                </CardContent>
              </Card>
              <Card className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 pt-3 md:px-6 md:pt-6">
                  <CardTitle className="text-xs md:text-sm font-medium truncate">Ingrédients</CardTitle>
                  <Package className="h-3 w-3 md:h-4 md:w-4 text-[#113B39] flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="text-lg md:text-2xl font-bold text-[#113B39]">{mockStats.activeIngredients}</div>
                  <p className="text-xs text-gray-600">En stock</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#113B39] text-sm md:text-base">Commandes Récentes</CardTitle>
                <CardDescription className="text-xs md:text-sm">Dernières commandes passées aujourd'hui</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
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
                        {mockRecentOrders.map((order) => (
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
              </CardContent>
            </Card>
          </div>
        );
      case "inventory":
        return (
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#113B39] text-sm md:text-base">Gestion des Ingrédients</CardTitle>
                <CardDescription className="text-xs md:text-sm">Stock actuel et niveaux d'alerte</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
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
                        {mockInventory.map((item, index) => (
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
              </CardContent>
            </Card>
          </div>
        );
      case "orders":
        return (
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#113B39] text-sm md:text-base">Toutes les Commandes</CardTitle>
                <CardDescription className="text-xs md:text-sm">Vue d'ensemble de toutes les commandes du jour</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
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
                        {mockRecentOrders.map((order) => (
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
              </CardContent>
            </Card>
          </div>
        );
      case "deliveries":
        return (
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#113B39] text-sm md:text-base">Suivi des Livraisons</CardTitle>
                <CardDescription className="text-xs md:text-sm">Supervision de toutes les livraisons actives</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
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
                        {mockActiveDeliveries.map((delivery) => (
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
              </CardContent>
            </Card>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#113B39] text-sm md:text-base">Paramètres</CardTitle>
                <CardDescription className="text-xs md:text-sm">Configuration du système</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                <p className="text-gray-600 text-xs md:text-sm">Paramètres système - À développer</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-gray-200 hidden lg:block">
          <SidebarHeader className="border-b border-gray-200 p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-[#113B39]">NutiFit Admin</h2>
            <p className="text-xs md:text-sm text-gray-600">Propriétaire</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs">Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                        className="text-xs md:text-sm"
                      >
                        <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-200 p-3 md:p-4">
            <Button variant="outline" className="w-full justify-start text-xs md:text-sm" onClick={handleLogout}>
              <LogOut className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              Se déconnecter
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1 min-w-0">
          <header className="flex h-12 md:h-16 shrink-0 items-center gap-2 border-b px-3 md:px-6">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-sm md:text-xl font-semibold text-[#113B39] truncate">Dashboard Propriétaire</h1>
          </header>
          
          <main className="flex-1 p-3 md:p-6 min-w-0">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default OwnerDashboard;
