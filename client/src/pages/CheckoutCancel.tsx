import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { Link } from "wouter";

export default function CheckoutCancel() {
    return (
        <>
            <SEOHead title="Payment Cancelled | Sialkot Sample Masters" description="Your payment was cancelled." />
            <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-destructive/10 border-2 border-destructive rounded-full flex flex-col items-center justify-center mx-auto mb-6">
                        <XCircle className="w-10 h-10 text-destructive" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Payment Cancelled</h1>
                    <p className="text-white/70 mb-8">
                        Your payment was cancelled and your order has not been placed. Your cart items are still saved if you wish to try again.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/checkout">
                            <Button className="w-full bg-[#ff6b00] text-black hover:bg-[#ff6b00]-light font-condensed font-bold uppercase tracking-wider">
                                Return to Checkout
                            </Button>
                        </Link>
                        <Link href="/shop">
                            <Button variant="outline" className="w-full font-condensed font-semibold uppercase tracking-wider">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
