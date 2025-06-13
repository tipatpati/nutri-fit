
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenus Total</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#113B39]">{mockStats.totalRevenue}</div>
                  <p className="text-xs text-green-600">+20.1% ce mois</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                  <Users className="h-4 w-4 text-[#113B39]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#113B39]">{mockStats.totalOrders}</div>
                  <p className="text-xs text-green-600">+15% ce mois</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Livraisons en attente</CardTitle>
                  <Truck className="h-4 w-4 text-[#FF4D00]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#FF4D00]">{mockStats.pendingDeliveries}</div>
                  <p className="text-xs text-gray-600">À traiter</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ingrédients actifs</CardTitle>
                  <Package className="h-4 w-4 text-[#113B39]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#113B39]">{mockStats.activeIngredients}</div>
                  <p className="text-xs text-gray-600">En stock</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Commandes Récentes</CardTitle>
                <CardDescription>Dernières commandes passées aujourd'hui</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Commande</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Heure</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRecentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell className={getStatusColor(order.status)}>{order.status}</TableCell>
                        <TableCell>{order.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );
      case "inventory":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Gestion des Ingrédients</CardTitle>
                <CardDescription>Stock actuel et niveaux d'alerte</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ingrédient</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Unité</TableHead>
                      <TableHead>Niveau min.</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInventory.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>{item.minLevel}</TableCell>
                        <TableCell className={`flex items-center gap-2 ${getStatusColor(item.status)}`}>
                          {item.status === "Stock critique" && <AlertTriangle className="h-4 w-4" />}
                          {item.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );
      case "orders":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Toutes les Commandes</CardTitle>
                <CardDescription>Vue d'ensemble de toutes les commandes du jour</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Heure</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRecentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell className={getStatusColor(order.status)}>{order.status}</TableCell>
                        <TableCell>{order.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );
      case "deliveries":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Suivi des Livraisons</CardTitle>
                <CardDescription>Supervision de toutes les livraisons actives</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Livraison</TableHead>
                      <TableHead>Chauffeur</TableHead>
                      <TableHead>Zone</TableHead>
                      <TableHead>Commandes</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockActiveDeliveries.map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">{delivery.id}</TableCell>
                        <TableCell>{delivery.driver}</TableCell>
                        <TableCell>{delivery.zone}</TableCell>
                        <TableCell>{delivery.orders}</TableCell>
                        <TableCell className={getStatusColor(delivery.status)}>{delivery.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Paramètres</CardTitle>
                <CardDescription>Configuration du système</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Paramètres système - À développer</p>
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
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-200 p-4">
            <h2 className="text-xl font-bold text-[#113B39]">NutiFit Admin</h2>
            <p className="text-sm text-gray-600">Propriétaire</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-200 p-4">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Se déconnecter
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-xl font-semibold text-[#113B39]">Dashboard Propriétaire</h1>
          </header>
          
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default OwnerDashboard;
