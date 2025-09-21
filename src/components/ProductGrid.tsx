import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const products = [
    {
      id: "1",
      name: "Canapea Modernă 3 Locuri",
      price: 2999,
      originalPrice: 3499,
      image: "/placeholder.svg",
      rating: 5,
      reviews: 128,
      isNew: true,
      isOnSale: true
    },
    {
      id: "2", 
      name: "Masă de Dining Extensibilă",
      price: 1899,
      image: "/placeholder.svg",
      rating: 5,
      reviews: 95,
      isNew: true
    },
    {
      id: "3",
      name: "Dulap Dormitor cu Oglinzi", 
      price: 3299,
      originalPrice: 3799,
      image: "/placeholder.svg",
      rating: 4,
      reviews: 67,
      isOnSale: true
    },
    {
      id: "4",
      name: "Set Fotolii Living x2",
      price: 2399,
      image: "/placeholder.svg", 
      rating: 4,
      reviews: 45,
      isNew: true
    },
    {
      id: "5",
      name: "Bibliotecă Modulară",
      price: 1699,
      originalPrice: 1999,
      image: "/placeholder.svg",
      rating: 4,
      reviews: 89,
      isOnSale: true
    },
    {
      id: "6",
      name: "Saltea Memory Foam",
      price: 1299,
      image: "/placeholder.svg",
      rating: 4, 
      reviews: 34
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Mobilier popular
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descoperă cele mai căutate piese de mobilier pentru casa ta
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-tech-gradient text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Vezi toate produsele
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;