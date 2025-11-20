import { useNavigate } from "react-router-dom";
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
    title: "Bucătării", 
    image: categoryKitchen,
    subcategories: ["Mese bucătărie", "Scaune bucătărie", "Dulapuri bucătărie", "Baruri", "Seturi bucătărie"]
  },
  {
    id: "dormitor-complet",
    title: "Dormitoare Complete",
    image: categoryBedroom, 
    subcategories: ["Seturi dormitor", "Paturi matrimoniale", "Dulapuri XXL", "Comode cu oglindă", "Măsuțe toaletă"]
  }
];

const RoomsSection = () => {
  const navigate = useNavigate();

  // Map category IDs to their corresponding routes
  const categoryRoutes: { [key: string]: string } = {
    "camera-zi": "/camera-de-zi",
    "dormitor": "/dormitor", 
    "bucatarie": "/bucatarie",
    "dormitor-complet": "/dormitor-complet"
  };

  const handleCategoryClick = (categoryId: string) => {
    const route = categoryRoutes[categoryId];
    if (route) {
      navigate(route);
    }
  };

  const handleSubcategoryClick = (subcategory: string) => {
    // For now, just prevent the event from bubbling up
    // In the future, you could implement specific subcategory filtering
    console.log(`Subcategory clicked: ${subcategory}`);
  };

  return (
    <section className="py-16 md:py-20 bg-background" aria-labelledby="rooms-section-heading">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 id="rooms-section-heading" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Camerele
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descoperă mobilierul perfect pentru fiecare cameră din casa ta
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                <img 
                  src={category.image} 
                  alt={`Mobilier pentru ${category.title} - canapele, paturi, mese și scaune de calitate`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  role="img"
                />
                
                <div className="absolute inset-0 bg-overlay-gradient"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 uppercase tracking-wide">
                    {category.title}
                  </h3>
                  <p className="text-sm mb-6 opacity-90">
                    de la 999 lei
                  </p>
                  <button 
                    className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category.id);
                    }}
                    aria-label={`Vezi produsele din categoria ${category.title}`}
                  >
                    Vezi produsele
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;