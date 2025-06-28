
import { Button } from "./ui/button";
import { ArrowRight, Clock, Truck, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-orange-500/10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
                <span className="text-emerald-400 text-sm font-medium">✨ Nouveau - Livraison express en 30 min</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  Repas
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
                  santé & saveur
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Des repas équilibrés, préparés par des chefs et livrés directement chez vous.
                <span className="block mt-2 text-emerald-400 font-medium">Commandez en 30 secondes, sans inscription</span>
              </p>
            </div>

            {/* Quick Order Section */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></span>
                Commande express
              </h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button className="group p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-2xl hover:from-orange-500/30 hover:to-orange-600/30 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💪</div>
                  <div className="text-xs font-medium text-white">Prise de masse</div>
                </button>
                <button className="group p-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-2xl hover:from-emerald-500/30 hover:to-emerald-600/30 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🏃</div>
                  <div className="text-xs font-medium text-white">Perte de poids</div>
                </button>
                <button className="group p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-2xl hover:from-yellow-500/30 hover:to-yellow-600/30 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">⚖️</div>
                  <div className="text-xs font-medium text-white">Équilibré</div>
                </button>
              </div>
              
              <Button 
                onClick={handleOrderClick}
                size="lg" 
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-lg font-semibold py-4 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Commander maintenant
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-300">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-emerald-400" />
                  Livraison gratuite
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-orange-400" />
                  Sans compte requis
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Heart, label: "100% Frais", color: "text-red-400" },
                { icon: "🥗", label: "Bio & Local", color: "text-green-400" },
                { icon: Clock, label: "Prêt en 2min", color: "text-blue-400" },
                { icon: Truck, label: "Livraison rapide", color: "text-purple-400" }
              ].map((item, index) => (
                <div key={index} className="text-center space-y-3 group">
                  <div className="w-14 h-14 mx-auto bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-all duration-300">
                    {typeof item.icon === 'string' ? (
                      <span className="text-2xl">{item.icon}</span>
                    ) : (
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    )}
                  </div>
                  <p className="text-sm text-gray-300 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Enhanced Social Proof */}
          <div className="relative">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-white mb-4">
                    nutri<span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent px-2 rounded">fit</span>
                  </h2>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <div className="text-yellow-400 text-2xl">★★★★★</div>
                    <span className="text-white font-bold text-xl">4.8/5</span>
                  </div>
                  <p className="text-gray-300">+842 clients satisfaits ce mois-ci</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { title: "💪 Prise de masse", desc: "Repas riches en protéines", cal: "650-720 cal", color: "from-orange-500/20 to-red-500/20 border-orange-500/30" },
                    { title: "🏃 Perte de poids", desc: "Faibles calories, riches nutriments", cal: "350-420 cal", color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30" },
                    { title: "⚖️ Équilibré", desc: "Parfait pour maintenir votre forme", cal: "520-580 cal", color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30" }
                  ].map((item, index) => (
                    <div key={index} className={`bg-gradient-to-r ${item.color} border backdrop-blur rounded-2xl p-4 hover:scale-[1.02] transition-all duration-300`}>
                      <h3 className="font-semibold mb-2 text-white">{item.title}</h3>
                      <p className="text-sm text-gray-300 mb-2">{item.desc}</p>
                      <div className="text-xs bg-white/20 backdrop-blur px-3 py-1 rounded-full inline-block text-white font-medium">
                        {item.cal}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Testimonial */}
                <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-orange-400 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                      M
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-200 italic mb-3 leading-relaxed">
                        "Interface intuitive, repas délicieux et livraison ultra-rapide. Le service client est exceptionnel !"
                      </p>
                      <div>
                        <p className="text-sm font-semibold text-white">Marc Kouadio</p>
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
