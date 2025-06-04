
const Features = () => {
  const features = [
    {
      icon: '🍽️',
      title: 'Frais, jamais congelé',
      description: 'Tous nos repas sont préparés frais quotidiennement avec des ingrédients de première qualité'
    },
    {
      icon: '🚴',
      title: 'Spécialement pour les athlètes',
      description: 'Repas conçus par des nutritionnistes sportifs pour optimiser vos performances'
    },
    {
      icon: '⏱️',
      title: 'Prêt en 2 minutes',
      description: 'Réchauffez et savourez. Pas de préparation, pas de nettoyage'
    },
    {
      icon: '🌱',
      title: 'Ingrédients de qualité',
      description: 'Nous utilisons uniquement des ingrédients frais, locaux et biologiques quand possible'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#113B39' }}>
            Le choix de prêt-à-manger numéro 1 au pays
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Partenaire de prêt-à-manger, nous plaçons constamment les normes de goût et qualité au Québec, en Ontario et dans les Maritimes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#113B39] rounded-full flex items-center justify-center text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold" style={{ color: '#113B39' }}>
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 bg-[#113B39] rounded-2xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ce que nos clients disent sur nous</h3>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <p className="text-lg mb-4">
                  "Les repas sont délicieux et m'aident vraiment à atteindre mes objectifs de fitness. 
                  La livraison est toujours à l'heure et la qualité constante."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#D4B961] rounded-full flex items-center justify-center font-bold">
                    L
                  </div>
                  <div>
                    <p className="font-semibold">Laura</p>
                    <p className="text-sm opacity-80">13 janvier 2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#D4B961] mb-2">4.8/5</div>
              <div className="text-yellow-400 text-2xl mb-2">★★★★★</div>
              <p className="text-lg">Excellent</p>
              <p className="text-sm opacity-80">Basé sur 842 avis clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
