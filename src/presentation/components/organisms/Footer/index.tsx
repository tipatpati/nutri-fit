import { FooterBrand } from "@/presentation/components/molecules/Footer/FooterBrand";
import { FooterLinks } from "@/presentation/components/molecules/Footer/FooterLinks";
import { FooterContact } from "@/presentation/components/molecules/Footer/FooterContact";
import { FooterNewsletter } from "@/presentation/components/molecules/Footer/FooterNewsletter";
import { FooterDecorator } from "@/presentation/components/molecules/Footer/FooterDecorator";
import { FooterBottomBar } from "@/presentation/components/molecules/Footer/FooterBottomBar";
import { footerSections } from "@/shared/data/footerData";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-md-surface-container-low to-md-surface-container text-md-on-surface">
      {/* Decorative Wave Header */}
      <FooterDecorator />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-md-12 lg:py-md-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-md-10 lg:gap-md-12">
          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-1">
            <FooterBrand />
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <FooterLinks key={index} section={section} />
          ))}

          {/* Contact Section */}
          <FooterContact />
        </div>
      </div>

      {/* Newsletter Section - Prominent */}
      <FooterNewsletter />

      {/* Bottom Footer */}
      <FooterBottomBar />
    </footer>
  );
};

export default Footer;
