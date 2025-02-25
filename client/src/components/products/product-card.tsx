import { type Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { product } });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  return (
    <Link href={`/products/${product.id}`} className="block">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="aspect-square relative">
          <img 
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-muted-foreground mt-2">{product.description}</p>
          <p className="text-lg font-medium mt-2">${product.price}</p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart();
            }} 
            className="w-full"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}