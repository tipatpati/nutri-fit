
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Clock, Truck, Heart } from "lucide-react";
import { AnimatedArrowRight, AnimatedClock, AnimatedHeart } from "./ui/animated-icon";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url(/lovable-uploads/ff5ffe15-1c41-47b5-92cd-30cb2ecf8549.png)'
        }}
      ></div>
      
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-orange-500/10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
                <span className="text-emerald-400 text-xs sm:text-sm font-medium">✨ Nouveau - Livraison express en 30 min</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  Repas
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
                  santé & saveur
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Des repas équilibrés, préparés par des chefs et livrés directement chez vous.
                <span className="block mt-2 text-emerald-400 font-medium">Commandez en 30 secondes, sans inscription</span>
              </p>
            </div>

            {/* Quick Order Section */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
              <h3 className="text-white font-bold text-lg lg:text-xl mb-4 lg:mb-6 flex items-center justify-center lg:justify-start">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></span>
                Commande express
              </h3>
              
              <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-4 lg:mb-6">
                <button className="group p-3 lg:p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl lg:rounded-2xl hover:from-orange-500/30 hover:to-orange-600/30 transition-all duration-300 transform hover:scale-105">
                  <div className="text-2xl lg:text-3xl mb-1 lg:mb-2 group-hover:scale-110 transition-transform">💪</div>
                  <div className="text-xs font-medium text-white">Prise de masse</div>
                </button>
                <button className="group p-3 lg:p-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-xl lg:rounded-2xl hover:from-emerald-500/30 hover:to-emerald-600/30 transition-all duration-300 transform hover:scale-105">
                  <div className="text-2xl lg:text-3xl mb-1 lg:mb-2 group-hover:scale-110 transition-transform">🏃</div>
                  <div className="text-xs font-medium text-white">Perte de poids</div>
                </button>
                <button className="group p-3 lg:p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl lg:rounded-2xl hover:from-yellow-500/30 hover:to-yellow-600/30 transition-all duration-300 transform hover:scale-105">
                  <div className="text-2xl lg:text-3xl mb-1 lg:mb-2 group-hover:scale-110 transition-transform">⚖️</div>
                  <div className="text-xs font-medium text-white">Équilibré</div>
                </button>
              </div>
              
              <Button 
                onClick={handleOrderClick}
                size="lg" 
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-base lg:text-lg font-semibold py-3 lg:py-4 rounded-xl lg:rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Commander maintenant
                <AnimatedArrowRight className="ml-2" size={20} />
              </Button>
              
              <div className="flex items-center justify-center mt-3 lg:mt-4 space-x-4 lg:space-x-6 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center">
                  <Truck className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 text-emerald-400" />
                  Livraison gratuite
                </div>
                <div className="flex items-center">
                  <Heart className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 text-orange-400" />
                  Sans compte requis
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[
                { type: 'component', icon: AnimatedHeart, label: "100% Frais", color: "text-red-400" },
                { type: 'emoji', icon: "🥗", label: "Bio & Local", color: "text-green-400" },
                { type: 'component', icon: AnimatedClock, label: "Prêt en 2min", color: "text-blue-400" },
                { type: 'lucide', icon: Truck, label: "Livraison rapide", color: "text-purple-400" }
              ].map((item, index) => (
                <div key={index} className="text-center space-y-2 lg:space-y-3 group">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 mx-auto bg-white/10 backdrop-blur rounded-xl lg:rounded-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-all duration-300">
                     {item.type === 'emoji' ? (
                       <span className="text-xl lg:text-2xl">{item.icon as string}</span>
                     ) : item.type === 'component' ? (
                       React.createElement(item.icon as React.ComponentType<any>, { size: 24, color: "currentColor", className: item.color })
                     ) : (
                       React.createElement(item.icon as React.ComponentType<any>, { className: `w-5 h-5 lg:w-6 lg:h-6 ${item.color}` })
                     )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Enhanced Social Proof */}
          <div className="relative mt-8 lg:mt-0">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl">
              <div className="space-y-6 lg:space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 lg:mb-4">
                    nutri<span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent px-2 rounded">fit</span>
                  </h2>
                  <div className="flex items-center justify-center space-x-2 mb-2 lg:mb-3">
                    <div className="text-yellow-400 text-xl lg:text-2xl">★★★★★</div>
                    <span className="text-white font-bold text-lg lg:text-xl">4.8/5</span>
                  </div>
                  <p className="text-sm lg:text-base text-gray-300">+842 clients satisfaits ce mois-ci</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3 lg:gap-4">
                  {[
                    { title: "💪 Prise de masse", desc: "Repas riches en protéines", cal: "650-720 cal", color: "from-orange-500/20 to-red-500/20 border-orange-500/30" },
                    { title: "🏃 Perte de poids", desc: "Faibles calories, riches nutriments", cal: "350-420 cal", color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30" },
                    { title: "⚖️ Équilibré", desc: "Parfait pour maintenir votre forme", cal: "520-580 cal", color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30" }
                  ].map((item, index) => (
                    <div key={index} className={`bg-gradient-to-r ${item.color} border backdrop-blur rounded-xl lg:rounded-2xl p-3 lg:p-4 hover:scale-[1.02] transition-all duration-300`}>
                      <h3 className="font-semibold mb-1 lg:mb-2 text-white text-sm lg:text-base">{item.title}</h3>
                      <p className="text-xs lg:text-sm text-gray-300 mb-2">{item.desc}</p>
                      <div className="text-xs bg-white/20 backdrop-blur px-2 lg:px-3 py-1 rounded-full inline-block text-white font-medium">
                        {item.cal}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Testimonial */}
                <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-white/20">
                  <div className="flex items-start space-x-3 lg:space-x-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-400 to-orange-400 rounded-full flex items-center justify-center font-bold text-white text-base lg:text-lg shadow-lg flex-shrink-0">
                      M
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-200 italic mb-2 lg:mb-3 leading-relaxed">
                        "Interface intuitive, repas délicieux et livraison ultra-rapide. Le service client est exceptionnel !"
                      </p>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-white">Marc Kouadio</p>
                        <p className="text-xs text-gray-400">Client fidèle depuis 8 mois</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
