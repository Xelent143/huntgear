import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link, useSearch } from "wouter";

export default function CheckoutSuccess() {
    const searchString = useSearch();
    const params = new URLSearchParams(searchString);
    const orderNumber = params.get("order_number") || "UNKNOWN";

    return (
        <>
            <SEOHead title="Payment Successful | Sialkot Sample Masters" description="Your payment was successful." />
            <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Payment Successful!</h1>
                    <p className="text-white/70 mb-6">
                        Thank you for your order. Your payment has been processed successfully.
                    </p>
                    <div className="bg-[#111111] border border-white/10 rounded-lg p-6 mb-8">
                        <p className="text-sm text-white/70 uppercase tracking-wider mb-2">Order Number</p>
                        <p className="font-condensed font-bold text-2xl text-[#ff6b00]">{orderNumber}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/shop">
                            <Button className="w-full bg-[#ff6b00] text-black hover:bg-[#ff6b00]-light font-condensed font-bold uppercase tracking-wider">
                                Continue Shopping
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="w-full font-condensed font-semibold uppercase tracking-wider">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
