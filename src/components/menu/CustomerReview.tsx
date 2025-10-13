
const CustomerReview = () => {
  return (
    <div className="bg-[hsl(var(--md-sys-color-surface-container))] rounded-[var(--md-sys-shape-corner-extra-large)] p-4 sm:p-8 lg:p-12 mb-8 sm:mb-16 lg:mb-20 md-elevation-2 border border-[hsl(var(--md-sys-color-outline-variant))] mx-2">
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
        <div>
          <h2 className="md-headline-large text-[hsl(var(--md-sys-color-on-surface))] mb-4 sm:mb-6 leading-tight">
            Le choix de prêt-à-manger numéro 1 au pays
          </h2>
          <p className="md-body-large text-[hsl(var(--md-sys-color-on-surface-variant))] mb-6 sm:mb-8 leading-relaxed">
            Partenaire de prêt-à-manger "top plans entreprises des normes de goût et qualité au Québec, en Ontario et dans les Maritimes.
          </p>
          
          {/* Customer Review */}
          <div className="bg-[hsl(var(--md-sys-color-surface))] rounded-[var(--md-sys-shape-corner-large)] p-4 sm:p-6 lg:p-8 md-elevation-1 border border-[hsl(var(--md-sys-color-outline-variant))]">
            <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-secondary))] rounded-full flex items-center justify-center text-white font-bold md-title-medium md-elevation-1 flex-shrink-0">
                L
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 lg:gap-3 mb-2 sm:mb-3">
                  <span className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))]">Lacey</span>
                  <span className="md-body-small text-[hsl(var(--md-sys-color-on-surface-variant))]">19 janvier 2024</span>
                  <div className="flex text-[hsl(var(--md-sys-color-tertiary))] md-body-medium">★★★★★</div>
                </div>
                <p className="md-body-medium text-[hsl(var(--md-sys-color-on-surface-variant))] leading-relaxed">
                  "Les repas étaient vraiment délicieux, surtout les mini quiches! Os, pas, service à la clientèle impeccable..."
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative order-first lg:order-last">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-xl sm:rounded-2xl blur-xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop"
            alt="Happy customers with meals"
            className="relative rounded-xl sm:rounded-2xl w-full h-48 sm:h-64 lg:h-auto object-cover shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
