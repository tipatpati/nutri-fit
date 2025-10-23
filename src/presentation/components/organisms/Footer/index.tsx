import { motion } from "framer-motion";
import { FooterBrand } from "@/presentation/components/molecules/Footer/FooterBrand";
import { FooterLinks } from "@/presentation/components/molecules/Footer/FooterLinks";
import { FooterContact } from "@/presentation/components/molecules/Footer/FooterContact";
import { FooterNewsletter } from "@/presentation/components/molecules/Footer/FooterNewsletter";
import { FooterDecorator } from "@/presentation/components/molecules/Footer/FooterDecorator";
import { FooterBottomBar } from "@/presentation/components/molecules/Footer/FooterBottomBar";
import { footerSections } from "@/shared/data/footerData";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#2B3210] via-[#1a1f0a] to-[#2B3210] text-[#FBF8EF] mt-16 md:mt-20 lg:mt-32 overflow-hidden safe-area-bottom">
      {/* Top Border with Gradient */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#DE6E27] to-transparent" />
      
      {/* Animated Background */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DE6E27] rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.02, 0.06, 0.02]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FBF8EF] rounded-full blur-3xl"
      />
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12"
        >
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <FooterBrand />
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <FooterLinks key={index} section={section} />
          ))}

          {/* Contact Section */}
          <FooterContact />
        </motion.div>
      </div>

      {/* Newsletter - Compact inline */}
      <FooterNewsletter />

      {/* Bottom Footer */}
      <FooterBottomBar />
    </footer>
  );
};

export default Footer;
