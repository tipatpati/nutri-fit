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
    <header className="sticky top-0 z-40 w-full glass-surface md-elevation-2">
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
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};
