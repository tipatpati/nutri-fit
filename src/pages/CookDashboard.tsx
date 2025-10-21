import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChefHat, ClipboardList, Calculator, Package, LogOut, Clock, CheckCircle2, Users, Loader2 } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCookOrders } from "@/hooks/useCookOrders";
import { useCookRecipes } from "@/hooks/useCookRecipes";

const CookDashboard = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [selectedDate, setSelectedDate] = useState("2025-01-03");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Fetch real data
  const { data: ordersData, isLoading: ordersLoading } = useCookOrders(selectedDate);
  const { data: recipes, isLoading: recipesLoading } = useCookRecipes();

  const menuItems = [
    { title: "Commandes", icon: ClipboardList, id: "orders" },
    { title: "Calcul Ingrédients", icon: Calculator, id: "ingredients" },
    { title: "Recettes", icon: ChefHat, id: "recipes" },
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
      case "OK": return "text-emerald-600";
      case "Manque": return "text-red-600";
      default: return "text-slate-600";
    }
  };

  const totalMealsOrdered = ordersData?.mealStats.reduce((sum: number, meal: any) => sum + meal.totalOrders, 0) || 0;
  const totalMealsPrepared = ordersData?.mealStats.reduce((sum: number, meal: any) => sum + meal.prepared, 0) || 0;
  const totalMealsRemaining = ordersData?.mealStats.reduce((sum: number, meal: any) => sum + meal.remaining, 0) || 0;

  const renderContent = () => {
    if (ordersLoading || recipesLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            <Loader2 className="h-10 w-10 text-[#DE6E27]" />
          </motion.div>
        </div>
      );
    }
    switch (activeSection) {
      case "orders":
        return (
          <div className="space-y-4 md:space-y-6">
            {/* Date selector */}
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#FF4D00] text-sm md:text-lg lg:text-xl">Date de Production</CardTitle>
                <CardDescription className="text-emerald-800 text-xs md:text-sm lg:text-base">Sélectionnez la date pour voir les commandes</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                <select 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="2025-01-03">Vendredi 3 Janvier 2025</option>
                  <option value="2025-01-04">Samedi 4 Janvier 2025</option>
                  <option value="2025-01-05">Dimanche 5 Janvier 2025</option>
                </select>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="glass hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 pt-3 md:px-6 md:pt-6">
                    <CardTitle className="text-xs md:text-sm font-medium text-[#2B3210]">Total Commandes</CardTitle>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                    <div className="text-lg md:text-3xl font-bold text-[#2B3210]">{totalMealsOrdered}</div>
                    <p className="text-xs text-[#505631]">repas pour le {new Date(selectedDate).toLocaleDateString('fr-FR')}</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="glass hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 pt-3 md:px-6 md:pt-6">
                    <CardTitle className="text-xs md:text-sm font-medium text-[#2B3210]">Progression</CardTitle>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#505631] text-xs md:text-sm">Progression globale</span>
                        <span className="font-bold text-[#2B3210] text-xs md:text-sm">
                          {totalMealsOrdered > 0 ? Math.round((totalMealsPrepared / totalMealsOrdered) * 100) : 0}%
                        </span>
                      </div>
                      <div className="w-full bg-[#E5E2D9] rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#DE6E27] to-[#ff8040] h-2 rounded-full transition-all duration-500" 
                          style={{ 
                            width: `${totalMealsOrdered > 0 ? (totalMealsPrepared / totalMealsOrdered) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="glass hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 pt-3 md:px-6 md:pt-6">
                    <CardTitle className="text-xs md:text-sm font-medium text-[#2B3210]">Status</CardTitle>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                    <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6">
                      <div className="text-center">
                        <p className="text-lg md:text-xl lg:text-2xl font-bold text-success">{totalMealsPrepared}</p>
                        <p className="text-xs lg:text-sm text-[#505631]">Préparées</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#DE6E27]">{totalMealsRemaining}</p>
                        <p className="text-xs lg:text-sm text-[#505631]">Restantes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#113B39] text-sm md:text-lg lg:text-xl">Commandes par Repas</CardTitle>
                <CardDescription className="text-emerald-800 text-xs md:text-sm lg:text-base">Répartition et progression des commandes du {new Date(selectedDate).toLocaleDateString('fr-FR')}</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                {ordersData?.mealStats && ordersData.mealStats.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
                    {ordersData.mealStats.map((meal: any, index: number) => (
                      <div key={index} className="p-2 md:p-3 lg:p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-center gap-1 md:gap-2 mb-1 md:mb-2">
                          <Package className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#FF4D00]" />
                          {meal.remaining === 0 && <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-green-600" />}
                        </div>
                        <p className="font-medium text-emerald-800 text-xs md:text-sm lg:text-base line-clamp-2">{meal.name}</p>
                        <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#113B39] my-1 md:my-2">{meal.totalOrders}</p>
                        <p className="text-xs lg:text-sm text-gray-600 mb-1 md:mb-2 line-clamp-2">{meal.category}</p>
                        <div className="text-xs space-y-1">
                          <p className="text-green-600">Préparées: {meal.prepared}</p>
                          <p className="text-[#FF4D00]">Restantes: {meal.remaining}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-emerald-800">Aucune commande pour cette date</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      case "ingredients":
        return (
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#FF4D00] text-sm md:text-lg lg:text-xl">Calcul des Ingrédients</CardTitle>
                <CardDescription className="text-emerald-800 text-xs md:text-sm lg:text-base">Quantités nécessaires vs disponibles pour le {new Date(selectedDate).toLocaleDateString('fr-FR')}</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                <div className="overflow-x-auto -mx-3 md:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[100px]">Ingrédient</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[80px]">Nécessaire</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[80px]">Disponible</TableHead>
                          <TableHead className="text-xs px-2 md:px-4">Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ordersData?.ingredientRequirements && ordersData.ingredientRequirements.length > 0 ? (
                          ordersData.ingredientRequirements.map((item: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs px-2 md:px-4">{item.name}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{Math.round(item.required)} {item.unit}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{item.available} {item.unit}</TableCell>
                              <TableCell className={`${getStatusColor(item.status)} text-xs px-2 md:px-4`}>
                                {item.status}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-emerald-800 py-4 text-xs">
                              Aucun ingrédient requis pour cette date
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                {ordersData?.ingredientRequirements?.some((item: any) => item.status === "Manque") && (
                  <div className="mt-3 md:mt-4 p-2 md:p-3 lg:p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-xs lg:text-sm text-yellow-800">
                      <strong>Attention:</strong> Certains ingrédients sont en quantité insuffisante. 
                      Contacter le gestionnaire d'inventaire.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      case "recipes":
        return (
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#113B39] text-sm md:text-lg lg:text-xl">Recettes du Jour</CardTitle>
                <CardDescription className="text-emerald-800 text-xs md:text-sm lg:text-base">Recettes à préparer avec détails et quantités pour le {new Date(selectedDate).toLocaleDateString('fr-FR')}</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                <div className="overflow-x-auto -mx-3 md:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[100px]">Recette</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[80px]">Catégorie</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[80px]">Temps</TableHead>
                          <TableHead className="text-xs px-2 md:px-4">Portions</TableHead>
                          <TableHead className="text-xs px-2 md:px-4 min-w-[150px]">Ingrédients</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recipes && recipes.length > 0 ? (
                          recipes.map((recipe: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs px-2 md:px-4">{recipe.name}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">{recipe.category}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                                  <span className="truncate">{recipe.prepTime} min</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-xs px-2 md:px-4 font-semibold text-[#FF4D00]">{recipe.servings}</TableCell>
                              <TableCell className="text-xs px-2 md:px-4 text-gray-600 max-w-[150px] truncate">{recipe.ingredients}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-emerald-800 py-4 text-xs">
                              Aucune recette disponible
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
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9] overflow-x-hidden">
        <Sidebar className={`glass-strong border-r border-[#DE6E27]/20 ${isMobile ? 'hidden' : 'block'}`}>
          <SidebarHeader className="border-b border-[#DE6E27]/20 p-3 sm:p-4 md:p-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#2B3210] to-[#DE6E27] bg-clip-text text-transparent">NutriFit Kitchen</h2>
            <p className="text-xs sm:text-sm md:text-base text-[#505631] font-medium">Cuisinier</p>
          </SidebarHeader>
          <SidebarContent className="bg-gradient-to-b from-white/95 to-orange-50/50">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs sm:text-sm font-semibold text-orange-700">Kitchen</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                        className="text-xs sm:text-sm md:text-base hover:bg-[#DE6E27]/5 transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-[#DE6E27]/20 data-[active=true]:to-[#ff8040]/20 data-[active=true]:text-[#DE6E27] data-[active=true]:font-semibold rounded-xl"
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
          <SidebarFooter className="border-t border-orange-100/50 p-3 sm:p-4 md:p-6 bg-gradient-to-r from-orange-50/80 to-orange-100/40">
            <Button variant="outline" className="w-full justify-start text-xs sm:text-sm md:text-base border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 rounded-xl" onClick={handleLogout}>
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
              <span className="truncate">Se déconnecter</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1 min-w-0">
          <header className="flex h-14 sm:h-16 md:h-20 shrink-0 items-center gap-2 sm:gap-3 border-b border-orange-100/50 px-2 sm:px-4 md:px-8 bg-white/90 backdrop-blur-sm shadow-sm">
            <SidebarTrigger className="-ml-1 text-orange-700 hover:bg-orange-50 rounded-lg p-1 sm:p-2" />
            <h1 className="text-sm sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-slate-800 to-orange-800 bg-clip-text text-transparent truncate">Dashboard Cuisine</h1>
          </header>
          
          <main className="flex-1 p-2 sm:p-4 md:p-8 min-w-0 bg-gradient-to-br from-slate-50/50 via-white/30 to-orange-50/50 overflow-x-hidden">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CookDashboard;
