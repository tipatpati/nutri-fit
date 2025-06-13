
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[#FF4D00]">À Livrer</CardTitle>
                  <Clock className="h-4 w-4 text-[#FF4D00]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockDeliveryStats.pending}</div>
                  <p className="text-xs text-gray-600">livraisons en attente</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[#113B39]">En Route</CardTitle>
                  <Truck className="h-4 w-4 text-[#113B39]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockDeliveryStats.inProgress}</div>
                  <p className="text-xs text-gray-600">livraisons en cours</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-green-600">Terminées</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockDeliveryStats.completed}</div>
                  <p className="text-xs text-gray-600">livrées aujourd'hui</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Livraisons du Jour</CardTitle>
                <CardDescription>Toutes les livraisons programmées et leur statut</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Adresse</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Heure</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Commandes</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDeliveries.map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">{delivery.id}</TableCell>
                        <TableCell>{delivery.customer}</TableCell>
                        <TableCell className="max-w-xs truncate">{delivery.address}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {delivery.phone}
                          </div>
                        </TableCell>
                        <TableCell>{delivery.time}</TableCell>
                        <TableCell>{delivery.distance}</TableCell>
                        <TableCell>{delivery.orders}</TableCell>
                        <TableCell className={getStatusColor(delivery.status)}>
                          {delivery.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );
      case "routes":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Itinéraires Optimisés</CardTitle>
                <CardDescription>Planification des tournées de livraison</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Itinéraire</TableHead>
                      <TableHead>Zone</TableHead>
                      <TableHead>Livraisons</TableHead>
                      <TableHead>Temps estimé</TableHead>
                      <TableHead>Distance totale</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRoutes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell className="font-medium">{route.id}</TableCell>
                        <TableCell>{route.zone}</TableCell>
                        <TableCell>{route.deliveries}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {route.estimatedTime}
                          </div>
                        </TableCell>
                        <TableCell>{route.totalDistance}</TableCell>
                        <TableCell className={getStatusColor(route.status)}>
                          {route.status}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Navigation className="w-3 h-3" />
                            GPS
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );
      case "history":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#113B39]">Historique des Performances</CardTitle>
                <CardDescription>Statistiques des livraisons passées</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Livraisons</TableHead>
                      <TableHead>Temps moyen</TableHead>
                      <TableHead>Satisfaction client</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockHistory.map((day, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{day.date}</TableCell>
                        <TableCell>{day.deliveries}</TableCell>
                        <TableCell>{day.avgTime}</TableCell>
                        <TableCell className="text-green-600 font-medium">{day.satisfaction}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-[#113B39]">59</div>
                      <p className="text-sm text-gray-600">Livraisons cette semaine</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-[#FF4D00]">25.5 min</div>
                      <p className="text-sm text-gray-600">Temps moyen par livraison</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-green-600">96.3%</div>
                      <p className="text-sm text-gray-600">Satisfaction moyenne</p>
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
