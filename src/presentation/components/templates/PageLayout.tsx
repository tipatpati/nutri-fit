import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen bg-[hsl(var(--md-sys-color-surface))] text-[hsl(var(--md-sys-color-on-surface))] overflow-x-hidden ${className}`}>
      <Header />
      <main id="main-content" className="flex-1" role="main">{children}</main>
      <Footer />
    </div>
  );
};
