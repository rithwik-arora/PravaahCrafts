import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { type Product } from "@shared/schema";
import ProductCard from "@/components/products/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Products() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const category = searchParams.get("category");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: category 
      ? [`/api/products/category/${category}`]
      : ["/api/products"]
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : "All Products"}
      </h1>

      {/* Category filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-4">
        <Button
          variant={!category ? "default" : "outline"}
          asChild
        >
          <a href="/products">All</a>
        </Button>
        {["scrunchies", "candles", "accessories", "posters", "bracelets"].map(cat => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            asChild
          >
            <a href={`/products?category=${cat}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </a>
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}