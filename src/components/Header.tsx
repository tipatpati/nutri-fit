
import { useState } from "react";
import { Bell } from "lucide-react";
import { AnimatedMenu, AnimatedShoppingCart, AnimatedUser, AnimatedX } from "./ui/animated-icon";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[hsl(var(--md-sys-color-surface-container))] md-elevation-2 border-b border-[hsl(var(--md-sys-color-outline-variant))] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="relative">
                <img 
                  src="/lovable-uploads/984ab8f5-08ee-4ef8-9620-a3e398af0553.png" 
                  alt="NutriFit Logo" 
                  className="h-10 w-10 sm:h-12 sm:w-12 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-orange-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
              </div>
              <div>
                <h1 className="md-headline-medium bg-gradient-to-r from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-secondary))] bg-clip-text text-transparent">
                  NutriFit
                </h1>
                <p className="md-label-small text-[hsl(var(--md-sys-color-on-surface-variant))] -mt-1 hidden sm:block">Nutrition & Fitness</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {// ... keep existing code (navigation items) the same
            [
              { to: "/forfaits", label: "Forfaits" },
              { to: "/menu", label: "Menu" },
              { label: "Recommandations" },
              { label: "Cartes-Cadeaux" },
              { label: "FAQ" }
            ].map((item, index) => (
              <div key={index} className="relative group">
                {item.to ? (
                  <Link 
                    to={item.to} 
                    className="text-[hsl(var(--md-sys-color-on-surface))] hover:text-[hsl(var(--md-sys-color-primary))] transition-colors md-label-large relative py-2"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-secondary))] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ) : (
                  <button 
                    className="text-[hsl(var(--md-sys-color-on-surface))] hover:text-[hsl(var(--md-sys-color-primary))] transition-colors md-label-large relative py-2"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-secondary))] group-hover:w-full transition-all duration-300"></span>
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <button className="text-[hsl(var(--md-sys-color-on-surface-variant))] hover:text-[hsl(var(--md-sys-color-primary))] transition-colors px-3 py-2 rounded-[12px] hover:bg-[hsl(var(--md-sys-color-primary-container))] md-label-large">
                Fr
              </button>
              
              <button className="relative p-2 text-[hsl(var(--md-sys-color-on-surface-variant))] hover:text-[hsl(var(--md-sys-color-primary))] hover:bg-[hsl(var(--md-sys-color-primary-container))] rounded-[16px] transition-colors">
                <Bell className="w-5 h-5" />
                <Badge variant="filled" className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[hsl(var(--md-sys-color-secondary))] text-[hsl(var(--md-sys-color-on-secondary))] text-xs">
                  2
                </Badge>
              </button>
              
              <button className="relative p-2 text-[hsl(var(--md-sys-color-on-surface-variant))] hover:text-[hsl(var(--md-sys-color-primary))] hover:bg-[hsl(var(--md-sys-color-primary-container))] rounded-[16px] transition-colors group">
                <AnimatedShoppingCart size={20} />
                <Badge variant="filled" className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[hsl(var(--md-sys-color-tertiary))] text-[hsl(var(--md-sys-color-on-tertiary))] text-xs group-hover:scale-110 transition-transform">
                  0
                </Badge>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outlined"
              >
                Se connecter
              </Button>
              <Button 
                variant="filled"
              >
                S'inscrire
              </Button>
            </div>
          </div>

          {/* Mobile Actions & Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile cart button */}
            <button className="relative p-2 text-[hsl(var(--md-sys-color-on-surface-variant))] hover:text-[hsl(var(--md-sys-color-primary))] hover:bg-[hsl(var(--md-sys-color-primary-container))] rounded-[16px] transition-colors">
              <AnimatedShoppingCart size={20} />
              <Badge variant="filled" className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-[hsl(var(--md-sys-color-tertiary))] text-[hsl(var(--md-sys-color-on-tertiary))] text-xs">
                0
              </Badge>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[hsl(var(--md-sys-color-on-surface))] hover:text-[hsl(var(--md-sys-color-primary))] hover:bg-[hsl(var(--md-sys-color-primary-container))] rounded-[16px] transition-colors"
            >
              {isMenuOpen ? <AnimatedX size={24} /> : <AnimatedMenu size={24} isOpen={isMenuOpen} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 sm:py-6 border-t border-[hsl(var(--md-sys-color-outline-variant))] bg-[hsl(var(--md-sys-color-surface-container))] md-elevation-2 rounded-b-[16px]">
            <nav className="flex flex-col space-y-2 sm:space-y-4">
              <Link to="/forfaits" className="text-[hsl(var(--md-sys-color-on-surface))] hover:text-[hsl(var(--md-sys-color-primary))] transition-colors md-label-large px-4 py-3 rounded-[12px] hover:bg-[hsl(var(--md-sys-color-primary-container))]">
                Forfaits
              </Link>
              <Link to="/menu" className="text-[hsl(var(--md-sys-color-on-surface))] hover:text-[hsl(var(--md-sys-color-primary))] transition-colors md-label-large px-4 py-3 rounded-[12px] hover:bg-[hsl(var(--md-sys-color-primary-container))]">
                Menu
              </Link>
              <button className="text-[hsl(var(--md-sys-color-on-surface))] hover:text-[hsl(var(--md-sys-color-primary))] transition-colors md-label-large px-4 py-3 rounded-[12px] hover:bg-[hsl(var(--md-sys-color-primary-container))] w-full text-left">
                Recommandations
              </button>
              <button className="text-[hsl(var(--md-sys-color-on-surface))] hover:text-[hsl(var(--md-sys-color-primary))] transition-colors md-label-large px-4 py-3 rounded-[12px] hover:bg-[hsl(var(--md-sys-color-primary-container))] w-full text-left">
                Cartes-Cadeaux
              </button>
              <button className="text-[hsl(var(--md-sys-color-on-surface))] hover:text-[hsl(var(--md-sys-color-primary))] transition-colors md-label-large px-4 py-3 rounded-[12px] hover:bg-[hsl(var(--md-sys-color-primary-container))] w-full text-left">
                FAQ
              </button>
              
              <div className="flex flex-col space-y-3 pt-4 sm:pt-6 border-t border-[hsl(var(--md-sys-color-outline-variant))]">
                <Button variant="outlined">
                  Se connecter
                </Button>
                <Button variant="filled">
                  S'inscrire
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
