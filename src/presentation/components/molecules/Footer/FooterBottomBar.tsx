import { Heart } from "lucide-react";
import { legalLinks, brandInfo } from "@/shared/data/footerData";

export const FooterBottomBar = () => {
  return (
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-md-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-md-2 text-center md:text-left">
          <p className="md-body-small text-white/60">
            &copy; {brandInfo.copyright} • Made with <Heart className="w-3 h-3 fill-md-secondary text-md-secondary inline" /> in Oran
          </p>

          <div className="flex flex-wrap justify-center gap-md-4">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="md-body-small text-white/60 hover:text-white transition-colors duration-md-medium2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
