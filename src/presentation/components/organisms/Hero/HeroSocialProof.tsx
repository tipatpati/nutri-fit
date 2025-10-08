import { HeroTestimonial } from "../../molecules/Hero/HeroTestimonial";

export const HeroSocialProof = () => {
  const mealCategories = [
    { 
      title: "💪 Prise de masse", 
      desc: "Repas riches en protéines", 
      cal: "650-720 cal", 
      color: "from-orange-500/20 to-red-500/20 border-orange-500/30" 
    },
    { 
      title: "🏃 Perte de poids", 
      desc: "Faibles calories, riches nutriments", 
      cal: "350-420 cal", 
      color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30" 
    },
    { 
      title: "⚖️ Équilibré", 
      desc: "Parfait pour maintenir votre forme", 
      cal: "520-580 cal", 
      color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30" 
    }
  ];

  return (
    <div className="relative mt-md-8 lg:mt-0">
      <div className="md-surface-container-low/10 backdrop-blur-xl border border-md-outline-variant/20 rounded-xl lg:rounded-[24px] p-md-6 lg:p-md-8 md-elevation-2">
        <div className="space-y-md-6 lg:space-y-md-8">
          <div className="text-center">
            <h2 className="md-headline-medium lg:md-headline-large text-white mb-md-3 lg:mb-md-4">
              nutri<span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent px-md-2 rounded">fit</span>
            </h2>
            <div className="flex items-center justify-center space-x-md-2 mb-md-2 lg:mb-md-3">
              <div className="text-yellow-400 text-xl lg:text-2xl">★★★★★</div>
              <span className="text-white md-title-medium lg:md-title-large">4.8/5</span>
            </div>
            <p className="md-body-medium lg:md-body-large text-gray-300">
              +842 clients satisfaits ce mois-ci
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-md-3 lg:gap-md-4">
            {mealCategories.map((item, index) => (
              <div key={index} className={`bg-gradient-to-r ${item.color} border backdrop-blur rounded-xl lg:rounded-[16px] p-md-3 lg:p-md-4 hover:scale-[1.02] transition-all duration-300`}>
                <h3 className="md-label-large text-white mb-md-1 lg:mb-md-2">{item.title}</h3>
                <p className="md-body-small lg:md-body-medium text-gray-200 mb-md-2">{item.desc}</p>
                <div className="md-label-small bg-white/20 backdrop-blur px-md-2 lg:px-md-3 py-md-1 rounded-full inline-block text-white">
                  {item.cal}
                </div>
              </div>
            ))}
          </div>
          
          <HeroTestimonial
            initial="M"
            name="Marc Kouadio"
            role="Client fidèle depuis 8 mois"
            quote="Interface intuitive, repas délicieux et livraison ultra-rapide. Le service client est exceptionnel !"
          />
        </div>
      </div>
    </div>
  );
};
