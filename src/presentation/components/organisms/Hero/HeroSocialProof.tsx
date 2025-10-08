import { HeroTestimonial } from "../../molecules/Hero/HeroTestimonial";
import { Icon } from "@/components/ui/icon";

export const HeroSocialProof = () => {
  const mealCategories = [
    { 
      icon: "muscle",
      title: "Prise de masse", 
      desc: "Repas riches en protéines", 
      cal: "650-720 cal", 
      color: "from-orange-500/20 to-red-500/20 border-orange-500/30" 
    },
    { 
      icon: "running",
      title: "Perte de poids", 
      desc: "Faibles calories, riches nutriments", 
      cal: "350-420 cal", 
      color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30" 
    },
    { 
      icon: "scale-balance",
      title: "Équilibré", 
      desc: "Parfait pour maintenir votre forme", 
      cal: "520-580 cal", 
      color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30" 
    }
  ] as const;

  return (
    <div className="relative">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-8">
        {/* Header */}
        <div className="text-center pb-6 border-b border-white/10">
          <h2 className="text-3xl font-bold text-white mb-3">
            nutri<span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">fit</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="text-yellow-400 text-lg">★★★★★</div>
            <span className="text-white text-lg font-semibold">4.8/5</span>
          </div>
          <p className="text-sm text-gray-400">
            +842 clients satisfaits ce mois-ci
          </p>
        </div>
        
        {/* Meal Categories */}
        <div className="space-y-3">
          {mealCategories.map((item, index) => (
            <div 
              key={index} 
              className={`bg-gradient-to-r ${item.color} border backdrop-blur rounded-xl p-4 transition-transform duration-200 hover:scale-[1.01] flex items-center gap-3`}
            >
              <div className="flex-shrink-0">
                <Icon name={item.icon} size={20} className="brightness-0 invert" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-gray-200 mb-2">{item.desc}</p>
                <div className="text-xs bg-white/20 backdrop-blur px-2 py-1 rounded-full inline-block text-white font-medium">
                  {item.cal}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Testimonial */}
        <div className="pt-6 border-t border-white/10">
          <HeroTestimonial
            initial="M"
            name="Marc Kouadio"
            role="Client fidèle depuis 8 mois"
            quote="Interface intuitive, repas délicieux et livraison ultra-rapide."
          />
        </div>
      </div>
    </div>
  );
};
