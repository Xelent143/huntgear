import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md bg-[#111111] border-white/10 flex flex-col">
        <SheetHeader className="pb-4 border-b border-white/10">
          <SheetTitle className="font-serif text-xl text-foreground flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ff6b00]" />
            Your Cart
            {items.length > 0 && (
              <span className="ml-auto bg-[#ff6b00] text-black text-xs font-condensed font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} pcs
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="w-16 h-16 text-white/70 opacity-30 mb-4" />
            <p className="text-white/70 font-serif text-lg mb-2">Your cart is empty</p>
            <p className="text-white/70 text-sm mb-6">Browse our catalog to add products</p>
            <Link href="/shop" onClick={closeCart}>
              <Button className="bg-[#ff6b00] text-black hover:bg-[#ff6b00]-light font-condensed font-bold uppercase tracking-wider">
                Browse Catalog
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 p-3 bg-secondary/50 rounded-lg border border-white/10">
                  <img
                    src={item.mainImage || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=70"}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm font-semibold truncate">{item.title}</p>
                    <div className="flex gap-2 text-xs text-white/70 mt-0.5">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>
                    <p className="text-[#ff6b00] font-condensed font-bold text-sm mt-1">
                      ${item.unitPrice.toFixed(2)}/pc
                    </p>
                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded border border-white/10 flex items-center justify-center hover:border-[#ff6b00] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-condensed font-bold text-sm w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded border border-white/10 flex items-center justify-center hover:border-[#ff6b00] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <span className="text-xs text-white/70 ml-1">
                        = ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-white/70 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary + CTA */}
            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">Subtotal</span>
                <span className="font-condensed font-bold text-foreground text-lg">${subtotal().toFixed(2)}</span>
              </div>
              <p className="text-xs text-white/70">Shipping calculated at checkout based on your country</p>
              <Link href="/checkout" onClick={closeCart}>
                <Button className="w-full bg-[#ff6b00] text-black hover:bg-[#ff6b00]-light font-condensed font-bold uppercase tracking-wider py-5 text-base">
                  Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/shop" onClick={closeCart}>
                <Button variant="outline" className="w-full font-condensed font-semibold uppercase tracking-wider">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
