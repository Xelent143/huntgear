import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cartStore";
import { ShoppingBag, Truck, Shield, Loader2, Check, ArrowLeft, CreditCard, Receipt } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// ─── Country list (ISO 3166-1 alpha-2) ───────────────────────────────────────

const COUNTRIES = [
  { code: "US", name: "United States" }, { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" }, { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" }, { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" }, { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" }, { code: "DK", name: "Denmark" },
  { code: "IT", name: "Italy" }, { code: "ES", name: "Spain" },
  { code: "BE", name: "Belgium" }, { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" }, { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" }, { code: "PT", name: "Portugal" },
  { code: "GR", name: "Greece" }, { code: "IE", name: "Ireland" },
  { code: "FI", name: "Finland" }, { code: "HU", name: "Hungary" },
  { code: "RO", name: "Romania" }, { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" }, { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" }, { code: "LT", name: "Lithuania" },
  { code: "LV", name: "Latvia" }, { code: "EE", name: "Estonia" },
  { code: "AE", name: "United Arab Emirates" }, { code: "SA", name: "Saudi Arabia" },
  { code: "QA", name: "Qatar" }, { code: "KW", name: "Kuwait" },
  { code: "BH", name: "Bahrain" }, { code: "OM", name: "Oman" },
  { code: "TR", name: "Turkey" }, { code: "IL", name: "Israel" },
  { code: "JP", name: "Japan" }, { code: "KR", name: "South Korea" },
  { code: "CN", name: "China" }, { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" }, { code: "TH", name: "Thailand" },
  { code: "ID", name: "Indonesia" }, { code: "PH", name: "Philippines" },
  { code: "VN", name: "Vietnam" }, { code: "IN", name: "India" },
  { code: "BD", name: "Bangladesh" }, { code: "PK", name: "Pakistan" },
  { code: "LK", name: "Sri Lanka" }, { code: "NP", name: "Nepal" },
  { code: "NG", name: "Nigeria" }, { code: "ZA", name: "South Africa" },
  { code: "KE", name: "Kenya" }, { code: "GH", name: "Ghana" },
  { code: "EG", name: "Egypt" }, { code: "MA", name: "Morocco" },
  { code: "BR", name: "Brazil" }, { code: "MX", name: "Mexico" },
  { code: "AR", name: "Argentina" }, { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" }, { code: "PE", name: "Peru" },
  { code: "NZ", name: "New Zealand" },
];

// ─── Form schema ──────────────────────────────────────────────────────────────

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Full name is required"),
  customerEmail: z.string().email("Valid email required"),
  customerPhone: z.string().optional(),
  companyName: z.string().optional(),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  countryCode: z.string().length(2, "Please select a country"),
  paymentMethod: z.enum(["stripe", "invoice"]),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

// ─── Order Confirmation ───────────────────────────────────────────────────────

function OrderConfirmation({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20">
      <div className="max-w-lg w-full mx-auto text-center px-4">
        <div className="w-20 h-20 bg-gold/10 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-gold" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-foreground mb-3">Order Received!</h1>
        <p className="text-muted-foreground mb-2">Your order has been successfully placed.</p>
        <div className="bg-secondary rounded-lg p-4 my-6 border border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order Number</p>
          <p className="font-condensed font-bold text-xl text-gold">{orderNumber}</p>
        </div>
        <p className="text-muted-foreground text-sm mb-8">
          Our team will review your order and contact you within <strong className="text-foreground">24 hours</strong> to confirm production details, payment, and shipping timeline.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop">
            <Button className="bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="font-condensed font-semibold uppercase tracking-wider">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Checkout Page ───────────────────────────────────────────────────────

export default function Checkout() {
  const { items, subtotal, sessionId, clearCart } = useCartStore();
  const [, navigate] = useLocation();
  const [selectedCountryCode, setSelectedCountryCode] = useState("US");
  const [confirmedOrder, setConfirmedOrder] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { countryCode: "US", paymentMethod: "invoice" },
  });

  const countryCode = watch("countryCode");
  const paymentMethod = watch("paymentMethod");

  // Shipping calculation
  const { data: shippingData, isLoading: shippingLoading } = trpc.shipping.calculate.useQuery(
    {
      countryCode: countryCode || "US",
      items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
    },
    { enabled: items.length > 0 && !!countryCode }
  );

  const shippingCost = shippingData ? parseFloat(shippingData.cost) : 0;
  const orderTotal = subtotal() + shippingCost;

  const createOrder = trpc.order.create.useMutation({
    onSuccess: (data) => {
      if (data.stripeUrl) {
        window.location.href = data.stripeUrl;
      } else {
        setConfirmedOrder(data.orderNumber);
        clearCart();
      }
    },
    onError: (err) => {
      toast.error("Failed to place order", { description: err.message });
    },
  });

  const onSubmit = (data: CheckoutForm) => {
    const country = COUNTRIES.find(c => c.code === data.countryCode)?.name ?? data.countryCode;
    createOrder.mutate({
      ...data,
      country,
      sessionId,
      items: items.map(i => ({
        productId: i.productId,
        title: i.title,
        qty: i.quantity,
        size: i.selectedSize,
        color: i.selectedColor,
        unitPrice: i.unitPrice,
      })),
      subtotal: subtotal(),
      shippingCost,
      totalAmount: orderTotal,
    });
  };

  // Redirect if cart is empty (and no confirmed order)
  useEffect(() => {
    if (items.length === 0 && !confirmedOrder) {
      // Don't redirect immediately — let the empty state show
    }
  }, [items.length, confirmedOrder]);

  if (confirmedOrder) {
    return <OrderConfirmation orderNumber={confirmedOrder} />;
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-40" />
          <h2 className="font-serif text-2xl text-foreground mb-2">Your cart is empty</h2>
          <Link href="/shop">
            <Button className="mt-4 bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider">
              Browse Catalog
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEOHead
        title="Checkout | Sialkot Sample Masters"
        description="Complete your B2B order for custom streetwear from Sialkot Sample Masters Pakistan."
      />

      <main className="min-h-screen bg-background py-12">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/shop" className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Shop
            </Link>
            <h1 className="font-serif text-3xl font-bold text-foreground">Checkout</h1>
            <p className="text-muted-foreground mt-1">Complete your order details below. Our team will confirm within 24 hours.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* ── Left: Form ── */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Contact info */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-condensed font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gold text-black rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Full Name *</Label>
                      <Input {...register("customerName")} placeholder="John Smith" className="bg-secondary border-border" />
                      {errors.customerName && <p className="text-destructive text-xs mt-1">{errors.customerName.message}</p>}
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Email *</Label>
                      <Input {...register("customerEmail")} type="email" placeholder="john@brand.com" className="bg-secondary border-border" />
                      {errors.customerEmail && <p className="text-destructive text-xs mt-1">{errors.customerEmail.message}</p>}
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Phone</Label>
                      <Input {...register("customerPhone")} placeholder="+1 555 000 0000" className="bg-secondary border-border" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Company Name</Label>
                      <Input {...register("companyName")} placeholder="Your Brand LLC" className="bg-secondary border-border" />
                    </div>
                  </div>
                </div>

                {/* Shipping address */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-condensed font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gold text-black rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Country *</Label>
                      <Select
                        defaultValue="US"
                        onValueChange={(val) => setValue("countryCode", val)}
                      >
                        <SelectTrigger className="bg-secondary border-border">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border max-h-64">
                          {COUNTRIES.map(c => (
                            <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.countryCode && <p className="text-destructive text-xs mt-1">{errors.countryCode.message}</p>}
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Address Line 1 *</Label>
                      <Input {...register("addressLine1")} placeholder="123 Main Street" className="bg-secondary border-border" />
                      {errors.addressLine1 && <p className="text-destructive text-xs mt-1">{errors.addressLine1.message}</p>}
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Address Line 2</Label>
                      <Input {...register("addressLine2")} placeholder="Suite, Floor, etc." className="bg-secondary border-border" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">City *</Label>
                        <Input {...register("city")} placeholder="New York" className="bg-secondary border-border" />
                        {errors.city && <p className="text-destructive text-xs mt-1">{errors.city.message}</p>}
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">State / Region</Label>
                        <Input {...register("state")} placeholder="NY" className="bg-secondary border-border" />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Postal Code</Label>
                        <Input {...register("postalCode")} placeholder="10001" className="bg-secondary border-border" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment note */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-condensed font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gold text-black rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    Payment Method
                  </h2>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(val) => setValue("paymentMethod", val as "stripe" | "invoice")}
                    className="space-y-3"
                  >
                    {/* Stripe Option */}
                    <label htmlFor="pay-stripe" className={`relative border rounded-lg p-4 cursor-pointer transition-colors block ${paymentMethod === 'stripe' ? 'border-gold bg-gold/5' : 'border-border bg-secondary/50 hover:bg-secondary/80'}`}>
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="stripe" id="pay-stripe" className="mt-1" />
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-foreground cursor-pointer flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gold" /> Credit Card / Apple Pay
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">Pay securely right now via Stripe. We accept all major credit cards and digital wallets.</p>
                        </div>
                      </div>
                    </label>

                    {/* Invoice Option */}
                    <label htmlFor="pay-invoice" className={`relative border rounded-lg p-4 cursor-pointer transition-colors block ${paymentMethod === 'invoice' ? 'border-gold bg-gold/5' : 'border-border bg-secondary/50 hover:bg-secondary/80'}`}>
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="invoice" id="pay-invoice" className="mt-1" />
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-foreground cursor-pointer flex items-center gap-2">
                            <Receipt className="w-4 h-4 text-gold" /> Pay Later via Invoice
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">After confirmation, we will send you a proforma invoice. Payment is accepted via Bank Transfer (T/T), PayPal, or Wise.</p>
                        </div>
                      </div>
                    </label>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  disabled={createOrder.isPending}
                  className="w-full bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider py-6 text-base"
                >
                  {createOrder.isPending ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Placing Order...</>
                  ) : (
                    <>Place Order — ${orderTotal.toFixed(2)}</>
                  )}
                </Button>
              </form>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-4">
                <div className="bg-card border border-border rounded-xl p-5">
                  <h2 className="font-condensed font-bold uppercase tracking-wider text-foreground mb-4">Order Summary</h2>

                  {/* Items */}
                  <div className="space-y-3 mb-4">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.mainImage || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&q=70"}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-foreground text-xs font-semibold truncate">{item.title}</p>
                          <p className="text-muted-foreground text-xs">
                            {item.quantity} pcs{item.selectedSize ? ` · ${item.selectedSize}` : ""}
                          </p>
                        </div>
                        <p className="text-foreground text-xs font-condensed font-bold shrink-0">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-border my-4" />

                  {/* Totals */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-condensed font-semibold">${subtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" /> Shipping
                        {shippingData && (
                          <span className="text-xs text-muted-foreground">({shippingData.zoneName})</span>
                        )}
                      </span>
                      <span className="text-foreground font-condensed font-semibold">
                        {shippingLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : shippingData?.freeShipping ? (
                          <span className="text-green-400 font-bold">FREE</span>
                        ) : (
                          `$${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    {shippingData && !shippingData.freeShipping && (
                      <p className="text-xs text-muted-foreground">
                        Est. delivery: {shippingData.estimatedDays.min}–{shippingData.estimatedDays.max} business days
                      </p>
                    )}
                    <Separator className="bg-border" />
                    <div className="flex justify-between text-base">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-condensed font-bold text-xl text-gold">${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Security badges */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <Shield className="w-4 h-4 text-gold" />
                  <span>Secure order. No payment required now.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
