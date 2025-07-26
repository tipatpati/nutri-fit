
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Forfaits from "./pages/Forfaits";
import Order from "./pages/Order";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/AdminLogin";
import OwnerDashboard from "./pages/OwnerDashboard";
import CookDashboard from "./pages/CookDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/forfaits" element={<Forfaits />} />
          <Route path="/order" element={<Order />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/owner" element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/cook" element={
            <ProtectedRoute>
              <CookDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/delivery" element={
            <ProtectedRoute>
              <DeliveryDashboard />
            </ProtectedRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
