import { toast } from "@/hooks/use-toast";

const benefits = [
  {
    title: "Livrare gratuită",
    description: "Pentru comenzi peste 500 Lei",
    icon: "🚚"
  },
  {
    title: "Fără plată în avans",
    description: "Plata la livrare",
    icon: "💰"
  },
  {
    title: "365 de zile garanție",
    description: "De returnare a banilor",
    icon: "🛡️"
  },
  {
    title: "1 comandă = 1 copac",
    description: "Protejăm mediul împreună",
    icon: "🌱"
  }
];

const BenefitsBar = () => {
  const handleBenefitClick = (benefit: string) => {
    toast({
      title: `Beneficiu: ${benefit}`,
      description: "Află mai multe despre acest avantaj",
    });
  };

  return (
    <div className="bg-glass-gradient backdrop-blur-xl border-b border-white/10 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
          {benefits.map((benefit, index) => (
            <button
              key={index}
              onClick={() => handleBenefitClick(benefit.title)}
              className="flex items-center gap-3 text-white hover:text-luxury-gold transition-colors duration-300 group min-w-fit"
            >
              <span className="text-xl group-hover:scale-110 transition-transform flex-shrink-0">{benefit.icon}</span>
              <div className="text-left">
                <div className="font-semibold text-white">{benefit.title}</div>
                <div className="text-xs text-white/70">{benefit.description}</div>
              </div>
            </button>
          ))}
          <div className="flex items-center gap-3 text-white min-w-fit">
            <span className="text-xl flex-shrink-0">📞</span>
            <span className="font-semibold">0312 295 893</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsBar;