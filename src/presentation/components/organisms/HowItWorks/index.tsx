import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Settings, Package, Truck } from "lucide-react";
import dumbbellIcon from "@/assets/icons/dumbbell.svg";
import shakerBottleIcon from "@/assets/icons/shaker-bottle.svg";
import deliveryTruckIcon from "@/assets/icons/delivery-truck.svg";

export const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Choisissez votre programme',
      description: 'Sélectionnez l\'objectif qui correspond à vos besoins nutritionnels et fitness',
      icon: dumbbellIcon,
      iconComponent: Settings,
      area: "md:[grid-area:1/1/2/5]"
    },
    {
      number: '2',
      title: 'Choisissez votre pack',
      description: 'Configurez votre formule idéale selon vos préférences et votre rythme',
      icon: shakerBottleIcon,
      iconComponent: Package,
      area: "md:[grid-area:1/5/2/9]"
    },
    {
      number: '3',
      title: 'Choisissez la date de livraison',
      description: 'Recevez vos repas préparés directement à votre porte aux dates qui vous conviennent',
      icon: deliveryTruckIcon,
      iconComponent: Truck,
      area: "md:[grid-area:1/9/2/13]"
    }
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-28 bg-gradient-to-br from-[#FBF8EF] via-[#E5E2D9] to-[#FBF8EF] overflow-hidden">
      {/* Background Image with Dark Olive Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/how-it-works-background.jpg" 
          alt="Fresh healthy meal background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark olive-green overlay for glassmorphism compatibility */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#2B3210]/75 via-[#2B3210]/65 to-[#505631]/60"
        />
        {/* Subtle radial gradient for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(43, 50, 16, 0.3) 70%, rgba(43, 50, 16, 0.5) 100%)'
          }}
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

        {/* Steps Grid with Glowing Cards */}
        <ul className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-1 lg:gap-8 mb-12 md:mb-16">
          {steps.map((step, idx) => (
            <GridItem
              key={step.number}
              area={step.area}
              icon={step.icon}
              IconComponent={step.iconComponent}
              number={step.number}
              title={step.title}
              description={step.description}
              index={idx}
            />
          ))}
        </ul>

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
    </section>
  );
};

interface GridItemProps {
  area: string;
  icon: string;
  IconComponent: React.ElementType;
  number: string;
  title: string;
  description: string;
  index: number;
}

const GridItem = ({ area, icon, IconComponent, number, title, description, index }: GridItemProps) => {
  return (
    <motion.li
      className={`min-h-[20rem] list-none ${area}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <div className="relative h-full rounded-2xl border-2 border-[#E5E2D9]/50 p-2 md:rounded-3xl md:p-3 group hover:border-[#DE6E27]/30 transition-colors duration-300">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-8 glass-strong shadow-lg">
          {/* Step Number Background */}
          <div className="absolute -top-4 -right-4 text-8xl md:text-9xl font-bold text-[#DE6E27]/10 leading-none pointer-events-none">
            {number}
          </div>

          <div className="relative flex flex-1 flex-col justify-between gap-6">
            {/* Icon Container */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-fit rounded-2xl border-2 border-[#DE6E27]/20 bg-gradient-to-br from-[#DE6E27]/10 to-[#ff8040]/10 p-4"
            >
              <img
                src={icon}
                alt={title}
                className="w-8 h-8 md:w-10 md:h-10"
              />
            </motion.div>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="font-['Space_Grotesk'] tracking-tight pt-0.5 text-2xl md:text-3xl font-bold text-[#2B3210] leading-tight">
                {title}
              </h3>
              <p className="font-['DM_Sans'] text-sm md:text-base leading-relaxed text-[#505631]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default HowItWorks;
