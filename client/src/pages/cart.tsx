
import CartSummary from "@/components/cart/cart-summary";

export default function Cart() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <CartSummary />
    </div>
  );
}
