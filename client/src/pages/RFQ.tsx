import { useState } from "react";
import { CheckCircle, ArrowRight, Package, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEOHead from "@/components/SEOHead";
import { FadeIn, StaggerChildren, AnimatedChild, HoverCard, PageWrapper, SectionHeading } from "@/components/animations";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const productTypes = [
  "Hunting Wear",
  "Sports Wear",
  "Ski Wear",
  "Tech Wear",
  "Streetwear",
  "Martial Arts Wear",
  "Mixed / Multiple Categories",
  "Other (specify in notes)",
];

const quantities = [
  "50–100 pieces",
  "100–300 pieces",
  "300–500 pieces",
  "500–1,000 pieces",
  "1,000–5,000 pieces",
  "5,000–10,000 pieces",
  "10,000+ pieces",
];

const timelines = [
  "ASAP (Rush Order)",
  "2–4 weeks",
  "4–6 weeks",
  "6–8 weeks",
  "8–12 weeks",
  "Flexible / No Rush",
];

const services = [
  "Custom Manufacturing",
  "Private Label",
  "Design Consultation",
  "Sample Development",
  "Bulk Production",
];

const benefits = [
  { icon: Clock, text: "Response within 24 hours" },
  { icon: Package, text: "Free sample assessment" },
  { icon: Shield, text: "NDA protected — your designs are safe" },
  { icon: CheckCircle, text: "No obligation quote" },
];

export default function RFQ() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    website: "",
    productType: "",
    quantity: "",
    timeline: "",
    serviceType: "",
    fabricPreference: "",
    customizationType: "",
    budgetRange: "",
    description: "",
    howHeard: "",
  });

  const submitRFQ = trpc.rfq.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Your quote request has been submitted! We'll respond within 24 hours.");
    },
    onError: (err) => {
      toast.error("Failed to submit. Please try again or contact us directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.email || !form.productType || !form.quantity) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitRFQ.mutate(form);
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  if (submitted) {
    return (
      <>
        <SEOHead title="Quote Request Submitted | Sialkot Sample Masters" canonical="/rfq" />
        <div className="min-h-screen flex items-center justify-center pt-20 px-4">
          <div className="max-w-lg text-center">
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-gold" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Quote Request Received!</h1>
            <p className="text-muted-foreground mb-4">
              Thank you for reaching out to Sialkot Sample Masters. Our B2B specialist will review your requirements and respond within <strong className="text-foreground">24 business hours</strong>.
            </p>
            <p className="text-muted-foreground text-sm mb-8">
              Check your email for a confirmation. In the meantime, feel free to explore our portfolio and services.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/portfolio">
                <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/5 font-condensed font-semibold tracking-widest uppercase text-sm px-6 py-3 h-auto rounded-sm bg-transparent">
                  View Portfolio
                </Button>
              </a>
              <a href="https://wa.me/923022922242" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-sm px-6 py-3 h-auto rounded-sm">
                  WhatsApp Us Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <PageWrapper>
      <SEOHead
        title="Request a Free Quote | Custom Apparel Manufacturing Pakistan"
        description="Request a free, no-obligation quote from Sialkot Sample Masters — Pakistan's leading custom apparel manufacturer. Hunting Wear, Sports Wear, Ski Wear, Tech Wear, Streetwear & Martial Arts. Detailed proposal within 24 hours."
        keywords="custom apparel quote Pakistan, hunting wear manufacturer quote, ski wear manufacturer Pakistan, sports wear quote Sialkot, B2B apparel quote Pakistan, martial arts wear manufacturer quote"
        canonical="/rfq"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-sm mb-3">Get Started</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-foreground mb-6">
            Request a
            <span className="text-gradient-gold italic"> Free Quote</span>
          </h1>
          <div className="gold-divider mx-auto" />
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-6">
            Fill out the form below and receive a detailed manufacturing proposal within 24 hours. No obligation, completely free.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Info */}
                <div className="bg-card border border-border rounded-sm p-6">
                  <h2 className="font-condensed font-bold text-foreground uppercase tracking-widest text-sm mb-5 pb-3 border-b border-border">
                    Company Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Company Name <span className="text-gold">*</span></Label>
                      <Input
                        value={form.companyName}
                        onChange={(e) => update("companyName", e.target.value)}
                        placeholder="Your brand or company name"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Contact Name <span className="text-gold">*</span></Label>
                      <Input
                        value={form.contactName}
                        onChange={(e) => update("contactName", e.target.value)}
                        placeholder="Your full name"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Email Address <span className="text-gold">*</span></Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="your@email.com"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Phone / WhatsApp</Label>
                      <Input
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+1 234 567 8900"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Country</Label>
                      <Input
                        value={form.country}
                        onChange={(e) => update("country", e.target.value)}
                        placeholder="United States"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Website / Instagram</Label>
                      <Input
                        value={form.website}
                        onChange={(e) => update("website", e.target.value)}
                        placeholder="https://yourbrand.com"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="bg-card border border-border rounded-sm p-6">
                  <h2 className="font-condensed font-bold text-foreground uppercase tracking-widest text-sm mb-5 pb-3 border-b border-border">
                    Order Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Product Type <span className="text-gold">*</span></Label>
                      <Select onValueChange={(v) => update("productType", v)}>
                        <SelectTrigger className="bg-background border-border text-foreground focus:border-gold">
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {productTypes.map((p) => (
                            <SelectItem key={p} value={p} className="text-foreground hover:bg-secondary">{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Order Quantity <span className="text-gold">*</span></Label>
                      <Select onValueChange={(v) => update("quantity", v)}>
                        <SelectTrigger className="bg-background border-border text-foreground focus:border-gold">
                          <SelectValue placeholder="Select quantity range" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {quantities.map((q) => (
                            <SelectItem key={q} value={q} className="text-foreground hover:bg-secondary">{q}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Required Timeline</Label>
                      <Select onValueChange={(v) => update("timeline", v)}>
                        <SelectTrigger className="bg-background border-border text-foreground focus:border-gold">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {timelines.map((t) => (
                            <SelectItem key={t} value={t} className="text-foreground hover:bg-secondary">{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Service Required</Label>
                      <Select onValueChange={(v) => update("serviceType", v)}>
                        <SelectTrigger className="bg-background border-border text-foreground focus:border-gold">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {services.map((s) => (
                            <SelectItem key={s} value={s} className="text-foreground hover:bg-secondary">{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Fabric Preference</Label>
                      <Input
                        value={form.fabricPreference}
                        onChange={(e) => update("fabricPreference", e.target.value)}
                        placeholder="e.g., 400 GSM French Terry, 100% Cotton"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Customization Type</Label>
                      <Input
                        value={form.customizationType}
                        onChange={(e) => update("customizationType", e.target.value)}
                        placeholder="e.g., Embroidery, Screen Print, DTG"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-card border border-border rounded-sm p-6">
                  <h2 className="font-condensed font-bold text-foreground uppercase tracking-widest text-sm mb-5 pb-3 border-b border-border">
                    Additional Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Project Description</Label>
                      <Textarea
                        value={form.description}
                        onChange={(e) => update("description", e.target.value)}
                        placeholder="Describe your project, design requirements, special features, or any other relevant details..."
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold min-h-[120px]"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Budget Range (USD)</Label>
                      <Input
                        value={form.budgetRange}
                        onChange={(e) => update("budgetRange", e.target.value)}
                        placeholder="e.g., $5,000 – $10,000"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">How did you hear about us?</Label>
                      <Input
                        value={form.howHeard}
                        onChange={(e) => update("howHeard", e.target.value)}
                        placeholder="Google, Instagram, referral, etc."
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitRFQ.isPending}
                  className="w-full bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-sm py-4 h-auto rounded-sm"
                >
                  {submitRFQ.isPending ? "Submitting..." : "Submit Quote Request"}
                  {!submitRFQ.isPending && <ArrowRight className="ml-2 w-4 h-4" />}
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-card border border-border rounded-sm p-6">
                <h3 className="font-condensed font-bold text-foreground uppercase tracking-widest text-xs mb-4">
                  What Happens Next?
                </h3>
                <div className="space-y-4">
                  {benefits.map((b) => (
                    <div key={b.text} className="flex items-start gap-3">
                      <b.icon className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-sm p-6">
                <h3 className="font-condensed font-bold text-foreground uppercase tracking-widest text-xs mb-4">
                  Prefer to Chat?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Reach us directly on WhatsApp for faster responses.
                </p>
                <a
                  href="https://wa.me/923022922242?text=Hello%20Sialkot%20Sample%20Masters!%20I%20need%20a%20quote%20for%20custom%20streetwear."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white font-condensed font-bold tracking-widest uppercase text-xs px-4 py-3 rounded-sm hover:bg-[#1ea855] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

              <div className="bg-card border border-border rounded-sm p-6">
                <h3 className="font-condensed font-bold text-foreground uppercase tracking-widest text-xs mb-4">
                  Our Capabilities
                </h3>
                <ul className="space-y-2">
                  {[
                    "MOQ from 50 pieces",
                    "Sample in 7–10 days",
                    "Bulk delivery in 25–35 days",
                    "50,000+ units/month capacity",
                    "ISO 9001 certified",
                    "Worldwide shipping",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="text-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
