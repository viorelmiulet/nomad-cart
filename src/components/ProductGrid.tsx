import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const products = [
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      price: 6999,
      originalPrice: 7499,
      image: "/placeholder.svg",
      rating: 5,
      reviews: 128,
      isNew: true,
      isOnSale: true
    },
    {
      id: "2", 
      name: "Samsung Galaxy S24 Ultra",
      price: 6299,
      image: "/placeholder.svg",
      rating: 5,
      reviews: 95,
      isNew: true
    },
    {
      id: "3",
      name: "Google Pixel 8 Pro", 
      price: 4499,
      originalPrice: 4999,
      image: "/placeholder.svg",
      rating: 4,
      reviews: 67,
      isOnSale: true
    },
    {
      id: "4",
      name: "OnePlus 12",
      price: 3999,
      image: "/placeholder.svg", 
      rating: 4,
      reviews: 45,
      isNew: true
    },
    {
      id: "5",
      name: "Xiaomi 14 Ultra",
      price: 3599,
      originalPrice: 3999,
      image: "/placeholder.svg",
      rating: 4,
      reviews: 89,
      isOnSale: true
    },
    {
      id: "6",
      name: "Nothing Phone 2",
      price: 2899,
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
            Telefoane populare
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descoperă cele mai căutate modele de smartphone-uri cu specificații premium
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