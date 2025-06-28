
import { useState } from "react";
import { Menu, X, ShoppingCart, User, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100 sticky top-0 z-50">
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
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent">
                  NutriFit
                </h1>
                <p className="text-xs text-gray-500 -mt-1 hidden sm:block">Nutrition & Fitness</p>
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
                    className="text-gray-700 hover:text-emerald-600 transition-colors font-medium relative py-2"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ) : (
                  <a 
                    href="#" 
                    className="text-gray-700 hover:text-emerald-600 transition-colors font-medium relative py-2"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-emerald-600 transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50 font-medium">
                Fr
              </button>
              
              <button className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                  2
                </Badge>
              </button>
              
              <button className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors group">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs group-hover:scale-110 transition-transform">
                  0
                </Badge>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Se connecter
              </Button>
              <Button 
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
              >
                S'inscrire
              </Button>
            </div>
          </div>

          {/* Mobile Actions & Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile cart button */}
            <button className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs">
                0
              </Badge>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 sm:py-6 border-t border-gray-100 bg-white/95 backdrop-blur-xl rounded-b-2xl shadow-xl">
            <nav className="flex flex-col space-y-2 sm:space-y-4">
              <Link to="/forfaits" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium px-4 py-3 rounded-xl hover:bg-emerald-50/50">
                Forfaits
              </Link>
              <Link to="/menu" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium px-4 py-3 rounded-xl hover:bg-emerald-50/50">
                Menu
              </Link>
              <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium px-4 py-3 rounded-xl hover:bg-emerald-50/50">
                Recommandations
              </a>
              <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium px-4 py-3 rounded-xl hover:bg-emerald-50/50">
                Cartes-Cadeaux
              </a>
              <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium px-4 py-3 rounded-xl hover:bg-emerald-50/50">
                FAQ
              </a>
              
              <div className="flex flex-col space-y-3 pt-4 sm:pt-6 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Se connecter
                </Button>
                <Button 
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                >
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
