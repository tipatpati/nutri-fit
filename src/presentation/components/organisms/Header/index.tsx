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
    <header className="sticky top-0 z-40 w-full bg-md-surface md-elevation-1">
      <div className="container mx-auto px-md-2 sm:px-md-4 lg:px-md-6">
        <div className="flex h-16 items-center justify-between gap-md-4">
          <HeaderLogo />
          
          <DesktopNav />
          
          <HeaderActions />

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};
