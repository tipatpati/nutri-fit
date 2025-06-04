
import { Button } from "./ui/button";

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
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-white drop-shadow-lg">Repas</span><br />
                <span className="text-white drop-shadow-lg">prêts-à-manger</span>
              </h1>
              <p className="text-lg text-white/90 max-w-md drop-shadow">
                Frais et santé, livrés à votre porte
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                size="lg" 
                className="bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white px-8 py-4 text-lg"
              >
                Commencer
              </Button>
              <p className="text-sm text-white/80 drop-shadow">
                Plus de 15 nouveaux repas présentés cette semaine
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-[#113B39] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <p className="text-sm text-white/90 drop-shadow">Frais, jamais congelé</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-[#113B39] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🥗</span>
                </div>
                <p className="text-sm text-white/90 drop-shadow">Ingrédients sains</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-[#113B39] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">⏱</span>
                </div>
                <p className="text-sm text-white/90 drop-shadow">Prêt en 2 minutes</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-[#113B39] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🚚</span>
                </div>
                <p className="text-sm text-white/90 drop-shadow">Entreprise locale à Montréal</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#D4B961] to-[#525944] rounded-3xl p-8 text-center backdrop-blur-sm bg-white/10">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">
                  fit<span className="bg-[#FF4D00] px-2 rounded">meals</span>
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-white">
                    <h3 className="font-semibold mb-2">Prise de masse</h3>
                    <p className="text-sm opacity-90">Repas riches en protéines et calories</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-white">
                    <h3 className="font-semibold mb-2">Perte de poids</h3>
                    <p className="text-sm opacity-90">Repas faibles en calories, riches en nutriments</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-white">
                  <h3 className="font-semibold mb-2">Équilibré</h3>
                  <p className="text-sm opacity-90">Repas parfaitement équilibrés pour maintenir votre forme</p>
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
