
import { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/984ab8f5-08ee-4ef8-9620-a3e398af0553.png" 
                alt="NutriFit Logo" 
                className="h-10 w-10"
              />
              <h1 className="text-2xl font-bold" style={{ color: '#113B39' }}>
                NutriFit
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/forfaits" className="text-gray-700 hover:text-[#113B39] transition-colors">
              Forfaits
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-[#113B39] transition-colors">
              Menu
            </Link>
            <a href="#" className="text-gray-700 hover:text-[#113B39] transition-colors">
              Recommandations
            </a>
            <a href="#" className="text-gray-700 hover:text-[#113B39] transition-colors">
              Cartes-Cadeaux
            </a>
            <a href="#" className="text-gray-700 hover:text-[#113B39] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-[#113B39] transition-colors">
              En
            </button>
            <button className="flex items-center text-gray-700 hover:text-[#113B39] transition-colors">
              <ShoppingCart className="w-5 h-5 mr-1" />
              <span className="bg-[#FF4D00] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                0
              </span>
            </button>
            <Button variant="outline" className="border-[#113B39] text-[#113B39] hover:bg-[#113B39] hover:text-white">
              Se connecter
            </Button>
            <Button className="bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white">
              S'inscrire
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#113B39] transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link to="/forfaits" className="text-gray-700 hover:text-[#113B39] transition-colors">
                Forfaits
              </Link>
              <Link to="/menu" className="text-gray-700 hover:text-[#113B39] transition-colors">
                Menu
              </Link>
              <a href="#" className="text-gray-700 hover:text-[#113B39] transition-colors">
                Recommandations
              </a>
              <a href="#" className="text-gray-700 hover:text-[#113B39] transition-colors">
                Cartes-Cadeaux
              </a>
              <a href="#" className="text-gray-700 hover:text-[#113B39] transition-colors">
                FAQ
              </a>
              <div className="flex items-center space-x-4 pt-4">
                <Button variant="outline" className="border-[#113B39] text-[#113B39] hover:bg-[#113B39] hover:text-white flex-1">
                  Se connecter
                </Button>
                <Button className="bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white flex-1">
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
