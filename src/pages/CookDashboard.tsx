
import { ChefHat, ClipboardList, Calculator, Package, LogOut } from "lucide-react";
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

const CookDashboard = () => {
  const menuItems = [
    { title: "Commandes", icon: ClipboardList, id: "orders" },
    { title: "Calcul Ingrédients", icon: Calculator, id: "ingredients" },
    { title: "Recettes", icon: ChefHat, id: "recipes" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-200 p-4">
            <h2 className="text-xl font-bold text-[#113B39]">NutiFit Kitchen</h2>
            <p className="text-sm text-gray-600">Cuisinier</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Kitchen</SidebarGroupLabel>
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
            <h1 className="text-xl font-semibold text-[#113B39]">Dashboard Cuisine</h1>
          </header>
          
          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#FF4D00]">Commandes du Jour</CardTitle>
                  <CardDescription>Organiser par repas</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Voir toutes les commandes organisées par les 5 types de repas</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#FF4D00]">Calcul Ingrédients</CardTitle>
                  <CardDescription>Quantités nécessaires</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Calculer automatiquement les quantités d'ingrédients</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">5 Types de Repas</CardTitle>
                <CardDescription>Aperçu rapide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {['Repas 1', 'Repas 2', 'Repas 3', 'Repas 4', 'Repas 5'].map((meal, index) => (
                    <div key={index} className="p-4 border rounded-lg text-center">
                      <Package className="w-8 h-8 mx-auto mb-2 text-[#FF4D00]" />
                      <p className="font-medium">{meal}</p>
                      <p className="text-sm text-gray-600">0 commandes</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CookDashboard;
