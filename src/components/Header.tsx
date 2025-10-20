import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  LogOut, 
  Home,
  UtensilsCrossed,
  Package,
  Settings,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Handle scroll effect
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: "/", label: "Accueil", icon: Home },
    { to: "/menu", label: "Menu", icon: UtensilsCrossed },
    { to: "/forfaits", label: "Forfaits", icon: Package },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled 
            ? "glass-strong shadow-lg border-b border-[#DE6E27]/20" 
            : "bg-[#FBF8EF]/80 backdrop-blur-sm"
        )}
      >
        <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="font-['Space_Grotesk'] text-2xl font-bold bg-gradient-to-r from-[#2B3210] to-[#DE6E27] bg-clip-text text-transparent">
                NutriFit
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <span
                    className={cn(
                      "font-['DM_Sans'] font-medium transition-colors duration-200",
                      isActive(link.to)
                        ? "text-[#DE6E27]"
                        : "text-[#2B3210] hover:text-[#DE6E27]"
                    )}
                  >
                    {link.label}
                  </span>
                  {isActive(link.to) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#DE6E27] to-[#ff8040]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button with Badge */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/cart')}
                className="relative glass rounded-xl hover:bg-[#DE6E27]/10 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5 text-[#2B3210]" />
                
                {/* Animated Badge */}
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#DE6E27] to-[#ff8040] rounded-full flex items-center justify-center shadow-lg"
                    >
                      <motion.span
                        key={itemCount}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-white text-xs font-bold"
                      >
                        {itemCount > 9 ? '9+' : itemCount}
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Pulse effect when items added */}
                {itemCount > 0 && (
                  <motion.span
                    className="absolute inset-0 rounded-xl bg-[#DE6E27]"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </Button>
            </motion.div>

            {/* User Menu or Auth Buttons */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="glass rounded-xl hover:bg-[#DE6E27]/10"
                    >
                      <User className="w-5 h-5 text-[#2B3210]" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="glass-strong border-[#DE6E27]/20 shadow-2xl w-56"
                >
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-[#2B3210]">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-[#E5E2D9]" />
                  <DropdownMenuItem 
                    onClick={() => navigate('/profile')}
                    className="cursor-pointer hover:bg-[#DE6E27]/10"
                  >
                    <User className="w-4 h-4 mr-2 text-[#DE6E27]" />
                    <span className="text-[#2B3210]">Mon profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate('/orders')}
                    className="cursor-pointer hover:bg-[#DE6E27]/10"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2 text-[#DE6E27]" />
                    <span className="text-[#2B3210]">Mes commandes</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate('/admin')}
                    className="cursor-pointer hover:bg-[#DE6E27]/10"
                  >
                    <Settings className="w-4 h-4 mr-2 text-[#DE6E27]" />
                    <span className="text-[#2B3210]">Admin</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#E5E2D9]" />
                  <DropdownMenuItem 
                    onClick={signOut}
                    className="cursor-pointer hover:bg-error/10 text-error"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Button
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white rounded-xl px-6 hover:shadow-xl transition-all duration-300"
                >
                  Se connecter
                </Button>
              </motion.div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden glass rounded-xl"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#2B3210]" />
              ) : (
                <Menu className="w-6 h-6 text-[#2B3210]" />
              )}
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#2B3210]/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-20 right-0 bottom-0 w-80 glass-strong border-l border-[#DE6E27]/20 z-50 md:hidden overflow-y-auto"
            >
              <nav className="p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={link.to}>
                      <div
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl transition-all duration-300",
                          isActive(link.to)
                            ? "bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white shadow-lg"
                            : "hover:bg-[#DE6E27]/10 text-[#2B3210]"
                        )}
                      >
                        <link.icon className="w-5 h-5" />
                        <span className="font-semibold">{link.label}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                {!isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      onClick={() => navigate('/auth')}
                      className="w-full mt-4 py-6 bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white rounded-xl hover:shadow-xl"
                    >
                      Se connecter
                    </Button>
                  </motion.div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
