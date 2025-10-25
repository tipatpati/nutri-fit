import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import {
  ShoppingCart,
  User,
  LogOut,
  ShoppingBag,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

export default function NutriFitNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Accueil",
      link: "/",
    },
    {
      name: "Menu",
      link: "/menu",
    },
    {
      name: "Forfaits",
      link: "/forfaits",
    },
  ];

  const handleNavItemClick = (link: string) => {
    navigate(link);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo brandName="NutriFit" />
          <NavItems items={navItems} />

          <div className="flex items-center gap-3">
            {/* Cart Button with Badge */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/cart')}
                className="relative glass rounded-xl hover:bg-orange-primary/10 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5 text-olive-dark" />

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
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-orange-primary to-orange-light rounded-full flex items-center justify-center shadow-lg"
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
              </Button>
            </motion.div>

            {/* User Menu or Auth Button */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="glass rounded-xl hover:bg-orange-primary/10"
                    >
                      <User className="w-5 h-5 text-olive-dark" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="glass-strong border-orange-primary/20 shadow-2xl w-56"
                >
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-olive-dark truncate">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-beige" />
                  <DropdownMenuItem
                    onClick={() => navigate('/profile')}
                    className="cursor-pointer hover:bg-orange-primary/10"
                  >
                    <User className="w-4 h-4 mr-2 text-orange-primary" />
                    <span className="text-olive-dark">Mon profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate('/orders')}
                    className="cursor-pointer hover:bg-orange-primary/10"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2 text-orange-primary" />
                    <span className="text-olive-dark">Mes commandes</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate('/admin')}
                    className="cursor-pointer hover:bg-orange-primary/10"
                  >
                    <Settings className="w-4 h-4 mr-2 text-orange-primary" />
                    <span className="text-olive-dark">Admin</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-beige" />
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
              <NavbarButton
                as="button"
                variant="primary"
                onClick={() => navigate('/auth')}
              >
                Se connecter
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo brandName="NutriFit" />
            <div className="flex items-center gap-2">
              {/* Cart Button Mobile */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  navigate('/cart');
                  setIsMobileMenuOpen(false);
                }}
                className="relative glass rounded-xl hover:bg-orange-primary/10 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5 text-olive-dark" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-orange-primary to-orange-light rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Button>

              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {/* Mobile Nav Items */}
            <div className="flex flex-col gap-3 w-full">
              {navItems.map((item, idx) => (
                <motion.button
                  key={`mobile-link-${idx}`}
                  onClick={() => handleNavItemClick(item.link)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`
                    relative text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300
                    ${location.pathname === item.link
                      ? 'bg-gradient-to-r from-orange-primary to-orange-light text-white shadow-lg'
                      : 'text-olive-dark hover:bg-orange-primary/10'
                    }
                  `}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Mobile User Section */}
            {isAuthenticated ? (
              <div className="flex flex-col gap-3 w-full mt-4 pt-4 border-t border-beige">
                <motion.button
                  onClick={() => {
                    navigate('/profile');
                    setIsMobileMenuOpen(false);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-olive-dark hover:bg-orange-primary/10 transition-all duration-300"
                >
                  <User className="w-5 h-5 text-orange-primary" />
                  <span className="font-semibold">Mon profil</span>
                </motion.button>

                <motion.button
                  onClick={() => {
                    navigate('/orders');
                    setIsMobileMenuOpen(false);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-olive-dark hover:bg-orange-primary/10 transition-all duration-300"
                >
                  <ShoppingBag className="w-5 h-5 text-orange-primary" />
                  <span className="font-semibold">Mes commandes</span>
                </motion.button>

                <motion.button
                  onClick={() => {
                    navigate('/admin');
                    setIsMobileMenuOpen(false);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-olive-dark hover:bg-orange-primary/10 transition-all duration-300"
                >
                  <Settings className="w-5 h-5 text-orange-primary" />
                  <span className="font-semibold">Admin</span>
                </motion.button>

                <motion.button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/10 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">Déconnexion</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex w-full flex-col gap-4 mt-4">
                <NavbarButton
                  as="button"
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Se connecter
                </NavbarButton>
              </div>
            )}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
