
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChefHat, ClipboardList, Calculator, Package, LogOut, Clock, CheckCircle2 } from "lucide-react";
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

const CookDashboard = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { title: "Commandes", icon: ClipboardList, id: "orders" },
    { title: "Calcul Ingrédients", icon: Calculator, id: "ingredients" },
    { title: "Recettes", icon: ChefHat, id: "recipes" },
  ];

  // Enhanced mock data for orders by meal type
  const mockOrdersByMeal = [
    { name: "Repas 1", orders: 12, description: "Petit-déjeuner protéiné", prepared: 8, remaining: 4 },
    { name: "Repas 2", orders: 8, description: "Collation matinale", prepared: 8, remaining: 0 },
    { name: "Repas 3", orders: 15, description: "Déjeuner équilibré", prepared: 10, remaining: 5 },
    { name: "Repas 4", orders: 6, description: "Collation après-midi", prepared: 2, remaining: 4 },
    { name: "Repas 5", orders: 10, description: "Dîner léger", prepared: 0, remaining: 10 }
  ];

  const mockIngredientCalculations = [
    { ingredient: "Poulet Bio", totalNeeded: "2.5 kg", available: "3.0 kg", status: "OK" },
    { ingredient: "Quinoa", totalNeeded: "1.8 kg", available: "1.2 kg", status: "Manque" },
    { ingredient: "Brocoli", totalNeeded: "2.2 kg", available: "2.5 kg", status: "OK" },
    { ingredient: "Huile d'olive", totalNeeded: "300 ml", available: "200 ml", status: "Manque" },
    { ingredient: "Avocat", totalNeeded: "18 pcs", available: "25 pcs", status: "OK" }
  ];

  const mockRecipes = [
    { 
      name: "Bowl Protéiné", 
      category: "Petit-déjeuner", 
      prep_time: "15 min", 
      ingredients: "Quinoa, Œufs, Avocat, Épinards",
      servings: 12
    },
    { 
      name: "Salade Quinoa", 
      category: "Déjeuner", 
      prep_time: "20 min", 
      ingredients: "Quinoa, Poulet, Légumes verts, Vinaigrette",
      servings: 15
    },
    { 
      name: "Smoothie Vert", 
      category: "Collation", 
      prep_time: "5 min", 
      ingredients: "Épinards, Banane, Protéine, Lait d'amande",
      servings: 8
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
      case "OK": return "text-green-600";
      case "Manque": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
              <Card>
                <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                  <CardTitle className="text-[#FF4D00] text-sm md:text-lg lg:text-xl">Commandes du Jour</CardTitle>
                  <CardDescription className="text-xs md:text-sm lg:text-base">Total: {mockOrdersByMeal.reduce((sum, meal) => sum + meal.orders, 0)} commandes</CardDescription>
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-8">
                    <div className="text-center">
                      <p className="text-lg md:text-xl lg:text-2xl font-bold text-green-600">{mockOrdersByMeal.reduce((sum, meal) => sum + meal.prepared, 0)}</p>
                      <p className="text-xs lg:text-sm text-gray-600">Préparées</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#FF4D00]">{mockOrdersByMeal.reduce((sum, meal) => sum + meal.remaining, 0)}</p>
                      <p className="text-xs lg:text-sm text-gray-600">Restantes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                  <CardTitle className="text-[#FF4D00] text-sm md:text-lg lg:text-xl">Progression</CardTitle>
                  <CardDescription className="text-xs md:text-sm lg:text-base">Avancement de la préparation</CardDescription>
                </CardHeader>
                <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs md:text-sm lg:text-base">Progression globale</span>
                      <span className="font-bold text-[#113B39] text-xs md:text-sm lg:text-base">
                        {Math.round((mockOrdersByMeal.reduce((sum, meal) => sum + meal.prepared, 0) / 
                        mockOrdersByMeal.reduce((sum, meal) => sum + meal.orders, 0)) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ 
                          width: `${(mockOrdersByMeal.reduce((sum, meal) => sum + meal.prepared, 0) / 
                          mockOrdersByMeal.reduce((sum, meal) => sum + meal.orders, 0)) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="px-3 py-3 md:px-6 md:py-6">
                <CardTitle className="text-[#113B39] text-sm md:text-lg lg:text-xl">Commandes par Type de Repas</CardTitle>
                <CardDescription className="text-xs md:text-sm lg:text-base">Répartition et progression des commandes du jour</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
                  {mockOrdersByMeal.map((meal, index) => (
                    <div key={index} className="p-2 md:p-3 lg:p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-center gap-1 md:gap-2 mb-1 md:mb-2">
                        <Package className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#FF4D00]" />
                        {meal.remaining === 0 && <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-green-600" />}
                      </div>
                      <p className="font-medium text-xs md:text-sm lg:text-base">{meal.name}</p>
                      <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#113B39] my-1 md:my-2">{meal.orders}</p>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1 md:mb-2 line-clamp-2">{meal.description}</p>
                      <div className="text-xs">
                        <p className="text-green-600">Préparées: {meal.prepared}</p>
                        <p className="text-[#FF4D00]">Restantes: {meal.remaining}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
                <CardDescription className="text-xs md:text-sm lg:text-base">Quantités nécessaires vs disponibles pour toutes les commandes</CardDescription>
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
                        {mockIngredientCalculations.map((item, index) => (
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
                <div className="mt-3 md:mt-4 p-2 md:p-3 lg:p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-xs lg:text-sm text-yellow-800">
                    <strong>Attention:</strong> Quinoa et Huile d'olive en quantité insuffisante. 
                    Contacter le gestionnaire d'inventaire.
                  </p>
                </div>
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
                <CardDescription className="text-xs md:text-sm lg:text-base">Recettes à préparer avec détails et quantités</CardDescription>
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
                        {mockRecipes.map((recipe, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-xs px-2 md:px-4">{recipe.name}</TableCell>
                            <TableCell className="text-xs px-2 md:px-4">{recipe.category}</TableCell>
                            <TableCell className="text-xs px-2 md:px-4">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                                <span className="truncate">{recipe.prep_time}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs px-2 md:px-4">{recipe.servings}</TableCell>
                            <TableCell className="text-xs px-2 md:px-4 text-gray-600 max-w-[150px] truncate">{recipe.ingredients}</TableCell>
                          </TableRow>
                        ))}
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
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-gray-200 hidden lg:block">
          <SidebarHeader className="border-b border-gray-200 p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-[#113B39]">NutiFit Kitchen</h2>
            <p className="text-xs md:text-sm text-gray-600">Cuisinier</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs">Kitchen</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                        className="text-xs md:text-sm"
                      >
                        <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-200 p-3 md:p-4">
            <Button variant="outline" className="w-full justify-start text-xs md:text-sm" onClick={handleLogout}>
              <LogOut className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              Se déconnecter
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1 min-w-0">
          <header className="flex h-12 md:h-14 lg:h-16 shrink-0 items-center gap-2 border-b px-3 md:px-4 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-sm md:text-lg lg:text-xl font-semibold text-[#113B39] truncate">Dashboard Cuisine</h1>
          </header>
          
          <main className="flex-1 p-3 md:p-4 lg:p-6 min-w-0">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CookDashboard;
