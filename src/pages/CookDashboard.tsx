import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChefHat, ClipboardList, Calculator, Package, LogOut, Clock, CheckCircle2, Users } from "lucide-react";
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
import { mockOrders, calculateMealStats, calculateIngredientRequirements, getOrdersForDate } from "@/utils/orderUtils";

const CookDashboard = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [selectedDate, setSelectedDate] = useState("2025-01-03");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const menuItems = [
    { title: "Commandes", icon: ClipboardList, id: "orders" },
    { title: "Calcul Ingrédients", icon: Calculator, id: "ingredients" },
    { title: "Recettes", icon: ChefHat, id: "recipes" },
  ];

  // Get real data from orders
  const ordersForDate = getOrdersForDate(mockOrders, selectedDate);
  const mealStats = calculateMealStats(mockOrders, selectedDate);
  const ingredientCalculations = calculateIngredientRequirements(mockOrders, selectedDate);

  // Mock recipes data
  const mockRecipes = [
    { 
      name: "Bowl Protéiné", 
      category: "Petit-déjeuner", 
      prep_time: "15 min", 
      ingredients: "Quinoa, Œufs, Avocat, Épinards",
      servings: mealStats.find(m => m.name.includes("quinoa"))?.orders || 0
    },
    { 
      name: "Salade Quinoa", 
      category: "Déjeuner", 
      prep_time: "20 min", 
      ingredients: "Quinoa, Poulet, Légumes verts, Vinaigrette",
      servings: mealStats.find(m => m.name.includes("Salade"))?.orders || 0
    },
    { 
      name: "Plat Protéiné", 
      category: "Déjeuner", 
      prep_time: "25 min", 
      ingredients: "Saumon, Crevettes, Légumes, Épices",
      servings: mealStats.filter(m => m.name.includes("Saumon") || m.name.includes("Crevettes")).reduce((sum, m) => sum + m.orders, 0)
    }
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

  const totalMealsOrdered = mealStats.reduce((sum, meal) => sum + meal.orders, 0);
  const totalMealsPrepared = mealStats.reduce((sum, meal) => sum + meal.prepared, 0);
  const totalMealsRemaining = mealStats.reduce((sum, meal) => sum + meal.remaining, 0);

  const renderContent = () => {
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
              <Card>
                <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                  <CardTitle className="text-[#FF4D00] text-sm md:text-lg lg:text-xl">Total Commandes</CardTitle>
                  <CardDescription className="text-emerald-800 text-xs md:text-sm lg:text-base">{ordersForDate.length} commandes pour le {new Date(selectedDate).toLocaleDateString('fr-FR')}</CardDescription>
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-5 h-5 text-[#FF4D00]" />
                    <p className="text-2xl font-bold text-[#113B39]">{totalMealsOrdered}</p>
                    <span className="text-sm text-gray-600">repas</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                  <CardTitle className="text-[#FF4D00] text-sm md:text-lg lg:text-xl">Progression</CardTitle>
                  <CardDescription className="text-emerald-800 text-xs md:text-sm lg:text-base">Avancement de la préparation</CardDescription>
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-emerald-800 text-xs md:text-sm lg:text-base">Progression globale</span>
                      <span className="font-bold text-emerald-800 text-xs md:text-sm lg:text-base">
                        {totalMealsOrdered > 0 ? Math.round((totalMealsPrepared / totalMealsOrdered) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ 
                          width: `${totalMealsOrdered > 0 ? (totalMealsPrepared / totalMealsOrdered) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                  <CardTitle className="text-[#FF4D00] text-sm md:text-lg lg:text-xl">Status</CardTitle>
                  <CardDescription className="text-emerald-800 text-xs md:text-sm lg:text-base">Répartition des préparations</CardDescription>
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6">
                    <div className="text-center">
                      <p className="text-lg md:text-xl lg:text-2xl font-bold text-green-600">{totalMealsPrepared}</p>
                      <p className="text-xs lg:text-sm text-gray-600">Préparées</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#FF4D00]">{totalMealsRemaining}</p>
                      <p className="text-xs lg:text-sm text-gray-600">Restantes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#113B39] text-sm md:text-lg lg:text-xl">Commandes par Repas</CardTitle>
                <CardDescription className="text-emerald-800 text-xs md:text-sm lg:text-base">Répartition et progression des commandes du {new Date(selectedDate).toLocaleDateString('fr-FR')}</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                {mealStats.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
                    {mealStats.map((meal, index) => (
                      <div key={index} className="p-2 md:p-3 lg:p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-center gap-1 md:gap-2 mb-1 md:mb-2">
                          <Package className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#FF4D00]" />
                          {meal.remaining === 0 && <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-green-600" />}
                        </div>
                        <p className="font-medium text-emerald-800 text-xs md:text-sm lg:text-base line-clamp-2">{meal.name}</p>
                        <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#113B39] my-1 md:my-2">{meal.orders}</p>
                        <p className="text-xs lg:text-sm text-gray-600 mb-1 md:mb-2 line-clamp-2">{meal.description}</p>
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
                    <p className="text-gray-600">Aucune commande pour cette date</p>
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
                        {ingredientCalculations.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-xs px-2 md:px-4">{item.ingredient}</TableCell>
                            <TableCell className="text-xs px-2 md:px-4">{item.totalNeeded}</TableCell>
                            <TableCell className="text-xs px-2 md:px-4">{item.available}</TableCell>
                            <TableCell className={`${getStatusColor(item.status)} text-xs px-2 md:px-4`}>
                              {item.status}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                {ingredientCalculations.some(item => item.status === "Manque") && (
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
                        {mockRecipes.filter(recipe => recipe.servings > 0).map((recipe, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-xs px-2 md:px-4">{recipe.name}</TableCell>
                            <TableCell className="text-xs px-2 md:px-4">{recipe.category}</TableCell>
                            <TableCell className="text-xs px-2 md:px-4">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                                <span className="truncate">{recipe.prep_time}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs px-2 md:px-4 font-semibold text-[#FF4D00]">{recipe.servings}</TableCell>
                            <TableCell className="text-xs px-2 md:px-4 text-gray-600 max-w-[150px] truncate">{recipe.ingredients}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                {mockRecipes.filter(recipe => recipe.servings > 0).length === 0 && (
                  <div className="text-center py-8">
                    <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucune recette à préparer pour cette date</p>
                  </div>
                )}
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-orange-50/30 overflow-x-hidden">
        <Sidebar className={`border-r border-orange-100/50 bg-white/90 backdrop-blur-sm ${isMobile ? 'hidden' : 'block'}`}>
          <SidebarHeader className="border-b border-orange-100/50 p-3 sm:p-4 md:p-6 bg-gradient-to-r from-orange-50/80 to-orange-100/40">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">NutiFit Kitchen</h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium">Cuisinier</p>
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
                        className="text-xs sm:text-sm md:text-base hover:bg-orange-50/80 transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-orange-100 data-[active=true]:to-orange-50 data-[active=true]:text-orange-800 data-[active=true]:font-semibold rounded-xl"
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
