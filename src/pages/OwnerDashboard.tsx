
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

const OwnerDashboard = () => {
  const menuItems = [
    { title: "Analytics", icon: BarChart3, id: "analytics" },
    { title: "Inventory", icon: Package, id: "inventory" },
    { title: "Orders", icon: Users, id: "orders" },
    { title: "Deliveries", icon: Truck, id: "deliveries" },
    { title: "Settings", icon: Settings, id: "settings" },
  ];

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
                      <SidebarMenuButton>
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
            <Button variant="outline" className="w-full justify-start">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#113B39]">Analytics</CardTitle>
                  <CardDescription>Vue d'ensemble des performances</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Accès complet aux analytics, revenus, et statistiques</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#113B39]">Inventory</CardTitle>
                  <CardDescription>Gestion des ingrédients</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Définir les recettes et quantités d'ingrédients</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#113B39]">Orders & Deliveries</CardTitle>
                  <CardDescription>Supervision complète</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Voir toutes les commandes et livraisons</p>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default OwnerDashboard;
