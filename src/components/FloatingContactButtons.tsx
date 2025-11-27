import { useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingContactButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = "0758433114";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/40${phoneNumber.substring(1)}`, '_blank');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
      {/* Expanded buttons */}
      {isExpanded && (
        <>
          <Button
            onClick={handleCall}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 animate-scale-in"
            aria-label="Sună acum"
          >
            <Phone className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={handleWhatsApp}
            className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1fb855] text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 animate-scale-in"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Main toggle button */}
      <Button
        onClick={toggleExpanded}
        className={`
          ${isExpanded ? 'w-14 h-14 rounded-full bg-[#25D366]' : 'h-14 px-6 rounded-full bg-[#25D366]'}
          hover:bg-[#1fb855] text-white shadow-lg hover:shadow-xl 
          transform hover:scale-105 transition-all duration-300
          flex items-center gap-2 font-semibold
        `}
        aria-label={isExpanded ? "Închide meniu contact" : "Deschide meniu contact"}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <span className="whitespace-nowrap text-sm sm:text-base">Sună sau Whatsapp!</span>
            <Phone className="w-5 h-5 animate-pulse" />
          </>
        )}
      </Button>
    </div>
  );
};

export default FloatingContactButtons;
