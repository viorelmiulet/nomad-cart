import { CreditCard, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDiscount } from "@/hooks/useDiscount";

const PromoBanner = () => {
  const { discountPercentage, isActive } = useDiscount();

  if (!isActive) return null;
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-brand-gold via-amber-500 to-brand-gold py-3 sm:py-4 md:py-5 px-3 sm:px-4 animate-slideDown">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/30 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-white/20 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-center">
          {/* Hide decorative icons on mobile for cleaner look */}
          <div className="hidden sm:flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-dark animate-pulse" />
            <CreditCard className="h-5 w-5 text-brand-dark" />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Show single icon on mobile */}
              <CreditCard className="h-4 w-4 sm:hidden text-brand-dark" />
              <span className="text-brand-dark font-bold text-base sm:text-lg md:text-xl font-playfair">
                Reducere Specială!
              </span>
              <Badge className="bg-brand-dark text-brand-gold border-0 font-bold text-sm sm:text-base px-2 sm:px-3 py-0.5 sm:py-1 animate-bounce">
                -{discountPercentage}%
              </Badge>
            </div>
            <span className="text-brand-dark font-semibold text-xs sm:text-sm md:text-base font-inter leading-tight">
              la plata cu cardul bancar
            </span>
          </div>
          
          {/* Hide decorative icons on mobile */}
          <div className="hidden sm:flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-dark animate-pulse" />
            <CreditCard className="h-5 w-5 text-brand-dark" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
