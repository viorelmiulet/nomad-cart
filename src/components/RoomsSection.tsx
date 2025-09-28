import { toast } from "@/hooks/use-toast";
import categoryLiving from "@/assets/category-living.jpg";
import categoryBedroom from "@/assets/category-bedroom.jpg";
import categoryKitchen from "@/assets/category-kitchen.jpg";

const categories = [
  {
    id: "camera-zi",
    title: "Camera de zi",
    image: categoryLiving,
    subcategories: ["Seturi camera de zi", "Canapele pe colț", "Canapele", "Fotolii", "Mese de cafea"]
  },
  {
    id: "dormitor", 
    title: "Dormitor",
    image: categoryBedroom,
    subcategories: ["Paturi", "Dulapuri", "Comode", "Noptiere", "Seturi dormitor"]
  },
  {
    id: "bucatarie",
    title: "Bucătărie", 
    image: categoryKitchen,
    subcategories: ["Mese bucătărie", "Scaune bucătărie", "Dulapuri bucătărie", "Baruri", "Seturi bucătărie"]
  },
  {
    id: "dormitor-complet",
    title: "Dormitor Complet",
    image: categoryBedroom, 
    subcategories: ["Seturi dormitor", "Paturi matrimoniale", "Dulapuri XXL", "Comode cu oglindă", "Măsuțe toaletă"]
  },
  {
    id: "birou",
    title: "Birou de acasă",
    image: "/placeholder.svg",
    subcategories: ["Birouri", "Scaune birou", "Biblioteci", "Dulapuri birou", "Accesorii birou"]
  },
  {
    id: "baie",
    title: "Baie", 
    image: "/placeholder.svg",
    subcategories: ["Mobilier baie", "Oglinzi baie", "Dulapuri baie", "Rafturi baie", "Accesorii"]
  }
];

const RoomsSection = () => {
  const handleCategoryClick = (category: string) => {
    toast({
      title: `Categorie ${category}`,
      description: `Explorează mobilierul pentru ${category}`,
    });
  };

  const handleSubcategoryClick = (subcategory: string) => {
    toast({
      title: `Subcategorie ${subcategory}`,
      description: `Vizualizează produsele din categoria ${subcategory}`,
    });
  };

  return (
    <section className="py-12 md:py-16 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-navy/70 to-brand-dark/95"></div>
      <div className="absolute inset-0 bg-liquid-gradient opacity-30 animate-liquid-flow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 font-playfair text-brand-cream">
            Camerele
          </h2>
          <p className="text-base md:text-lg text-brand-cream/90 max-w-2xl mx-auto font-inter px-4">
            Descoperă mobilierul perfect pentru fiecare cameră din casa ta
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category.title)}
            >
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-glass-gradient backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 touch-manipulation">
                <div className="absolute inset-0 bg-liquid-gradient opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="relative h-36 md:h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="relative p-4 md:p-6 bg-glass-gradient backdrop-blur-sm">
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 font-playfair text-brand-cream group-hover:text-brand-gold transition-colors">
                    {category.title}
                  </h3>
                  
                  <ul className="space-y-1.5 md:space-y-2">
                    {category.subcategories.map((sub, index) => (
                      <li key={index}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubcategoryClick(sub);
                          }}
                          className="text-sm text-brand-cream/70 hover:text-brand-gold transition-colors duration-300 font-inter text-left touch-manipulation py-1"
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Glass reflection effect */}
                <div className="absolute top-2 left-2 md:top-4 md:left-4 w-8 h-8 md:w-16 md:h-16 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;