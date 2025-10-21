import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Lacey",
    initial: "L",
    date: "19 janvier 2025",
    rating: 5,
    text: "Les repas étaient vraiment délicieux, surtout les mini quiches! Service à la clientèle impeccable. Je recommande vivement!",
    verified: true,
    gradient: "from-[#DE6E27] to-[#ff8040]",
  },
  {
    id: 2,
    name: "Marc",
    initial: "M",
    date: "15 janvier 2025",
    rating: 5,
    text: "Excellente qualité et portions généreuses. Les repas sont parfaits pour mes objectifs fitness. Livraison toujours à l'heure!",
    verified: true,
    gradient: "from-[#2B3210] to-[#505631]",
  },
  {
    id: 3,
    name: "Sophie",
    initial: "S",
    date: "12 janvier 2025",
    rating: 5,
    text: "Je suis cliente depuis 3 mois et je ne suis jamais déçue. Les repas sont variés, savoureux et nutritifs. Un vrai gain de temps!",
    verified: true,
    gradient: "from-[#4CAF50] to-[#29B6F6]",
  },
  {
    id: 4,
    name: "Ahmed",
    initial: "A",
    date: "8 janvier 2025",
    rating: 5,
    text: "Parfait pour ma prise de masse! Les macros sont exactement ce dont j'ai besoin. L'équipe est très professionnelle.",
    verified: true,
    gradient: "from-[#FFA726] to-[#DE6E27]",
  },
];

const CustomerReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
  };

  const currentReview = reviews[currentIndex];

  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 right-20 w-96 h-96 bg-[#DE6E27]/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 glass-strong rounded-full border-2 border-[#DE6E27]/20 mb-6"
          >
            <Star className="w-5 h-5 text-[#DE6E27] fill-current" />
            <span className="font-bold text-[#2B3210]">Témoignages</span>
          </motion.div>
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3210] mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-[#505631] max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="glass-strong rounded-3xl p-8 md:p-12 border-2 border-[#DE6E27]/20 shadow-2xl relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-8 left-8 w-16 h-16 text-[#DE6E27]/20" />
            
            {/* Carousel */}
            <div className="relative min-h-[300px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex-shrink-0"
                    >
                      <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${currentReview.gradient} flex items-center justify-center shadow-2xl border-4 border-white`}>
                        <span className="text-white font-bold text-4xl md:text-5xl">
                          {currentReview.initial}
                        </span>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      {/* Rating Stars */}
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[...Array(currentReview.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: i * 0.1, type: "spring" }}
                          >
                            <Star className="w-6 h-6 text-[#DE6E27] fill-current" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-lg md:text-xl text-[#2B3210] leading-relaxed mb-6 italic">
                        "{currentReview.text}"
                      </p>

                      {/* Author Info */}
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                        <div>
                          <p className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210]">
                            {currentReview.name}
                          </p>
                          <p className="text-[#505631]">{currentReview.date}</p>
                        </div>
                        {currentReview.verified && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="glass px-4 py-1.5 rounded-full border-2 border-[#4CAF50]/30"
                          >
                            <span className="text-[#4CAF50] text-sm font-semibold flex items-center gap-2">
                              <span>✓</span>
                              Achat vérifié
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevious}
                className="w-12 h-12 glass-strong rounded-full flex items-center justify-center border-2 border-[#E5E2D9] hover:border-[#DE6E27] transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-[#2B3210]" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-gradient-to-r from-[#DE6E27] to-[#ff8040]'
                        : 'w-2 bg-[#E5E2D9] hover:bg-[#505631]'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-12 h-12 glass-strong rounded-full flex items-center justify-center border-2 border-[#E5E2D9] hover:border-[#DE6E27] transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-[#2B3210]" />
              </motion.button>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto"
          >
            {[
              { value: '4.9/5', label: 'Note moyenne' },
              { value: '2,847', label: 'Avis clients' },
              { value: '98%', label: 'Satisfaction' }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-strong rounded-2xl p-6 text-center border-2 border-transparent hover:border-[#DE6E27]/30 transition-all duration-300"
              >
                <motion.p
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  className="font-['Space_Grotesk'] text-3xl font-bold bg-gradient-to-r from-[#DE6E27] to-[#ff8040] bg-clip-text text-transparent mb-2"
                >
                  {stat.value}
                </motion.p>
                <p className="text-[#505631] font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
