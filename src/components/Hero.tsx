
import { Button } from "./ui/button";
import { ArrowRight, Clock, Truck, Heart } from "lucide-react";

const Hero = () => {
  return (
    <section 
      className="relative py-16 lg:py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1618386095230-c210e3769fb4?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-white drop-shadow-lg">Repas</span><br />
                <span className="text-white drop-shadow-lg">prêts-à-manger</span>
              </h1>
              <p className="text-xl text-white/95 max-w-md drop-shadow font-medium">
                Frais et santé, livrés à votre porte.<br />
                <span className="text-[#D4B961]">Commandez en 30 secondes, sans inscription</span>
              </p>
            </div>

            {/* Quick Order Section */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl">
              <h3 className="text-[#113B39] font-bold text-lg mb-4">Commande express ⚡</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <button className="p-3 border-2 border-[#FF4D00] bg-[#FF4D00]/10 rounded-lg hover:bg-[#FF4D00]/20 transition-colors">
                  <div className="text-2xl mb-1">💪</div>
                  <div className="text-xs font-medium text-[#113B39]">Prise de masse</div>
                </button>
                <button className="p-3 border-2 border-[#113B39] bg-[#113B39]/10 rounded-lg hover:bg-[#113B39]/20 transition-colors">
                  <div className="text-2xl mb-1">🏃</div>
                  <div className="text-xs font-medium text-[#113B39]">Perte de poids</div>
                </button>
                <button className="p-3 border-2 border-[#D4B961] bg-[#D4B961]/10 rounded-lg hover:bg-[#D4B961]/20 transition-colors">
                  <div className="text-2xl mb-1">⚖️</div>
                  <div className="text-xs font-medium text-[#113B39]">Équilibré</div>
                </button>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white text-lg font-semibold py-4"
              >
                Commander maintenant
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-xs text-gray-600 text-center mt-2">
                🚚 Livraison gratuite • 📱 Aucun compte requis
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-white/90 drop-shadow font-medium">Frais, jamais congelé</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🥗</span>
                </div>
                <p className="text-sm text-white/90 drop-shadow font-medium">Ingrédients bio</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-white/90 drop-shadow font-medium">Prêt en 2 minutes</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-white/90 drop-shadow font-medium">Livraison rapide</p>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Social Proof */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#D4B961] to-[#525944] rounded-3xl p-8 text-center backdrop-blur-sm bg-white/10 shadow-2xl">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    nutri<span className="bg-[#FF4D00] px-2 rounded">fit</span>
                  </h2>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="text-yellow-400 text-xl">★★★★★</div>
                    <span className="text-white font-semibold">4.8/5</span>
                  </div>
                  <p className="text-sm text-white/90">+842 clients satisfaits</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/15 backdrop-blur rounded-xl p-4 text-white hover:bg-white/20 transition-colors">
                    <h3 className="font-semibold mb-2">💪 Prise de masse</h3>
                    <p className="text-sm opacity-90">Repas riches en protéines</p>
                    <div className="text-xs mt-2 bg-[#FF4D00] px-2 py-1 rounded">650-720 cal</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur rounded-xl p-4 text-white hover:bg-white/20 transition-colors">
                    <h3 className="font-semibold mb-2">🏃 Perte de poids</h3>
                    <p className="text-sm opacity-90">Faibles calories, riches nutriments</p>
                    <div className="text-xs mt-2 bg-[#113B39] px-2 py-1 rounded">350-420 cal</div>
                  </div>
                </div>
                
                <div className="bg-white/15 backdrop-blur rounded-xl p-4 text-white hover:bg-white/20 transition-colors">
                  <h3 className="font-semibold mb-2">⚖️ Équilibré</h3>
                  <p className="text-sm opacity-90">Parfait pour maintenir votre forme</p>
                  <div className="text-xs mt-2 bg-[#D4B961] px-2 py-1 rounded">520-580 cal</div>
                </div>
                
                {/* Quick testimonial */}
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-left">
                  <p className="text-sm text-white/95 italic mb-3">
                    "Commande facile, livraison rapide, repas délicieux ! Je recommande 👍"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#D4B961] rounded-full flex items-center justify-center font-bold text-sm">
                      M
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Marc K.</p>
                      <p className="text-xs text-white/80">Client fidèle</p>
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
