
const CustomerReview = () => {
  return (
    <div className="bg-gradient-to-br from-white/90 to-emerald-50/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 mb-16 lg:mb-20 shadow-xl border border-emerald-100/50">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-emerald-800 bg-clip-text text-transparent">
            Le choix de prêt-à-manger numéro 1 au pays
          </h2>
          <p className="text-slate-600 mb-8 text-base lg:text-lg leading-relaxed">
            Partenaire de prêt-à-manger "top plans entreprises des normes de goût et qualité au Québec, en Ontario et dans les Maritimes.
          </p>
          
          {/* Customer Review */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-emerald-100/50">
            <div className="flex items-start gap-4 lg:gap-6">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-lg">
                L
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 mb-3">
                  <span className="font-semibold text-base lg:text-lg text-slate-800">Lacey</span>
                  <span className="text-sm lg:text-base text-slate-500">19 janvier 2024</span>
                  <div className="flex text-amber-400 text-lg">★★★★★</div>
                </div>
                <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                  "Les repas étaient vraiment délicieux, surtout les mini quiches! Os, pas, service à la clientèle impeccable..."
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative order-first lg:order-last">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl blur-xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop"
            alt="Happy customers with meals"
            className="relative rounded-2xl w-full h-64 lg:h-auto object-cover shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
