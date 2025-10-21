import { motion } from "framer-motion";
import { Heart, Facebook, Instagram, Twitter } from "lucide-react";
import { legalLinks, brandInfo } from "@/shared/data/footerData";

const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "#" },
  { name: "Instagram", icon: Instagram, url: "#" },
  { name: "Twitter", icon: Twitter, url: "#" },
];

export const FooterBottomBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative border-t border-[#FBF8EF]/10 bg-[#1a1f0a]/80 backdrop-blur-xl py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          whileHover={{ scale: 1.05 }}
          className="text-[#FBF8EF]/60 text-sm"
        >
          &copy; {brandInfo.copyright} • Made with <Heart className="w-3 h-3 fill-[#DE6E27] text-[#DE6E27] inline" /> in Oran
        </motion.p>
        <div className="flex items-center gap-6">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.2, y: -3 }}
              className="glass-dark w-10 h-10 rounded-full flex items-center justify-center text-[#FBF8EF] hover:text-[#DE6E27] transition-colors border border-[#FBF8EF]/20"
            >
              <link.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
