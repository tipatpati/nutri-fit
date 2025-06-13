import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, MapPin, Clock, CheckCircle, LogOut, Navigation, Phone } from "lucide-react";
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

const DeliveryDashboard = () => {
  const [activeSection, setActiveSection] = useState("deliveries");
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { title: "Livraisons", icon: Truck, id: "deliveries" },
    { title: "Itinéraires", icon: MapPin, id: "routes" },
    { title: "Historique", icon: Clock, id: "history" },
  ];

  // Enhanced delivery data
  const mockDeliveryStats = {
    pending: 8,
    inProgress: 3,
    completed: 12
  };

  const mockDeliveries = [
    { 
      id: "LIV-001", 
      customer: "Marie Dubois",
      address: "123 Rue de la Paix, 75015 Paris", 
      phone: "06 12 34 56 78",
      status: "À livrer", 
      time: "14:30",
      distance: "2.3 km",
      orders: 2
    },
    { 
      id: "LIV-002", 
      customer: "Jean Martin",
      address: "456 Avenue Victor Hugo, 69001 Lyon", 
      phone: "06 87 65 43 21",
      status: "En route", 
      time: "15:00",
      distance: "1.8 km",
      orders: 1
    },
    { 
      id: "LIV-003", 
      customer: "Sophie Laurent",
      address: "789 Boulevard Saint-Germain, 75006 Paris", 
      phone: "06 98 76 54 32",
      status: "À livrer", 
      time: "15:30",
      distance: "3.1 km",
      orders: 3
    },
    { 
      id: "LIV-004", 
      customer: "Pierre Rousseau",
      address: "321 Rue de Rivoli, 75001 Paris", 
      phone: "06 11 22 33 44",
      status: "Livré", 
      time: "13:30",
      distance: "1.5 km",
      orders: 1
    }
  ];

  const mockRoutes = [
    {
      id: "ROUTE-A",
      zone: "Paris Centre",
      deliveries: 6,
      estimatedTime: "2h 30min",
      totalDistance: "12.5 km",
      status: "En cours"
    },
    {
      id: "ROUTE-B", 
      zone: "Paris Sud",
      deliveries: 4,
      estimatedTime: "1h 45min",
      totalDistance: "8.2 km",
      status: "À démarrer"
    }
  ];

  const mockHistory = [
    { date: "Aujourd'hui", deliveries: 12, avgTime: "25 min", satisfaction: "98%" },
    { date: "Hier", deliveries: 15, avgTime: "23 min", satisfaction: "96%" },
    { date: "Il y a 2 jours", deliveries: 18, avgTime: "28 min", satisfaction: "94%" },
    { date: "Il y a 3 jours", deliveries: 14, avgTime: "26 min", satisfaction: "97%" }
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
      case "À livrer": return "text-orange-600";
      case "En route": return "text-blue-600";
      case "Livré": return "text-green-600";
      case "En cours": return "text-blue-600";
      case "À démarrer": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "deliveries":
        return (
          <div className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[#FF4D00] text-lg lg:text-xl">À Livrer</CardTitle>
                  <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-[#FF4D00]" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl lg:text-2xl font-bold">{mockDeliveryStats.pending}</div>
                  <p className="text-xs lg:text-sm text-gray-600">livraisons en attente</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[#113B39] text-lg lg:text-xl">En Route</CardTitle>
                  <Truck className="h-4 w-4 lg:h-5 lg:w-5 text-[#113B39]" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl lg:text-2xl font-bold">{mockDeliveryStats.inProgress}</div>
                  <p className="text-xs lg:text-sm text-gray-600">livraisons en cours</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-green-600 text-lg lg:text-xl">Terminées</CardTitle>
                  <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl lg:text-2xl font-bold">{mockDeliveryStats.completed}</div>
                  <p className="text-xs lg:text-sm text-gray-600">livrées aujourd'hui</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39] text-lg lg:text-xl">Livraisons du Jour</CardTitle>
                <CardDescription className="text-sm lg:text-base">Toutes les livraisons programmées et leur statut</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs lg:text-sm">ID</TableHead>
                        <TableHead className="text-xs lg:text-sm">Client</TableHead>
                        <TableHead className="text-xs lg:text-sm min-w-[200px]">Adresse</TableHead>
                        <TableHead className="text-xs lg:text-sm">Contact</TableHead>
                        <TableHead className="text-xs lg:text-sm">Heure</TableHead>
                        <TableHead className="text-xs lg:text-sm">Distance</TableHead>
                        <TableHead className="text-xs lg:text-sm">Commandes</TableHead>
                        <TableHead className="text-xs lg:text-sm">Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockDeliveries.map((delivery) => (
                        <TableRow key={delivery.id}>
                          <TableCell className="font-medium text-xs lg:text-sm">{delivery.id}</TableCell>
                          <TableCell className="text-xs lg:text-sm">{delivery.customer}</TableCell>
                          <TableCell className="max-w-xs truncate text-xs lg:text-sm">{delivery.address}</TableCell>
                          <TableCell className="text-xs lg:text-sm">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span className="hidden sm:inline">{delivery.phone}</span>
                              <span className="sm:hidden">Contact</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs lg:text-sm">{delivery.time}</TableCell>
                          <TableCell className="text-xs lg:text-sm">{delivery.distance}</TableCell>
                          <TableCell className="text-xs lg:text-sm">{delivery.orders}</TableCell>
                          <TableCell className={`${getStatusColor(delivery.status)} text-xs lg:text-sm`}>
                            {delivery.status}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "routes":
        return (
          <div className="space-y-4 lg:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39] text-lg lg:text-xl">Itinéraires Optimisés</CardTitle>
                <CardDescription className="text-sm lg:text-base">Planification des tournées de livraison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs lg:text-sm">Itinéraire</TableHead>
                        <TableHead className="text-xs lg:text-sm">Zone</TableHead>
                        <TableHead className="text-xs lg:text-sm">Livraisons</TableHead>
                        <TableHead className="text-xs lg:text-sm">Temps estimé</TableHead>
                        <TableHead className="text-xs lg:text-sm">Distance totale</TableHead>
                        <TableHead className="text-xs lg:text-sm">Statut</TableHead>
                        <TableHead className="text-xs lg:text-sm">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockRoutes.map((route) => (
                        <TableRow key={route.id}>
                          <TableCell className="font-medium text-xs lg:text-sm">{route.id}</TableCell>
                          <TableCell className="text-xs lg:text-sm">{route.zone}</TableCell>
                          <TableCell className="text-xs lg:text-sm">{route.deliveries}</TableCell>
                          <TableCell className="text-xs lg:text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                              {route.estimatedTime}
                            </div>
                          </TableCell>
                          <TableCell className="text-xs lg:text-sm">{route.totalDistance}</TableCell>
                          <TableCell className={`${getStatusColor(route.status)} text-xs lg:text-sm`}>
                            {route.status}
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
                              <Navigation className="w-3 h-3" />
                              <span className="hidden sm:inline">GPS</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "history":
        return (
          <div className="space-y-4 lg:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39] text-lg lg:text-xl">Historique des Performances</CardTitle>
                <CardDescription className="text-sm lg:text-base">Statistiques des livraisons passées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs lg:text-sm">Date</TableHead>
                        <TableHead className="text-xs lg:text-sm">Livraisons</TableHead>
                        <TableHead className="text-xs lg:text-sm">Temps moyen</TableHead>
                        <TableHead className="text-xs lg:text-sm">Satisfaction client</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockHistory.map((day, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-xs lg:text-sm">{day.date}</TableCell>
                          <TableCell className="text-xs lg:text-sm">{day.deliveries}</TableCell>
                          <TableCell className="text-xs lg:text-sm">{day.avgTime}</TableCell>
                          <TableCell className="text-green-600 font-medium text-xs lg:text-sm">{day.satisfaction}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-xl lg:text-2xl font-bold text-[#113B39]">59</div>
                      <p className="text-xs lg:text-sm text-gray-600">Livraisons cette semaine</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-xl lg:text-2xl font-bold text-[#FF4D00]">25.5 min</div>
                      <p className="text-xs lg:text-sm text-gray-600">Temps moyen par livraison</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-xl lg:text-2xl font-bold text-green-600">96.3%</div>
                      <p className="text-xs lg:text-sm text-gray-600">Satisfaction moyenne</p>
                    </CardContent>
                  </Card>
                </div>
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
          <header className="flex h-14 lg:h-16 shrink-0 items-center gap-2 border-b px-4 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-lg lg:text-xl font-semibold text-[#113B39]">Dashboard Livraisons</h1>
          </header>
          
          <main className="flex-1 p-4 lg:p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DeliveryDashboard;
