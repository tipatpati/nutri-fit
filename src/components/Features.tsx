
import { Star, Award, CheckCircle, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: '🍽️',
      title: 'Frais, jamais congelé',
      description: 'Tous nos repas sont préparés frais quotidiennement avec des ingrédients de première qualité sourced localement',
      gradient: 'from-emerald-400 to-green-500'
    },
    {
      icon: '🚴',
      title: 'Spécialement pour les athlètes',
      description: 'Repas conçus par des nutritionnistes sportifs certifiés pour optimiser vos performances et atteindre vos objectifs',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      icon: '⏱️',
      title: 'Prêt en 2 minutes',
      description: 'Réchauffez et savourez. Pas de préparation, pas de vaisselle, plus de temps pour vous',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      icon: '🌱',
      title: 'Ingrédients de qualité',
      description: 'Nous utilisons uniquement des ingrédients frais, locaux et biologiques certifiés',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[hsl(var(--md-sys-color-surface))] via-[hsl(var(--md-sys-color-surface-container-low))] to-[hsl(var(--md-sys-color-surface))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium text-sm mb-6">
            <Award className="w-4 h-4 mr-2" />
            Pourquoi nous choisir
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Le choix numéro 1 des sportifs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Votre partenaire de confiance pour atteindre vos objectifs de prise de masse, perte de poids ou régime équilibré
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="group text-center space-y-6 p-8 bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Testimonial Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white shadow-2xl overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ce que nos clients disent de nous
                </h3>
                <p className="text-gray-300 text-lg">
                  Découvrez pourquoi plus de 10 000 personnes nous font confiance chaque jour
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 text-lg mr-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-white font-semibold">5.0/5</span>
                </div>
                
                <p className="text-lg mb-6 leading-relaxed text-gray-100">
                  "Les repas sont délicieux et m'aident vraiment à atteindre mes objectifs de fitness. 
                  La livraison est toujours à l'heure et la qualité constante. Le service client est exceptionnel !"
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    L
                  </div>
                  <div>
                    <p className="font-bold text-lg">Laura Benali</p>
                    <p className="text-gray-300">Coach sportive • Cliente depuis 2 ans</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
                <div className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  4.8/5
                </div>
                <div className="flex justify-center text-yellow-400 text-2xl mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <p className="text-2xl font-bold mb-2">Excellent</p>
                <p className="text-gray-300">Basé sur 2,847 avis clients vérifiés</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">10K+</div>
                  <div className="text-xs text-gray-300">Clients satisfaits</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-400 mb-1">98%</div>
                  <div className="text-xs text-gray-300">Taux de satisfaction</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-400 mb-1">2M+</div>
                  <div className="text-xs text-gray-300">Repas livrés</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
