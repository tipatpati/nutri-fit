
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const questions = [
    "Offrez-vous des options végétariennes?",
    "Est-ce que vos repas sont sans ?"
  ];

  return (
    <div className="text-center mb-8 sm:mb-16 lg:mb-20 px-2">
      <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 bg-gradient-to-r from-slate-800 to-emerald-800 bg-clip-text text-transparent">
        Questions fréquemment posées
      </h2>
      <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 lg:space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="bg-white/90 backdrop-blur-sm border border-emerald-100/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <button className="w-full flex justify-between items-center text-left text-sm sm:text-base lg:text-lg font-medium text-slate-800 hover:text-emerald-700 transition-colors duration-300">
              <span className="pr-2 leading-relaxed">{question}</span>
              <span className="text-xl sm:text-2xl text-emerald-600 font-light flex-shrink-0">+</span>
            </button>
          </div>
        ))}
      </div>
      <Button 
        variant="outline" 
        className="mt-6 sm:mt-8 lg:mt-12 border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-xl font-semibold transition-all duration-300 bg-white/80 backdrop-blur-sm w-full sm:w-auto"
      >
        Voir la FAQ
      </Button>
    </div>
  );
};

export default FAQ;
