
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span style={{ color: '#113B39' }}>Repas</span><br />
                <span style={{ color: '#113B39' }}>prêts-à-manger</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
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
              <p className="text-sm text-gray-500">
                Plus de 15 nouveaux repas présentés cette semaine
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-[#113B39] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <p className="text-sm text-gray-600">Frais, jamais congelé</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-[#113B39] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🥗</span>
                </div>
                <p className="text-sm text-gray-600">Ingrédients sains</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-[#113B39] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">⏱</span>
                </div>
                <p className="text-sm text-gray-600">Prêt en 2 minutes</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-[#113B39] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🚚</span>
                </div>
                <p className="text-sm text-gray-600">Entreprise locale à Montréal</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#D4B961] to-[#525944] rounded-3xl p-8 text-center">
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
