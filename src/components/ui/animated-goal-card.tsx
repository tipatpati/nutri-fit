import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
interface AnimatedGoalCardProps {
  id: string;
  name: string;
  description: string;
  iconSrc: string;
  staticBg: string;
  animatedBg?: string;
  gradient: string;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}
export const AnimatedGoalCard = ({
  id,
  name,
  description,
  iconSrc,
  staticBg,
  animatedBg,
  gradient,
  isSelected,
  onSelect,
  index
}: AnimatedGoalCardProps) => {
  return <motion.div initial={{
    opacity: 0,
    y: 30
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: 0.3 + index * 0.1,
    duration: 0.5
  }} whileHover={{
    y: -12,
    scale: 1.03
  }} onClick={onSelect} className={cn("group cursor-pointer overflow-hidden relative h-[500px] rounded-3xl shadow-xl transition-all duration-500 border-2", isSelected ? "border-[#DE6E27] scale-[1.03] shadow-2xl shadow-[#DE6E27]/20" : "border-transparent hover:border-[#DE6E27]/30 hover:shadow-2xl",
  // Static background
  `bg-cover bg-center`,
  // Preload animated background
  animatedBg && "before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
  // Hover states (desktop only via @media hover)
  animatedBg && "@media (hover: hover) { hover:bg-[var(--animated-bg)] }", "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black/50 hover:after:z-10")} style={{
    backgroundImage: `url(${staticBg})`,
    // @ts-ignore - CSS custom property for animated background
    '--animated-bg': animatedBg ? `url(${animatedBg})` : undefined
  }}>
      {/* Shimmer effect on hover */}
      <motion.div initial={{
      x: '-100%'
    }} whileHover={{
      x: '200%'
    }} transition={{
      duration: 1
    }} className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-20" />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      
      {/* Icon Header */}
      <div className={cn("absolute top-0 left-0 right-0 h-44 bg-gradient-to-br", gradient, "opacity-40 flex items-center justify-center z-20")}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
        <motion.div whileHover={{
        scale: 1.15,
        rotate: 10
      }} transition={{
        type: "spring",
        stiffness: 300
      }} className="relative z-10 flex flex-col items-center">
          <motion.div animate={{
          y: [0, -5, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }} className="w-24 h-24 rounded-full bg-gradient-to-br from-white/40 via-white/20 to-transparent backdrop-blur-lg flex items-center justify-center shadow-2xl border border-white/30">
            <img src={iconSrc} alt={name} className="w-16 h-16 brightness-0 invert drop-shadow-2xl" />
          </motion.div>
          <h3 className="font-['Space_Grotesk'] text-3xl font-bold text-white drop-shadow-lg mt-4">
            {name}
          </h3>
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <p className="text-white leading-relaxed text-center text-lg mb-4 drop-shadow-lg">
          {description}
        </p>
        
        {isSelected && <motion.div initial={{
        opacity: 0,
        scale: 0.8,
        y: 10
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} transition={{
        type: "spring",
        stiffness: 200
      }} className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white px-6 py-3 rounded-full text-base font-bold flex items-center gap-2 shadow-xl">
              <CheckCircle className="w-5 h-5" />
              Objectif sélectionné
            </div>
          </motion.div>}
      </div>
    </motion.div>;
};