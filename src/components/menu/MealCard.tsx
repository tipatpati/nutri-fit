import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Heart } from "lucide-react";
import { useCartStore } from "@/shared/stores/useCartStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MealCardProps {
  meal: {
    id: string;
    name: string;
    image_url: string | null;
    category: string;
    premium: boolean;
    badge?: string;
  };
  getCategoryColor: (category: string) => { bg: string; text: string; hex: string };
}

const MealCard = ({ meal, getCategoryColor }: MealCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showActions, setShowActions] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const today = new Date().toISOString().split('T')[0];
    const price = meal.premium ? 15.99 : 12.99;
    
    addItem({
      mealId: meal.id,
      mealName: meal.name,
      quantity,
      date: today,
      price,
    });
    
    setQuantity(1);
    setShowActions(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="h-full"
      role="article"
      aria-label={`Plat: ${meal.name}`}
    >
      <div className="glass-strong overflow-hidden h-full hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#DE6E27]/30 relative rounded-3xl">
        {/* Shimmer effect */}
        <motion.div
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-10"
        />
        {/* Image with gradient overlay */}
        <div className="relative h-56 overflow-hidden">
          <motion.img 
            src={meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} 
            alt={meal.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.15 : 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B3210]/90 via-[#2B3210]/30 to-transparent" />
          
          {/* Favorite Heart Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 w-10 h-10 glass-strong rounded-full flex items-center justify-center border-2 border-white/30 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 z-10"
          >
            <Heart 
              className={`w-5 h-5 transition-all duration-300 ${
                isFavorite 
                  ? 'fill-[#DE6E27] text-[#DE6E27]' 
                  : 'text-white'
              }`}
            />
          </motion.button>
          
          {meal.badge && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute top-3 left-3 glass-strong px-3 py-1.5 rounded-full text-[#2B3210] text-sm font-bold border-2 border-white/30"
            >
              {meal.badge}
            </motion.div>
          )}
          
          {meal.premium && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="absolute top-12 left-3 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xl"
            >
              ⭐ Premium
            </motion.div>
          )}
        </div>

        {/* Content area */}
        <div className="p-6 space-y-4">
        {/* Horizontal nutritional info */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-olive-dark"></span>
            <span className="text-olive-muted font-medium">450 cal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-primary"></span>
            <span className="text-olive-muted font-medium">35g protein</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-info"></span>
            <span className="text-olive-muted font-medium">45g carbs</span>
          </div>
        </div>

          {/* Quick Add Actions with AnimatePresence */}
          <AnimatePresence mode="wait">
            {showActions ? (
              <motion.div
                key="actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuantity(Math.max(1, quantity - 1));
                  }}
                  className="h-10 w-10 p-0 rounded-full border-2 border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white"
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-bold text-olive-dark flex-1 text-center min-w-[40px]">
                  {quantity}
                </span>
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuantity(quantity + 1);
                  }}
                  className="h-10 w-10 p-0 rounded-full border-2 border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="filled"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-primary to-orange-light hover:shadow-xl shadow-orange-primary/30"
                  aria-label={`Ajouter ${quantity} ${meal.name} au panier`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </motion.div>
            ) : (
              <motion.button
                key="command"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full glass border-2 border-orange-primary text-orange-primary font-semibold py-3 rounded-xl hover:bg-orange-primary hover:text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setShowActions(true)}
              >
                Commander
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default MealCard;
