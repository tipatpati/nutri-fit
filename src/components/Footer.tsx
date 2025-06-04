
const Footer = () => {
  return (
    <footer className="bg-[#113B39] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">FitMeals</h3>
            <p className="text-gray-300">
              Des repas sains et équilibrés pour atteindre vos objectifs de fitness.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-[#FF4D00] rounded-full flex items-center justify-center">
                📘
              </a>
              <a href="#" className="w-8 h-8 bg-[#FF4D00] rounded-full flex items-center justify-center">
                📷
              </a>
              <a href="#" className="w-8 h-8 bg-[#FF4D00] rounded-full flex items-center justify-center">
                🐦
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">FitMeals</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Presse</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Forfaits</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recommandations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Entreprise</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Nous contacter</h4>
            <div className="space-y-2 text-gray-300">
              <p>info@fitmeals.ca</p>
              <p>1-844-932-6325</p>
              <p>Montréal, QC</p>
            </div>
            <div className="space-x-2">
              <button className="bg-white text-[#113B39] px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors">
                Nous joindre
              </button>
              <button className="bg-[#FF4D00] text-white px-4 py-2 rounded font-medium hover:bg-[#FF4D00]/90 transition-colors">
                Voir la FAQ
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 FitMeals. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
