"use client";

import { Package, TrendingUp, Scale, Utensils, Heart } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function GlowingEffectDemo() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-[#2B3210] mb-8 text-center">
        Glowing Effect Demo - NutriFit Style
      </h2>
      
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GridItem
          icon={<TrendingUp className="h-5 w-5 text-[#DE6E27]" />}
          title="Prise de Masse"
          description="Augmentez votre masse musculaire avec nos programmes adaptés"
          gradient="from-orange-500 to-red-600"
        />

        <GridItem
          icon={<Scale className="h-5 w-5 text-[#2B3210]" />}
          title="Minceur"
          description="Perdez du poids sainement avec des repas équilibrés"
          gradient="from-emerald-500 to-green-600"
        />

        <GridItem
          icon={<Heart className="h-5 w-5 text-[#DE6E27]" />}
          title="Équilibré"
          description="Maintenez une alimentation saine au quotidien"
          gradient="from-amber-500 to-yellow-600"
        />

        <GridItem
          icon={<Package className="h-5 w-5 text-[#DE6E27]" />}
          title="Pack Découverte"
          description="Essayez nos repas sans engagement avec le pack 5 repas"
          gradient="from-orange-primary to-orange-light"
        />

        <GridItem
          icon={<Utensils className="h-5 w-5 text-[#2B3210]" />}
          title="Menu Personnalisé"
          description="Créez votre menu selon vos préférences alimentaires"
          gradient="from-olive-dark to-olive-muted"
        />
      </ul>
    </div>
  );
}

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const GridItem = ({ icon, title, description, gradient }: GridItemProps) => {
  return (
    <li className="min-h-[240px] list-none">
      <div className="relative h-full rounded-3xl border-2 border-[#E5E2D9] p-2 hover:border-[#DE6E27]/50 transition-colors duration-300">
        {/* Glowing Effect - Activated on hover */}
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={80}
          inactiveZone={0.01}
          borderWidth={2}
        />
        
        {/* Card Content with Glassmorphism */}
        <div 
          className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl p-8 glass-strong"
          style={{
            background: 'rgba(251, 248, 239, 0.8)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)'
          }}
        >
          <div className="relative flex flex-1 flex-col justify-between gap-4">
            {/* Icon with gradient background */}
            <div className={`w-fit rounded-xl bg-gradient-to-br ${gradient} p-3 shadow-lg`}>
              {icon}
            </div>
            
            {/* Text Content */}
            <div className="space-y-3">
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210] leading-tight">
                {title}
              </h3>
              <p className="text-base text-[#505631] leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
