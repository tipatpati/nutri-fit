import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import dumbbellIcon from "@/assets/icons/dumbbell.svg";
import shakerBottleIcon from "@/assets/icons/shaker-bottle.svg";
import deliveryTruckIcon from "@/assets/icons/delivery-truck.svg";
const MealCategories = () => {
  const steps = [{
    number: '1',
    title: 'Choisissez votre programme',
    description: 'Sélectionnez l\'objectif qui correspond à vos besoins nutritionnels et fitness',
    icon: dumbbellIcon,
    bgColor: 'bg-[hsl(var(--md-sys-color-primary-container))]',
    numberColor: 'text-[hsl(var(--md-sys-color-primary))]'
  }, {
    number: '2',
    title: 'Choisissez votre pack',
    description: 'Configurez votre formule idéale selon vos préférences et votre rythme',
    icon: shakerBottleIcon,
    bgColor: 'bg-[hsl(var(--md-sys-color-secondary-container))]',
    numberColor: 'text-[hsl(var(--md-sys-color-secondary))]'
  }, {
    number: '3',
    title: 'Choisissez la date de livraison',
    description: 'Recevez vos repas préparés directement à votre porte aux dates qui vous conviennent',
    icon: deliveryTruckIcon,
    bgColor: 'bg-[hsl(var(--md-sys-color-tertiary-container))]',
    numberColor: 'text-[hsl(var(--md-sys-color-tertiary))]'
  }];
  return <section className="relative py-16 md:py-20 lg:py-28 bg-gradient-to-br from-[#FBF8EF] via-[#E5E2D9] to-[#FBF8EF] overflow-hidden">
      {/* Animated Background - Reduced on mobile */}
      <div className="absolute inset-0 hidden md:block">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#DE6E27]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, delay: 5 }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#2B3210]/5 rounded-full blur-3xl"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 glass-strong rounded-full border-2 border-[#DE6E27]/20 mb-6"
          >
            <Icon name="stopwatch" size={16} className="text-[#DE6E27]" />
            <span className="font-semibold text-[#2B3210]">3 étapes simples</span>
          </motion.div>
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2B3210] mb-6 leading-[1.2]">
            Comment ça fonctionne ?
          </h2>
          <p className="text-base md:text-lg text-[#505631] max-w-2xl mx-auto leading-[1.7]">
            Économisez du temps et profitez de repas prêts-à-manger nutritifs en 3 étapes faciles
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              {/* Glass Card Background */}
              <div className="glass-strong rounded-3xl p-6 md:p-8 h-full relative overflow-hidden border-2 border-transparent hover:border-[#DE6E27]/30 transition-all duration-300 shadow-lg select-none active:scale-[0.98] md:active:scale-100">
                {/* Gradient on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#DE6E27]/5 to-[#ff8040]/5 rounded-3xl -z-10"
                />
                
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 text-8xl font-bold text-[#DE6E27]/10 leading-none pointer-events-none">
                  {step.number}
                </div>
                
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.bgColor.replace('bg-', 'from-')} to-[#DE6E27]/20 mb-6 shadow-xl`}
                >
                  <img 
                    src={step.icon} 
                    alt={step.title} 
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                </motion.div>
                
                {/* Content */}
                <h3 className="font-['Space_Grotesk'] text-xl md:text-2xl font-bold text-[#2B3210] mb-4 leading-[1.25]">
                  {step.title}
                </h3>
                <p className="text-[#505631] leading-[1.7] text-base">
                  {step.description}
                </p>
              </div>

              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  className="hidden md:block absolute top-20 -right-8 lg:-right-12 text-[#DE6E27]/30 group-hover:text-[#DE6E27] transition-colors duration-300"
                >
                  <motion.svg
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link to="/menu" className="inline-block w-full sm:w-auto">
            <Button 
              size="lg"
              className="w-full sm:w-auto min-h-[56px] px-10 py-6 text-base md:text-lg bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white rounded-xl shadow-lg hover:shadow-2xl md:hover:-translate-y-1 transition-all duration-300 font-bold active:scale-[0.97] select-none"
            >
              Commencer maintenant
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>;
};
export default MealCategories;