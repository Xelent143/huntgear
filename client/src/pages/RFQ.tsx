import { useState } from "react";
import { CheckCircle, ArrowRight, Package, Clock, Shield, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEOHead from "@/components/SEOHead";
import { FadeIn, PageWrapper } from "@/components/animations";
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
      <PageWrapper>
        <SEOHead title="Quote Request Submitted | Sialkot Sample Masters" canonical="/rfq" />
        <main className="min-h-screen bg-black flex items-center justify-center pt-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
          <div className="max-w-xl text-center relative z-10">
            <FadeIn direction="down">
              <div className="w-24 h-24 bg-[#050505] border border-gold/30 flex items-center justify-center mx-auto mb-10 relative group">
                <div className="absolute inset-0 bg-gold/5 blur-xl group-hover:bg-gold/10 transition-colors" />
                <CheckCircle className="w-10 h-10 text-gold relative z-10 opacity-80" />
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">Transmission Secured</h1>
              <p className="text-white/50 font-light text-lg mb-4 leading-relaxed">
                Your manufacturing requirements have been successfully logged. Our executive coordination team will review the dossier and respond within <strong className="text-gold font-normal">24 business hours</strong>.
              </p>
              <div className="w-16 h-px bg-gold/30 mx-auto my-10" />
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/portfolio">
                  <Button className="relative overflow-hidden bg-transparent border border-white/20 text-white hover:border-gold hover:text-gold transition-colors duration-500 font-condensed font-bold tracking-[0.2em] uppercase text-[10px] px-10 py-6 h-auto rounded-none group">
                    <span className="relative z-10 flex items-center gap-2">
                      Review Portfolio <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <a href="https://wa.me/923022922242" target="_blank" rel="noopener noreferrer">
                  <Button className="relative overflow-hidden bg-gold text-black hover:text-white transition-colors duration-500 font-condensed font-bold tracking-[0.2em] uppercase text-[10px] px-10 py-6 h-auto rounded-none group shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)]">
                    <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <span className="relative z-10">Direct Priority Line</span>
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </main>
      </PageWrapper>
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

      {/* ── Elite Hero ── */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-black border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn direction="down" delay={0.1}>
            <div className="inline-flex items-center justify-center gap-3 mb-8">
              <span className="w-8 h-px bg-gold" />
              <p className="text-gold font-condensed font-bold tracking-[0.3em] uppercase text-xs">
                Acquisitions & Proposals
              </p>
              <span className="w-8 h-px bg-gold" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Secure a Custom
              <br />
              <span className="text-gradient-gold italic font-light">Manufacturing <span className="font-serif not-italic">Proposal</span></span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-white/60 font-light text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
              Initiate your project with Sialkot’s masters of precision. Submit your technical requirements below for a comprehensive industrial assessment within 24 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* RFQ Form */}
            <div className="lg:col-span-2">
              <FadeIn direction="right" delay={0.4}>
                <form onSubmit={handleSubmit} className="space-y-16">
                  {/* Company Info */}
                  <div className="relative group">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-8 h-px bg-gold/50" />
                      <h2 className="font-condensed font-bold text-white uppercase tracking-[0.3em] text-[10px]">
                        Project Identification
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Company Name <span className="text-gold">*</span></Label>
                        <Input
                          value={form.companyName}
                          onChange={(e) => update("companyName", e.target.value)}
                          placeholder="ORGANIZATION"
                          className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                          required
                        />
                      </div>
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Executive Contact <span className="text-gold">*</span></Label>
                        <Input
                          value={form.contactName}
                          onChange={(e) => update("contactName", e.target.value)}
                          placeholder="FULL NAME"
                          className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                          required
                        />
                      </div>
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Corporate Email <span className="text-gold">*</span></Label>
                        <Input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="EMAIL@DOMAIN.COM"
                          className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                          required
                        />
                      </div>
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Priority Phone</Label>
                        <Input
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+00 (0) 000 000 0000"
                          className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                        />
                      </div>
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Region of Operation</Label>
                        <Input
                          value={form.country}
                          onChange={(e) => update("country", e.target.value)}
                          placeholder="GLOBAL LOCATION"
                          className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                        />
                      </div>
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Digital Presence / Instagram</Label>
                        <Input
                          value={form.website}
                          onChange={(e) => update("website", e.target.value)}
                          placeholder="HTTPS://BRAND.COM"
                          className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="relative group">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-8 h-px bg-gold/50" />
                      <h2 className="font-condensed font-bold text-white uppercase tracking-[0.3em] text-[10px]">
                        Manufacturing Logistics
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Product Category <span className="text-gold">*</span></Label>
                        <Select onValueChange={(v) => update("productType", v)}>
                          <SelectTrigger className="bg-transparent border-0 border-b border-white/10 text-white focus:ring-0 focus:border-gold rounded-none px-0 h-10 transition-all text-sm">
                            <SelectValue placeholder="SELECT CLASSIFICATION" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#050505] border-white/10 rounded-none">
                            {productTypes.map((p) => (
                              <SelectItem key={p} value={p} className="text-white/60 focus:bg-white/5 focus:text-gold rounded-none cursor-pointer">{p}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Dossier Quantity <span className="text-gold">*</span></Label>
                        <Select onValueChange={(v) => update("quantity", v)}>
                          <SelectTrigger className="bg-transparent border-0 border-b border-white/10 text-white focus:ring-0 focus:border-gold rounded-none px-0 h-10 transition-all text-sm">
                            <SelectValue placeholder="SELECT VOLUME RANGE" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#050505] border-white/10 rounded-none">
                            {quantities.map((q) => (
                              <SelectItem key={q} value={q} className="text-white/60 focus:bg-white/5 focus:text-gold rounded-none cursor-pointer">{q}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Strategic Timeline</Label>
                        <Select onValueChange={(v) => update("timeline", v)}>
                          <SelectTrigger className="bg-transparent border-0 border-b border-white/10 text-white focus:ring-0 focus:border-gold rounded-none px-0 h-10 transition-all text-sm">
                            <SelectValue placeholder="SELECT WINDOW" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#050505] border-white/10 rounded-none">
                            {timelines.map((t) => (
                              <SelectItem key={t} value={t} className="text-white/60 focus:bg-white/5 focus:text-gold rounded-none cursor-pointer">{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Operational Service</Label>
                        <Select onValueChange={(v) => update("serviceType", v)}>
                          <SelectTrigger className="bg-transparent border-0 border-b border-white/10 text-white focus:ring-0 focus:border-gold rounded-none px-0 h-10 transition-all text-sm">
                            <SelectValue placeholder="SELECT REQUIREMENT" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#050505] border-white/10 rounded-none">
                            {services.map((s) => (
                              <SelectItem key={s} value={s} className="text-white/60 focus:bg-white/5 focus:text-gold rounded-none cursor-pointer">{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Textile Preference</Label>
                        <Input
                          value={form.fabricPreference}
                          onChange={(e) => update("fabricPreference", e.target.value)}
                          placeholder="E.G. 400 GSM FRENCH TERRY"
                          className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                        />
                      </div>
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Finishing & Embellishment</Label>
                        <Input
                          value={form.customizationType}
                          onChange={(e) => update("customizationType", e.target.value)}
                          placeholder="E.G. 3D PUFF EMBROIDERY"
                          className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="relative group">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-8 h-px bg-gold/50" />
                      <h2 className="font-condensed font-bold text-white uppercase tracking-[0.3em] text-[10px]">
                        Tactical Brief
                      </h2>
                    </div>
                    <div className="space-y-10">
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Project Dossier</Label>
                        <Textarea
                          value={form.description}
                          onChange={(e) => update("description", e.target.value)}
                          placeholder="OUTLINE YOUR COMPREHENSIVE REQUIREMENTS..."
                          className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 min-h-[100px] transition-all text-sm tracking-wide resize-none pt-4"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                        <div className="relative group">
                          <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Capital Allocation (USD)</Label>
                          <Input
                            value={form.budgetRange}
                            onChange={(e) => update("budgetRange", e.target.value)}
                            placeholder="PROJECTED EXPENDITURE"
                            className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                          />
                        </div>
                        <div className="relative group">
                          <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Acquisition Source</Label>
                          <Input
                            value={form.howHeard}
                            onChange={(e) => update("howHeard", e.target.value)}
                            placeholder="HOW DID YOU FIND US?"
                            className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitRFQ.isPending}
                    className="relative overflow-hidden w-full bg-gold text-black hover:text-white transition-colors duration-500 font-condensed font-bold tracking-[0.3em] uppercase text-xs py-10 h-auto rounded-none group shadow-[0_10px_40px_-10px_rgba(212,175,55,0.4)]"
                  >
                    <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {submitRFQ.isPending ? "Transmitting..." : "Initialize Proposal Engagement"}
                      {!submitRFQ.isPending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </span>
                  </Button>
                </form>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <aside className="space-y-10">
              <FadeIn direction="left" delay={0.6}>
                <div className="bg-[#050505] border border-white/5 p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <h3 className="font-condensed font-bold text-white uppercase tracking-[0.3em] text-[10px] mb-8 flex items-center gap-3">
                    <span className="w-4 h-px bg-gold" />
                    Operational Roadmap
                  </h3>
                  <div className="space-y-8">
                    {benefits.map((b) => (
                      <div key={b.text} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-none bg-black border border-white/10 flex items-center justify-center shrink-0">
                          <b.icon className="w-3.5 h-3.5 text-gold opacity-80" />
                        </div>
                        <span className="text-white/50 font-light text-xs sm:text-sm leading-relaxed">{b.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 bg-[#050505] border border-white/5 p-8 group">
                  <h3 className="font-condensed font-bold text-white uppercase tracking-[0.3em] text-[10px] mb-8 flex items-center gap-3">
                    <span className="w-4 h-px bg-gold" />
                    Direct Priority Line
                  </h3>
                  <p className="text-white/40 font-light text-sm mb-8 leading-relaxed">
                    For immediate tactical response or rapid prototyping inquiries, our priority line remains available for global partners.
                  </p>
                  <a
                    href="https://wa.me/923022922242?text=Hello%20Sialkot%20Sample%20Masters!%20I%20need%20a%20quote%20for%20custom%20streetwear."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 bg-black border border-white/10 text-white font-condensed font-bold tracking-[0.2em] uppercase text-[10px] px-6 py-4 rounded-none hover:border-[#25D366]/30 transition-all duration-500"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp Priority</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-white/20" />
                  </a>
                </div>

                <div className="mt-10 bg-black border border-white/5 p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl pointer-events-none" />
                  <h3 className="font-condensed font-bold text-white uppercase tracking-[0.3em] text-[10px] mb-8 flex items-center gap-3">
                    <span className="w-4 h-px bg-gold" />
                    Industrial Capability
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "MOQ from 50 pieces",
                      "Sample in 7–10 days",
                      "Bulk delivery in 25–35 days",
                      "50,000+ units/month capacity",
                      "ISO 9001 certified",
                      "Worldwide shipping",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 bg-gold/50 shrink-0" />
                        <span className="text-white/60 font-light text-xs sm:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </aside>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
