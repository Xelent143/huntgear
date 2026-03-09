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
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Payment Successful!</h1>
                    <p className="text-muted-foreground mb-6">
                        Thank you for your order. Your payment has been processed successfully.
                    </p>
                    <div className="bg-card border border-border rounded-lg p-6 mb-8">
                        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Order Number</p>
                        <p className="font-condensed font-bold text-2xl text-gold">{orderNumber}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/shop">
                            <Button className="w-full bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider">
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
