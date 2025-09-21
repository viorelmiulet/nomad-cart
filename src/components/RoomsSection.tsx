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
    id: "hol",
    title: "Hol",
    image: "/placeholder.svg", 
    subcategories: ["Cuiere", "Pantofare", "Bănci hol", "Oglinzi", "Covorașe"]
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
    <section className="py-16 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-cream/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-playfair text-foreground">
            Camerele
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
            Descoperă mobilierul perfect pentru fiecare cameră din casa ta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category.title)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-glass-gradient backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-liquid-gradient opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="relative p-6 bg-glass-gradient backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4 font-playfair text-foreground group-hover:text-luxury-gold transition-colors">
                    {category.title}
                  </h3>
                  
                  <ul className="space-y-2">
                    {category.subcategories.map((sub, index) => (
                      <li key={index}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubcategoryClick(sub);
                          }}
                          className="text-sm text-muted-foreground hover:text-luxury-gold transition-colors duration-300 font-inter text-left"
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Glass reflection effect */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;