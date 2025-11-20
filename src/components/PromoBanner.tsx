import { CreditCard, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PromoBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-brand-gold via-amber-500 to-brand-gold py-3 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-dark animate-pulse" />
            <CreditCard className="h-5 w-5 text-brand-dark" />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="text-brand-dark font-bold text-lg sm:text-xl font-playfair">
              Reducere Specială!
            </span>
            <Badge className="bg-brand-dark text-brand-gold border-0 font-bold text-base px-3 py-1 animate-bounce">
              -10%
            </Badge>
            <span className="text-brand-dark font-semibold text-sm sm:text-base font-inter">
              la plata cu cardul bancar
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-dark animate-pulse" />
            <CreditCard className="h-5 w-5 text-brand-dark" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
