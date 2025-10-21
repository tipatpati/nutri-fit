"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "",
  words = ["Landing Pages", "Component Blocks", "Page Sections"],
  duration = 3000,
  className,
}: {
  text?: string;
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Goal colors mapping for dynamic border colors
  const goalColors: Record<string, string> = {
    "Équilibré": "#29B6F6",
    "Minceur": "#4CAF50",
    "Prise de Masse": "#DE6E27"
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  const currentWord = words[currentIndex];
  const borderColor = goalColors[currentWord] || "#DE6E27";

  return (
    <>
      {text && (
        <motion.span
          layoutId="subtext"
          className="text-xl md:text-2xl lg:text-3xl font-body font-semibold tracking-tight text-olive-muted"
        >
          {text}
        </motion.span>
      )}

      <motion.span
        layout
        className={cn(
          "relative inline-block w-fit overflow-hidden rounded-xl bg-white/95 px-6 py-3 text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#2B3210] shadow-xl border-2 transition-colors duration-500",
          className
        )}
        style={{ borderColor }}
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)", opacity: 0 }}
            animate={{
              y: 0,
              filter: "blur(0px)",
              opacity: 1
            }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1]
            }}
            className={cn("inline-block whitespace-nowrap")}
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};
