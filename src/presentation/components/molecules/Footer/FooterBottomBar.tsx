import { Heart } from "lucide-react";
import { legalLinks, brandInfo } from "@/shared/data/footerData";

export const FooterBottomBar = () => {
  return (
    <div className="border-t border-[#FBF8EF]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-[#FBF8EF]/60 font-['DM_Sans']">
            &copy; {brandInfo.copyright} • Made with <Heart className="w-3 h-3 fill-[#DE6E27] text-[#DE6E27] inline" /> in Oran
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-[#FBF8EF]/60 hover:text-[#DE6E27] transition-colors duration-300 font-['DM_Sans']"
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
