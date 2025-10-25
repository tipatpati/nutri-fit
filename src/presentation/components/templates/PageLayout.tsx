import { ReactNode } from "react";
import NutriFitNavbar from "@/components/NutriFitNavbar";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9] text-[#2B3210] overflow-x-hidden ${className}`}>
      <NutriFitNavbar />
      <main id="main-content" className="flex-1" role="main">{children}</main>
      <Footer />
    </div>
  );
};
