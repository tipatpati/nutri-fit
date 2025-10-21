import { Star } from "lucide-react";
import { testimonial, stats } from "@/shared/data/features";
import { TestimonialCard } from "@/presentation/components/molecules/Features/TestimonialCard";
import { motion } from "framer-motion";

export const TestimonialSection = () => {
  return (
    <div className="relative py-24 glass-dark rounded-3xl p-8 md:p-12 lg:p-16 text-white overflow-hidden mt-12 md:mt-16 border-2 border-[#DE6E27]/20 shadow-2xl">
      {/* Subtle Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' /%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-primary to-orange-light rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-light to-orange-primary rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-cream text-center mb-16">
            Ce que nos clients disent de nous
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <TestimonialCard testimonial={testimonial} />
          </motion.div>
          
          <div className="text-center space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="glass-dark rounded-3xl p-8 md:p-10 border-2 border-[#DE6E27]/30 shadow-2xl relative overflow-hidden"
            >
              {/* Shine effect */}
              <motion.div
                animate={{ 
                  x: ['-100%', '200%'],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
              />
              
              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl font-bold bg-gradient-to-r from-[#DE6E27] to-[#ff8040] bg-clip-text text-transparent mb-4"
                >
                  {stats.overall.rating}/5
                </motion.div>
                <div className="flex justify-center text-orange-primary text-2xl mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-7 h-7 fill-current" />
                  ))}
                </div>
                <p className="text-2xl font-bold mb-2 text-cream">Excellent</p>
                <p className="text-cream/70 text-base">
                  Basé sur {stats.overall.reviews} avis clients vérifiés
                </p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
              {stats.metrics.map((metric, index) => {
                const colors = ['text-orange-primary', 'text-orange-light', 'text-cream'];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="glass-dark rounded-xl p-4 md:p-5 cursor-pointer"
                  >
                    <div className={`text-3xl font-bold ${colors[index]} mb-2`}>
                      {metric.value}
                    </div>
                    <div className="text-cream/70 text-sm">
                      {metric.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
