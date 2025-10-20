import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderLogo } from "./HeaderLogo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { HeaderActions } from "./HeaderActions";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-md-4 focus:py-md-2 focus:bg-md-primary focus:text-md-on-primary focus:rounded-md-lg focus:md-elevation-3 focus:outline-none focus:ring-2 focus:ring-md-primary focus:ring-offset-2"
      >
        Aller au contenu principal
      </a>
      
      <header 
        className="sticky top-0 z-40 w-full glass-surface border-b border-[#DE6E27]/20 backdrop-blur-xl"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-[24px] sm:px-[32px] lg:px-[48px]">
          <div className="flex h-16 items-center justify-between">
            <HeaderLogo />
            
            <DesktopNav />
            
            <HeaderActions />

            <Button
              variant="text"
              size="icon"
              className="lg:hidden text-on-surface"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </header>
    </>
  );
};
