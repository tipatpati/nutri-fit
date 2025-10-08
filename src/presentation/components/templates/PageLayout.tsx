import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen md-surface ${className}`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
