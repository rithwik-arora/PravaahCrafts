import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Minus, Plus, X } from "lucide-react";

export default function CartSummary() {
  const { state, dispatch } = useCart();

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity: newQuantity } });
    }
  };

  if (state.items.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Your cart is empty</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <ul className="space-y-4">
          {state.items.map(({ product, quantity }) => (
            <li key={product.id} className="flex items-center gap-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-16 w-16 rounded object-cover"
              />

              <div className="flex-grow">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${parseFloat(product.price.toString())}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={() => dispatch({ 
                    type: 'REMOVE_ITEM', 
                    payload: { productId: product.id } 
                  })}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-6">
        <div>
          <p className="text-lg font-medium">Total</p>
          <p className="text-sm text-muted-foreground">
            ${state.total.toFixed(2)}
          </p>
        </div>
        <Button>Proceed to Checkout</Button>
      </CardFooter>
    </Card>
  );
}
