import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(32px) saturate(200%)" : "blur(24px) saturate(180%)",
        backgroundColor: visible ? "rgba(251, 248, 239, 0.85)" : "rgba(251, 248, 239, 0.6)",
        width: visible ? "60%" : "100%",
        y: visible ? 16 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: visible ? "800px" : "100%",
        WebkitBackdropFilter: visible ? "blur(32px) saturate(200%)" : "blur(24px) saturate(180%)",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-2xl px-6 py-3 lg:flex",
        visible 
          ? "border border-orange-primary/20 shadow-[0_12px_40px_0_rgba(43,50,16,0.12)]" 
          : "border border-orange-primary/15 shadow-[0_8px_32px_0_rgba(43,50,16,0.08)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-semibold transition duration-200 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-olive-dark hover:text-orange-primary transition-colors duration-200"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-xl bg-orange-primary/10 border border-orange-primary/20"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(32px) saturate(200%)" : "blur(24px) saturate(180%)",
        backgroundColor: visible ? "rgba(251, 248, 239, 0.85)" : "rgba(251, 248, 239, 0.6)",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "16px" : "24px",
        paddingLeft: visible ? "16px" : "24px",
        borderRadius: visible ? "16px" : "0px",
        y: visible ? 16 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        WebkitBackdropFilter: visible ? "blur(32px) saturate(200%)" : "blur(24px) saturate(180%)",
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between py-3 lg:hidden",
        visible 
          ? "border border-orange-primary/20 shadow-[0_12px_40px_0_rgba(43,50,16,0.12)]" 
          : "border-b border-orange-primary/15",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-olive-dark/50 backdrop-blur-sm"
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              backgroundColor: "rgba(251, 248, 239, 0.95)",
              backdropFilter: "blur(40px) saturate(200%)",
              WebkitBackdropFilter: "blur(40px) saturate(200%)",
            }}
            className={cn(
              "fixed right-0 top-0 z-50 h-full w-72 flex flex-col gap-6 shadow-[0_12px_48px_0_rgba(43,50,16,0.3)] border-l-2 border-orange-primary/25 p-6",
              className,
            )}
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-orange-primary/10 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-olive-dark" />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-orange-primary/10 transition-colors duration-200"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? (
        <X className="h-6 w-6 text-olive-dark" />
      ) : (
        <Menu className="h-6 w-6 text-olive-dark" />
      )}
    </button>
  );
};

export const NavbarLogo = ({ logoUrl, brandName }: { logoUrl?: string; brandName: string }) => {
  return (
    <a
      href="/"
      className="relative z-20 flex items-center space-x-2 px-2 py-1 text-lg font-bold text-olive-dark hover:text-orange-primary transition-colors duration-200"
    >
      {logoUrl && (
        <img
          src={logoUrl}
          alt={`${brandName} logo`}
          className="h-8 w-8"
        />
      )}
      <span className="font-heading">{brandName}</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-6 py-2.5 rounded-xl font-semibold text-sm relative cursor-pointer hover:-translate-y-0.5 transition-all duration-300 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-gradient-to-br from-orange-primary to-orange-light text-white shadow-lg shadow-orange-primary/30 hover:shadow-xl hover:shadow-orange-primary/40",
    secondary: 
      "glass border-2 border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
