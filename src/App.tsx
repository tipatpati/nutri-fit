import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryProvider } from "@/presentation/providers/QueryProvider";
import { AuthProvider } from "@/presentation/providers/AuthProvider";
import { ErrorBoundary } from "@/shared/utils/errorBoundary";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { lazy, Suspense } from "react";
import { Skeleton } from "./components/ui/enhanced-skeleton";

// ===================================================================
// CRITICAL PATH - Load immediately (required for initial render)
// ===================================================================
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// ===================================================================
// LAZY LOADED ROUTES - Split into separate chunks
// ===================================================================

// Public routes - main features
const Menu = lazy(() => import(
  /* webpackChunkName: "menu" */
  /* webpackPrefetch: true */
  "./pages/Menu"
));

const Forfaits = lazy(() => import(
  /* webpackChunkName: "forfaits" */
  /* webpackPrefetch: true */
  "./pages/Forfaits"
));

const Order = lazy(() => import(
  /* webpackChunkName: "order" */
  "./pages/Order"
));

// Shopping flow - separate chunk (used together)
const Cart = lazy(() => import(
  /* webpackChunkName: "cart" */
  "./pages/Cart"
));

const Checkout = lazy(() => import(
  /* webpackChunkName: "checkout" */
  "./pages/Checkout"
));

// Auth flow
const ResetPassword = lazy(() => import(
  /* webpackChunkName: "auth-reset" */
  "./pages/ResetPassword"
));

const UpdatePassword = lazy(() => import(
  /* webpackChunkName: "auth-update" */
  "./pages/UpdatePassword"
));

// User-specific routes
const Profile = lazy(() => import(
  /* webpackChunkName: "profile" */
  "./pages/Profile"
));

const Orders = lazy(() => import(
  /* webpackChunkName: "orders" */
  "./pages/Orders"
));

// Admin routes - separate chunk (rarely accessed by most users)
const AdminLogin = lazy(() => import(
  /* webpackChunkName: "admin-login" */
  "./pages/AdminLogin"
));

const OwnerDashboard = lazy(() => import(
  /* webpackChunkName: "admin-owner" */
  "./pages/OwnerDashboard"
));

const CookDashboard = lazy(() => import(
  /* webpackChunkName: "admin-cook" */
  "./pages/CookDashboard"
));

const DeliveryDashboard = lazy(() => import(
  /* webpackChunkName: "admin-delivery" */
  "./pages/DeliveryDashboard"
));

// ===================================================================
// LOADING FALLBACK
// ===================================================================
const PageLoader = () => (
  <div className="min-h-screen bg-md-surface p-md-6">
    <Skeleton.Page />
  </div>
);

// ===================================================================
// APP COMPONENT
// ===================================================================
const App = () => (
  <ErrorBoundary>
    <QueryProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* ========================================= */}
                {/* IMMEDIATE LOAD - No lazy loading */}
                {/* ========================================= */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/not-found" element={<NotFound />} />

                {/* ========================================= */}
                {/* PUBLIC ROUTES - Lazy loaded */}
                {/* ========================================= */}
                <Route path="/menu" element={<Menu />} />
                <Route path="/forfaits" element={<Forfaits />} />
                <Route path="/order" element={<Order />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />

                {/* ========================================= */}
                {/* AUTH ROUTES - Lazy loaded */}
                {/* ========================================= */}
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/update-password" element={<UpdatePassword />} />

                {/* ========================================= */}
                {/* PROTECTED USER ROUTES - Lazy loaded */}
                {/* ========================================= */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />

                {/* ========================================= */}
                {/* ADMIN ROUTES - Lazy loaded & protected */}
                {/* ========================================= */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                  path="/admin/owner"
                  element={
                    <ProtectedRoute requiredRole="owner">
                      <OwnerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/cook"
                  element={
                    <ProtectedRoute requiredRole="cook">
                      <CookDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/delivery"
                  element={
                    <ProtectedRoute requiredRole="delivery_driver">
                      <DeliveryDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* ========================================= */}
                {/* CATCH ALL - 404 */}
                {/* ========================================= */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryProvider>
  </ErrorBoundary>
);

export default App;
