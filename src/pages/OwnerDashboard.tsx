
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Package, Users, Truck, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Mock data
  const mockStats = {
    totalRevenue: "€12,450",
    totalOrders: 156,
    pendingDeliveries: 23,
    activeIngredients: 48
  };

  const handleLogout = () => {
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès"
    });
    navigate("/admin");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "analytics":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Revenus Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#113B39]">{mockStats.totalRevenue}</div>
                  <p className="text-xs text-green-600">+20.1% ce mois</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#113B39]">{mockStats.totalOrders}</div>
                  <p className="text-xs text-green-600">+15% ce mois</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Livraisons en attente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#FF4D00]">{mockStats.pendingDeliveries}</div>
                  <p className="text-xs text-gray-600">À traiter</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Ingrédients actifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#113B39]">{mockStats.activeIngredients}</div>
                  <p className="text-xs text-gray-600">En stock</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "inventory":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Gestion des Ingrédients</CardTitle>
                <CardDescription>Définir les recettes et quantités pour chaque repas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Interface de gestion des ingrédients - À développer</p>
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
                <CardDescription>Vue d'ensemble de toutes les commandes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Liste des commandes - À développer</p>
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
                <CardDescription>Supervision de toutes les livraisons</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Interface de suivi - À développer</p>
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
