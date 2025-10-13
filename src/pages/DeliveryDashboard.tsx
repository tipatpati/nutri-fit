
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
import { useIsMobile } from "@/hooks/use-mobile";
import { useDeliveryRoutes } from "@/hooks/useDeliveryRoutes";
import { useDeliveryHistory } from "@/hooks/useDeliveryHistory";

const DeliveryDashboard = () => {
  const [activeSection, setActiveSection] = useState("deliveries");
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Fetch real data
  const { data: routesData, isLoading: routesLoading } = useDeliveryRoutes(selectedDate);
  const { data: historyData, isLoading: historyLoading } = useDeliveryHistory();

  const menuItems = [
    { title: "Livraisons", icon: Truck, id: "deliveries" },
    { title: "Itinéraires", icon: MapPin, id: "routes" },
    { title: "Historique", icon: Clock, id: "history" },
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
      case "À livrer": return "text-amber-600";
      case "En route": return "text-blue-600";
      case "Livré": return "text-emerald-600";
      case "En cours": return "text-blue-600";
      case "À démarrer": return "text-slate-600";
      default: return "text-slate-600";
    }
  };

  const renderContent = () => {
    if (routesLoading || historyLoading) {
      return <div className="text-center py-8 text-blue-800">Chargement...</div>;
    }

    const allDeliveries = routesData?.routes.flatMap((route: any) => route.assignments) || [];

    switch (activeSection) {
      case "deliveries":
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-2 pt-2 md:px-6 md:pt-6">
                  <CardTitle className="text-[#FF4D00] text-xs md:text-lg lg:text-xl truncate">À Livrer</CardTitle>
                  <Clock className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-[#FF4D00] flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-2 pb-2 md:px-6 md:pb-6">
                  <div className="text-lg md:text-xl lg:text-2xl font-bold">{routesData?.stats.pending || 0}</div>
                  <p className="text-xs lg:text-sm text-gray-600">planifiées</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-2 pt-2 md:px-6 md:pt-6">
                  <CardTitle className="text-[#113B39] text-xs md:text-lg lg:text-xl truncate">En Route</CardTitle>
                  <Truck className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-[#113B39] flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-2 pb-2 md:px-6 md:pb-6">
                  <div className="text-lg md:text-xl lg:text-2xl font-bold">{routesData?.stats.inProgress || 0}</div>
                  <p className="text-xs lg:text-sm text-gray-600">en cours</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-2 pt-2 md:px-6 md:pt-6">
                  <CardTitle className="text-green-600 text-xs md:text-lg lg:text-xl truncate">Terminées</CardTitle>
                  <CheckCircle className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-600 flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-2 pb-2 md:px-6 md:pb-6">
                  <div className="text-lg md:text-xl lg:text-2xl font-bold">{routesData?.stats.completed || 0}</div>
                  <p className="text-xs lg:text-sm text-gray-600">aujourd'hui</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#113B39] text-sm md:text-lg lg:text-xl">Livraisons du Jour</CardTitle>
                <CardDescription className="text-emerald-800 text-xs md:text-sm lg:text-base">Toutes les livraisons programmées et leur statut</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                <div className="overflow-x-auto -mx-3 md:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs px-1 md:px-4">ID</TableHead>
                          <TableHead className="text-xs px-1 md:px-4 min-w-[80px]">Client</TableHead>
                          <TableHead className="text-xs px-1 md:px-4 min-w-[120px]">Adresse</TableHead>
                          <TableHead className="text-xs px-1 md:px-4">Contact</TableHead>
                          <TableHead className="text-xs px-1 md:px-4">Heure</TableHead>
                          <TableHead className="text-xs px-1 md:px-4">Distance</TableHead>
                          <TableHead className="text-xs px-1 md:px-4">Cmd</TableHead>
                          <TableHead className="text-xs px-1 md:px-4 min-w-[70px]">Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allDeliveries.length > 0 ? (
                          allDeliveries.map((delivery: any) => (
                            <TableRow key={delivery.id}>
                              <TableCell className="font-medium text-xs px-1 md:px-4">{delivery.id.slice(0, 8)}</TableCell>
                              <TableCell className="text-xs px-1 md:px-4">{delivery.customer}</TableCell>
                              <TableCell className="max-w-xs truncate text-xs px-1 md:px-4">{delivery.address}</TableCell>
                              <TableCell className="text-xs px-1 md:px-4">
                                <Phone className="w-3 h-3" />
                              </TableCell>
                              <TableCell className="text-xs px-1 md:px-4">{delivery.time}</TableCell>
                              <TableCell className="text-xs px-1 md:px-4">-</TableCell>
                              <TableCell className="text-xs px-1 md:px-4">1</TableCell>
                              <TableCell className={`${getStatusColor(delivery.status)} text-xs px-1 md:px-4`}>
                                <span className="truncate">{delivery.status}</span>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center text-blue-800 py-4 text-xs">
                              Aucune livraison pour aujourd'hui
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "routes":
        return (
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#113B39] text-sm md:text-lg lg:text-xl">Itinéraires Optimisés</CardTitle>
                <CardDescription className="text-emerald-800 text-xs md:text-sm lg:text-base">Planification des tournées de livraison</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                <div className="overflow-x-auto -mx-3 md:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs px-2 md:px-4">Itinéraire</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[80px]">Zone</TableHead>
                          <TableHead className="text-xs px-2 md:px-4">Livraisons</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[80px]">Temps</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[80px]">Distance</TableHead>
                          <TableHead className="text-xs px-2 md:px-4">Statut</TableHead>
                          <TableHead className="text-xs px-2 md:px-4">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {routesData?.routes && routesData.routes.length > 0 ? (
                          routesData.routes.map((route: any) => (
                            <TableRow key={route.id}>
                              <TableCell className="font-medium text-xs px-2 md:px-4">{route.id.slice(0, 8)}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{route.zone}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{route.deliveries}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                                  <span className="truncate">{route.estimatedTime}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{route.distance}</TableCell>
                              <TableCell className={`${getStatusColor(route.status)} text-xs px-2 md:px-4`}>
                                <span className="truncate">{route.status}</span>
                              </TableCell>
                              <TableCell className="px-2 md:px-4">
                                <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs h-7 px-2">
                                  <Navigation className="w-3 h-3 flex-shrink-0" />
                                  <span className="hidden sm:inline">GPS</span>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-blue-800 py-4 text-xs">
                              Aucun itinéraire planifié
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "history":
        return (
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#113B39] text-sm md:text-lg lg:text-xl">Historique des Performances</CardTitle>
                <CardDescription className="text-emerald-800 text-xs md:text-sm lg:text-base">Statistiques des livraisons passées</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                <div className="overflow-x-auto -mx-3 md:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[100px]">Date</TableHead>
                          <TableHead className="text-xs px-2 md:px-4">Livraisons</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[80px]">Temps moyen</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[90px]">Satisfaction</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {historyData?.history && historyData.history.length > 0 ? (
                          historyData.history.map((day: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs px-2 md:px-4">{day.date}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{day.deliveries}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{day.avgTime}</TableCell>
                              <TableCell className="text-green-600 font-medium text-xs px-2 md:px-4">{day.efficiency}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-blue-800 py-4 text-xs">
                              Aucun historique disponible
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <Card>
                    <CardContent className="pt-4 md:pt-6 px-3 pb-3 md:px-6 md:pb-6">
                      <div className="text-lg md:text-xl lg:text-2xl font-bold text-[#113B39]">{historyData?.weeklyStats.avgDeliveries || 0}</div>
                      <p className="text-xs lg:text-sm text-gray-600">Moyenne hebdomadaire</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 md:pt-6 px-3 pb-3 md:px-6 md:pb-6">
                      <div className="text-lg md:text-xl lg:text-2xl font-bold text-[#FF4D00]">{historyData?.weeklyStats.totalDeliveries || 0}</div>
                      <p className="text-xs lg:text-sm text-gray-600">Total livraisons (30j)</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 md:pt-6 px-3 pb-3 md:px-6 md:pb-6">
                      <div className="text-lg md:text-xl lg:text-2xl font-bold text-green-600">{historyData?.weeklyStats.completionRate || '0%'}</div>
                      <p className="text-xs lg:text-sm text-gray-600">Taux de réussite</p>
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-x-hidden">
        <Sidebar className={`border-r border-blue-100/50 bg-white/90 backdrop-blur-sm ${isMobile ? 'hidden' : 'block'}`}>
          <SidebarHeader className="border-b border-blue-100/50 p-3 sm:p-4 md:p-6 bg-gradient-to-r from-blue-50/80 to-blue-100/40">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">NutiFit Delivery</h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium">Livreur</p>
          </SidebarHeader>
          <SidebarContent className="bg-gradient-to-b from-white/95 to-blue-50/50">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs sm:text-sm font-semibold text-blue-700">Delivery</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                        className="text-xs sm:text-sm md:text-base hover:bg-blue-50/80 transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-100 data-[active=true]:to-blue-50 data-[active=true]:text-blue-800 data-[active=true]:font-semibold rounded-xl"
                      >
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-blue-100/50 p-3 sm:p-4 md:p-6 bg-gradient-to-r from-blue-50/80 to-blue-100/40">
            <Button variant="outline" className="w-full justify-start text-xs sm:text-sm md:text-base border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-xl" onClick={handleLogout}>
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
              <span className="truncate">Se déconnecter</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1 min-w-0">
          <header className="flex h-14 sm:h-16 md:h-20 shrink-0 items-center gap-2 sm:gap-3 border-b border-blue-100/50 px-2 sm:px-4 md:px-8 bg-white/90 backdrop-blur-sm shadow-sm">
            <SidebarTrigger className="-ml-1 text-blue-700 hover:bg-blue-50 rounded-lg p-1 sm:p-2" />
            <h1 className="text-sm sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent truncate">Dashboard Livraisons</h1>
          </header>
          
          <main className="flex-1 p-2 sm:p-4 md:p-8 min-w-0 bg-gradient-to-br from-slate-50/50 via-white/30 to-blue-50/50 overflow-x-hidden">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DeliveryDashboard;
