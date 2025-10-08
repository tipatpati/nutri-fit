import { cn } from "@/lib/utils";

// Icon imports
import muscleIcon from "@/assets/icons/muscle.svg";
import runningIcon from "@/assets/icons/running.svg";
import scaleBalanceIcon from "@/assets/icons/scale-balance.svg";
import heartHealthIcon from "@/assets/icons/heart-health.svg";
import shakerBottleIcon from "@/assets/icons/shaker-bottle.svg";
import deliveryTruckIcon from "@/assets/icons/delivery-truck.svg";
import dumbbellIcon from "@/assets/icons/dumbbell.svg";
import calendarIcon from "@/assets/icons/calendar.svg";
import mobileTrackingIcon from "@/assets/icons/mobile-tracking.svg";
import blenderIcon from "@/assets/icons/blender.svg";
import scaleTimeIcon from "@/assets/icons/scale-time.svg";
import phoneIcon from "@/assets/icons/phone.svg";
import waterBottleIcon from "@/assets/icons/water-bottle.svg";
import fishIcon from "@/assets/icons/fish.svg";
import stopwatchIcon from "@/assets/icons/stopwatch.svg";
import leavesIcon from "@/assets/icons/leaves.svg";
import appleIcon from "@/assets/icons/apple.svg";

export const iconMap = {
  muscle: muscleIcon,
  running: runningIcon,
  "scale-balance": scaleBalanceIcon,
  "heart-health": heartHealthIcon,
  "shaker-bottle": shakerBottleIcon,
  "delivery-truck": deliveryTruckIcon,
  dumbbell: dumbbellIcon,
  calendar: calendarIcon,
  "mobile-tracking": mobileTrackingIcon,
  blender: blenderIcon,
  "scale-time": scaleTimeIcon,
  phone: phoneIcon,
  "water-bottle": waterBottleIcon,
  fish: fishIcon,
  stopwatch: stopwatchIcon,
  leaves: leavesIcon,
  apple: appleIcon,
} as const;

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number | string;
}

export const Icon = ({ name, className, size = 24 }: IconProps) => {
  const iconSrc = iconMap[name];

  return (
    <img
      src={iconSrc}
      alt={name}
      className={cn("inline-block", className)}
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
      }}
    />
  );
};
