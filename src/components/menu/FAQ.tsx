import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const faqData = [
  {
    id: 1,
    category: "Repas",
    question: "Offrez-vous des options végétariennes?",
    answer: "Oui! Nous proposons une large sélection de repas végétariens et véganes. Vous pouvez filtrer les repas par catégorie alimentaire dans notre menu pour voir toutes les options disponibles."
  },
  {
    id: 2,
    category: "Repas",
    question: "Est-ce que vos repas sont sans gluten?",
    answer: "Nous proposons plusieurs options sans gluten. Chaque repas est clairement étiqueté avec ses allergènes. Utilisez le filtre 'Sans gluten' dans le menu pour voir tous les repas adaptés."
  },
  {
    id: 3,
    category: "Livraison",
    question: "Quels sont les délais de livraison?",
    answer: "Nous livrons du lundi au samedi entre 10h et 18h. Vous pouvez choisir votre créneau de livraison lors de la commande. La livraison est gratuite pour toutes les commandes."
  },
  {
    id: 4,
    category: "Livraison",
    question: "Livrez-vous dans toute la région?",
    answer: "Nous livrons actuellement dans toute la région d'Oran et ses environs. Vérifiez votre code postal lors du paiement pour confirmer la disponibilité."
  },
  {
    id: 5,
    category: "Commande",
    question: "Comment modifier ma commande?",
    answer: "Vous pouvez modifier votre commande jusqu'à 24h avant la livraison en vous connectant à votre compte ou en contactant notre service client."
  },
  {
    id: 6,
    category: "Commande",
    question: "Puis-je annuler ma commande?",
    answer: "Oui, vous pouvez annuler sans frais jusqu'à 48h avant la livraison prévue. Les annulations tardives peuvent entraîner des frais."
  },
  {
    id: 7,
    category: "Nutrition",
    question: "Comment sont calculées les valeurs nutritionnelles?",
    answer: "Toutes nos valeurs nutritionnelles sont calculées avec précision par nos nutritionnistes et ajustées selon votre objectif (prise de masse, minceur, équilibré)."
  },
  {
    id: 8,
    category: "Nutrition",
    question: "Puis-je personnaliser les portions?",
    answer: "Les portions sont automatiquement ajustées selon votre objectif nutritionnel. Pour des besoins spécifiques, contactez notre équipe pour une solution personnalisée."
  }
];

const categories = ["Tous", "Repas", "Livraison", "Commande", "Nutrition"];

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
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
            <MessageCircle className="w-5 h-5 text-[#DE6E27]" />
            <span className="font-bold text-[#2B3210]">FAQ</span>
          </motion.div>
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3210] mb-4">
            Questions fréquentes
          </h2>
          <p className="text-xl text-[#505631]">
            Trouvez rapidement les réponses à vos questions
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#505631]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une question..."
              className="glass-strong border-2 border-[#E5E2D9] pl-12 pr-10 py-6 text-lg rounded-xl focus:border-[#DE6E27] transition-all duration-300"
            />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 glass rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {categories.map((category, idx) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white shadow-lg'
                  : 'glass border-2 border-[#E5E2D9] text-[#2B3210] hover:border-[#DE6E27]'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <div className="glass-strong rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#DE6E27]/30 transition-all duration-300 shadow-lg">
                <motion.button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full p-6 flex items-center justify-between text-left group"
                  whileHover={{ backgroundColor: 'rgba(222, 110, 39, 0.05)' }}
                >
                  <span className="font-['Space_Grotesk'] text-lg md:text-xl font-bold text-[#2B3210] pr-4 group-hover:text-[#DE6E27] transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-[#DE6E27]" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <p className="text-[#505631] leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-[#E5E2D9] rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-[#505631]" />
            </div>
            <p className="text-xl text-[#505631] mb-4">Aucune question trouvée</p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Tous");
              }}
              variant="outlined"
              className="border-2 border-[#DE6E27] text-[#DE6E27]"
            >
              Réinitialiser les filtres
            </Button>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center glass-strong rounded-2xl p-8 border-2 border-[#DE6E27]/20"
        >
          <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210] mb-4">
            Vous ne trouvez pas votre réponse?
          </h3>
          <p className="text-[#505631] mb-6">
            Notre équipe est là pour vous aider
          </p>
          <Button className="bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white px-8 py-6 text-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            Contacter le support
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
