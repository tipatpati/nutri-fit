
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, MapPin, Clock, CheckCircle, LogOut } from "lucide-react";
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

const DeliveryDashboard = () => {
  const [activeSection, setActiveSection] = useState("deliveries");
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { title: "Livraisons", icon: Truck, id: "deliveries" },
    { title: "Itinéraires", icon: MapPin, id: "routes" },
    { title: "Historique", icon: Clock, id: "history" },
  ];

  // Mock delivery data
  const mockDeliveryStats = {
    pending: 8,
    inProgress: 3,
    completed: 12
  };

  const mockDeliveries = [
    { id: 1, address: "123 Rue de la Paix, Paris", status: "À livrer", time: "14:30" },
    { id: 2, address: "456 Avenue Victor Hugo, Lyon", status: "En route", time: "15:00" },
    { id: 3, address: "789 Boulevard Saint-Germain, Paris", status: "À livrer", time: "15:30" }
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
      case "deliveries":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#FF4D00]">À Livrer</CardTitle>
                  <CardDescription>Commandes en attente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="w-8 h-8 text-[#FF4D00]" />
                    <div>
                      <p className="text-2xl font-bold">{mockDeliveryStats.pending}</p>
                      <p className="text-sm text-gray-600">livraisons</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#113B39]">En Route</CardTitle>
                  <CardDescription>Livraisons en cours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Truck className="w-8 h-8 text-[#113B39]" />
                    <div>
                      <p className="text-2xl font-bold">{mockDeliveryStats.inProgress}</p>
                      <p className="text-sm text-gray-600">en cours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Terminées</CardTitle>
                  <CardDescription>Livraisons du jour</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{mockDeliveryStats.completed}</p>
                      <p className="text-sm text-gray-600">terminées</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Livraisons Actives</CardTitle>
                <CardDescription>Liste des livraisons du jour</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDeliveries.map((delivery) => (
                    <div key={delivery.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{delivery.address}</p>
                        <p className="text-sm text-gray-600">Heure prévue: {delivery.time}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          delivery.status === "En route" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-orange-100 text-orange-800"
                        }`}>
                          {delivery.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "routes":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Itinéraire du Jour</CardTitle>
                <CardDescription>Planification optimisée des livraisons</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Interface de planification d'itinéraires - À développer</p>
              </CardContent>
            </Card>
          </div>
        );
      case "history":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Historique des Livraisons</CardTitle>
                <CardDescription>Toutes les livraisons passées</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Historique des livraisons - À développer</p>
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
            <h2 className="text-xl font-bold text-[#113B39]">NutiFit Delivery</h2>
            <p className="text-sm text-gray-600">Livreur</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Delivery</SidebarGroupLabel>
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
            <h1 className="text-xl font-semibold text-[#113B39]">Dashboard Livraisons</h1>
          </header>
          
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DeliveryDashboard;
