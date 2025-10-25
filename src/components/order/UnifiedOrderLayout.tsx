import { motion } from "framer-motion";
import { ReactNode } from "react";

interface UnifiedOrderLayoutProps {
  mealGrid: ReactNode;
  orderSidebar: ReactNode;
}

const UnifiedOrderLayout = ({ mealGrid, orderSidebar }: UnifiedOrderLayoutProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Left: Meal Selection Grid */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-8"
      >
        {mealGrid}
      </motion.div>

      {/* Right: Sticky Order Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-4"
      >
        <div className="lg:sticky lg:top-24 space-y-6">
          {orderSidebar}
        </div>
      </motion.div>
    </div>
  );
};

export default UnifiedOrderLayout;
