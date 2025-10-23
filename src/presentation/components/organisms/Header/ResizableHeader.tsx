import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
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

const navItems = [
  { name: "Accueil", link: "/" },
  { name: "Menu", link: "/menu" },
  { name: "Forfaits", link: "/forfaits" },
  { name: "Commander", link: "/order" },
];

export const ResizableHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-primary focus:ring-offset-2"
      >
        Aller au contenu principal
      </a>

      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo brandName="NutriFit" />
          <NavItems items={navItems} />
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <NavbarButton
                  as="button"
                  variant="secondary"
                  onClick={() => navigate("/profile")}
                >
                  Profil
                </NavbarButton>
                <NavbarButton
                  as="button"
                  variant="primary"
                  onClick={handleSignOut}
                >
                  Déconnexion
                </NavbarButton>
              </>
            ) : (
              <>
                <NavbarButton
                  as="button"
                  variant="secondary"
                  onClick={() => navigate("/auth")}
                >
                  Connexion
                </NavbarButton>
                <NavbarButton
                  as="button"
                  variant="primary"
                  onClick={() => navigate("/order")}
                >
                  Commander
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo brandName="NutriFit" />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <nav className="flex flex-col gap-3 w-full">
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.link;
                return (
                  <Link
                    key={`mobile-link-${idx}`}
                    to={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-6 py-4 rounded-xl font-bold text-base transition-all duration-200 active:scale-[0.97] select-none ${
                      isActive
                        ? "bg-orange-primary/10 text-orange-primary border border-orange-primary/20"
                        : "text-olive-dark hover:bg-beige active:bg-beige/70"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex w-full flex-col gap-3 pt-4 border-t border-beige">
              {user ? (
                <>
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/profile");
                    }}
                    variant="outline"
                    className="w-full min-h-[56px] text-base font-bold glass border-2 border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white active:scale-[0.97] transition-all duration-200"
                  >
                    Profil
                  </Button>
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full min-h-[56px] text-base font-bold bg-gradient-to-br from-orange-primary to-orange-light text-white shadow-lg active:scale-[0.97] transition-all duration-200"
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/auth");
                    }}
                    variant="outline"
                    className="w-full min-h-[56px] text-base font-bold glass border-2 border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white active:scale-[0.97] transition-all duration-200"
                  >
                    Connexion
                  </Button>
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/order");
                    }}
                    className="w-full min-h-[56px] text-base font-bold bg-gradient-to-br from-orange-primary to-orange-light text-white shadow-lg active:scale-[0.97] transition-all duration-200"
                  >
                    Commander
                  </Button>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </>
  );
};
