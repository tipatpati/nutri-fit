import { FooterBrand } from "@/presentation/components/molecules/Footer/FooterBrand";
import { FooterLinks } from "@/presentation/components/molecules/Footer/FooterLinks";
import { FooterContact } from "@/presentation/components/molecules/Footer/FooterContact";
import { FooterNewsletter } from "@/presentation/components/molecules/Footer/FooterNewsletter";
import { FooterDecorator } from "@/presentation/components/molecules/Footer/FooterDecorator";
import { FooterBottomBar } from "@/presentation/components/molecules/Footer/FooterBottomBar";
import { footerSections } from "@/shared/data/footerData";

const Footer = () => {
  return (
    <footer className="relative bg-md-primary text-md-on-primary mt-16 md:mt-20 lg:mt-32">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12">
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
        </div>
      </div>

      {/* Newsletter - Compact inline */}
      <FooterNewsletter />

      {/* Bottom Footer */}
      <FooterBottomBar />
    </footer>
  );
};

export default Footer;
