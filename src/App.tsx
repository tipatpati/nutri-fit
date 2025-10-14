import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryProvider } from "@/presentation/providers/QueryProvider";
import { AuthProvider } from "@/presentation/providers/AuthProvider";
import { ErrorBoundary } from "@/shared/utils/errorBoundary";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Forfaits from "./pages/Forfaits";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import OwnerDashboard from "./pages/OwnerDashboard";
import CookDashboard from "./pages/CookDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import NotFound from "./pages/NotFound";

const App = () => (
  <ErrorBoundary>
    <QueryProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/forfaits" element={<Forfaits />} />
              <Route path="/order" element={<Order />} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/owner" element={<ProtectedRoute requiredRole="owner"><OwnerDashboard /></ProtectedRoute>} />
              <Route path="/admin/cook" element={<ProtectedRoute requiredRole="cook"><CookDashboard /></ProtectedRoute>} />
              <Route path="/admin/delivery" element={<ProtectedRoute requiredRole="delivery_driver"><DeliveryDashboard /></ProtectedRoute>} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryProvider>
  </ErrorBoundary>
);

export default App;
