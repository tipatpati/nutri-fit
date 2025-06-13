
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";

const CookDashboard = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { title: "Commandes", icon: ClipboardList, id: "orders" },
    { title: "Calcul Ingrédients", icon: Calculator, id: "ingredients" },
    { title: "Recettes", icon: ChefHat, id: "recipes" },
  ];

  // Mock data for orders by meal type
  const mockOrdersByMeal = [
    { name: "Repas 1", orders: 12, description: "Petit-déjeuner protéiné" },
    { name: "Repas 2", orders: 8, description: "Collation matinale" },
    { name: "Repas 3", orders: 15, description: "Déjeuner équilibré" },
    { name: "Repas 4", orders: 6, description: "Collation après-midi" },
    { name: "Repas 5", orders: 10, description: "Dîner léger" }
  ];

  const handleLogout = () => {
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès"
    });
    navigate("/admin");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#FF4D00]">Commandes du Jour</CardTitle>
                  <CardDescription>Total: {mockOrdersByMeal.reduce((sum, meal) => sum + meal.orders, 0)} commandes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Organisées par type de repas</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#FF4D00]">Statut Préparation</CardTitle>
                  <CardDescription>Suivi en temps réel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>En préparation</span>
                      <span className="font-bold text-[#FF4D00]">25</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prêt</span>
                      <span className="font-bold text-green-600">26</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Commandes par Type de Repas</CardTitle>
                <CardDescription>Répartition des commandes du jour</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {mockOrdersByMeal.map((meal, index) => (
                    <div key={index} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                      <Package className="w-8 h-8 mx-auto mb-2 text-[#FF4D00]" />
                      <p className="font-medium">{meal.name}</p>
                      <p className="text-2xl font-bold text-[#113B39] my-2">{meal.orders}</p>
                      <p className="text-sm text-gray-600">{meal.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "ingredients":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#FF4D00]">Calcul des Ingrédients</CardTitle>
                <CardDescription>Quantités nécessaires pour toutes les commandes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Interface de calcul automatique - À développer</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Cette section calculera automatiquement les quantités d'ingrédients
                    nécessaires basées sur les recettes définies par le propriétaire.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "recipes":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Recettes</CardTitle>
                <CardDescription>Consultation des recettes pour chaque repas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Bibliothèque des recettes - À développer</p>
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
            <h1 className="text-xl font-semibold text-[#113B39]">Dashboard Cuisine</h1>
          </header>
          
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CookDashboard;
