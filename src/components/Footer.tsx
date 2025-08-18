
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent mb-3">
                NutriFit
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Des repas sains et équilibrés pour atteindre vos objectifs de fitness. 
                Nutrition de qualité, préparée avec passion.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="group w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg shadow-blue-500/25">
                <Facebook className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="group w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg shadow-pink-500/25">
                <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="group w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg shadow-sky-500/25">
                <Twitter className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Entreprise</h4>
            <ul className="space-y-3">
              {["À propos", "Carrières", "Blog", "Presse", "Partenaires"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Services</h4>
            <ul className="space-y-3">
              {["Forfaits", "Menu", "Recommandations", "Entreprise", "Nutrition coaching"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Nous contacter</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span>info@nutrifit.dz</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>+213 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Oran, Algérie</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-[hsl(var(--md-sys-color-surface))] text-[hsl(var(--md-sys-color-on-surface))] px-6 py-3 rounded-[12px] font-semibold hover:bg-[hsl(var(--md-sys-color-surface-container))] transition-all duration-300 hover:scale-105 md-elevation-1">
                Nous joindre
              </button>
              <button className="w-full bg-[hsl(var(--md-sys-color-primary))] text-[hsl(var(--md-sys-color-on-primary))] px-6 py-3 rounded-[12px] font-semibold hover:bg-[hsl(var(--md-sys-color-primary))]/90 transition-all duration-300 hover:scale-105 md-elevation-2">
                Voir la FAQ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-700 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Restez informé</h4>
              <p className="text-gray-300">Recevez nos dernières offres et conseils nutrition</p>
            </div>
            <div className="flex space-x-3">
              <input 
                type="email" 
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur"
              />
              <button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2024 NutriFit. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
