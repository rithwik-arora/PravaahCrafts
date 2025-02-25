import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/components/products/featured-products";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-primary">
              Handcrafted with Love
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover unique handmade products that bring beauty and joy to your everyday life
            </p>
            <Link href="/products">
              <Button size="lg" className="mt-8">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <FeaturedProducts />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => (
              <Link key={category} href={`/products?category=${category}`}>
                <a className="group relative aspect-square overflow-hidden rounded-lg">
                  <img 
                    src={getCategoryImage(category)}
                    alt={category}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold capitalize">
                      {category}
                    </h3>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const categories = [
  "scrunchies",
  "candles",
  "accessories",
  "posters",
  "bracelets"
];

function getCategoryImage(category: string): string {
  const images: Record<string, string> = {
    scrunchies: "https://images.unsplash.com/photo-1594205354876-7930d557a78c",
    candles: "https://images.unsplash.com/photo-1599313804818-2eaba0b14cba",
    accessories: "https://images.unsplash.com/photo-1711700357997-7dd71318d2bd",
    posters: "https://images.unsplash.com/photo-1541359927273-d76820fc43f9",
    bracelets: "https://images.unsplash.com/photo-1618865654957-00ea731bebf6"
  };
  return images[category];
}
