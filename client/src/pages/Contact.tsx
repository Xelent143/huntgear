import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SEOHead from "@/components/SEOHead";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    title: "Factory Location",
    lines: ["Sialkot Industrial Zone", "Punjab, Pakistan 51310"],
    link: "https://share.google/q0X4Posm06xeNvJ3k",
    linkText: "Get Directions",
  },
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    lines: ["+92 302 292 2242"],
    link: "https://wa.me/923022922242",
    linkText: "WhatsApp Us",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@sialkotsamplemasters.com"],
    link: "mailto:info@sialkotsamplemasters.com",
    linkText: "Send Email",
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Monday – Saturday", "9:00 AM – 6:00 PM PKT"],
    link: null,
    linkText: null,
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you within 24 hours.");
    },
    onError: () => {
      toast.error("Failed to send message. Please try again or contact us directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitContact.mutate(form);
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <PageWrapper>
      <SEOHead
        title="Contact Sialkot Sample Masters | Custom Streetwear Manufacturer Pakistan"
        description="Contact Sialkot Sample Masters, Pakistan's leading custom streetwear manufacturer in Sialkot. Reach us via email, phone, WhatsApp, or our contact form. Response within 24 hours."
        keywords="contact streetwear manufacturer Pakistan, Sialkot Sample Masters contact, clothing manufacturer Sialkot contact, B2B apparel manufacturer Pakistan contact"
        canonical="/contact"
      />

      {/* ── Elite Hero ── */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-black border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn direction="down" delay={0.1}>
            <div className="inline-flex items-center justify-center gap-3 mb-8">
              <span className="w-8 h-px bg-gold" />
              <p className="text-gold font-condensed font-bold tracking-[0.3em] uppercase text-xs">
                Global Relations
              </p>
              <span className="w-8 h-px bg-gold" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Initiate Your
              <br />
              <span className="text-gradient-gold italic font-light">Custom Legacy</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-white/60 font-light text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
              Have a tactical question or ready to scale your production? Our executive team responds to all inquiries within 24 business hours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Elite Contact Info Cards ── */}
      <section className="py-24 bg-[#050505] relative border-b border-white/5">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/10" stagger={0.1}>
            {contactInfo.map((info) => (
              <AnimatedChild key={info.title} direction="up">
                <div className="bg-[#050505] p-8 hover:bg-white/[0.02] transition-colors duration-500 h-full relative group">
                  <div className="absolute top-0 left-0 w-0 h-1 bg-gold/0 transition-all duration-700 ease-out group-hover:w-full group-hover:bg-gold/50" />

                  <div className="w-12 h-12 flex items-center justify-center bg-black border border-white/10 mb-8 group-hover:border-gold/30 transition-colors duration-500">
                    <info.icon className="w-5 h-5 text-gold" />
                  </div>

                  <h3 className="font-condensed font-bold text-white uppercase tracking-[0.2em] text-xs mb-4 group-hover:text-gold transition-colors duration-500">
                    {info.title}
                  </h3>

                  <div className="space-y-1 mb-6">
                    {info.lines.map((line) => (
                      <p key={line} className="text-white/40 font-light text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                        {line}
                      </p>
                    ))}
                  </div>

                  {info.link && (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gold hover:text-white text-[9px] font-condensed font-bold tracking-[0.3em] uppercase transition-all duration-300"
                    >
                      {info.linkText} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </AnimatedChild>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Elite Form + Map ── */}
      <section className="py-24 bg-black relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Contact Form */}
            <div>
              <FadeIn direction="right">
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-gold" />
                  <p className="text-gold font-condensed font-bold tracking-[0.2em] uppercase text-xs">
                    Secure Channel
                  </p>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Dispatch a Message</h2>
                <div className="w-16 h-px bg-gold/30 mb-8" />
                <p className="text-white/40 font-light text-sm mb-12 max-w-md leading-relaxed">
                  For detailed manufacturing specifications, we recommend utilizing our <Link href="/rfq" className="text-gold hover:text-white underline decoration-gold/30 underline-offset-4 transition-colors">RFQ Portal</Link> for prioritized executive review.
                </p>

                {submitted ? (
                  <div className="bg-[#050505] border border-gold/30 p-12 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gold/5 blur-3xl group-hover:bg-gold/10 transition-colors duration-1000" />
                    <div className="relative z-10">
                      <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6 opacity-80" />
                      <h3 className="font-serif text-3xl font-bold text-white mb-4">Transmission Received</h3>
                      <p className="text-white/50 font-light">Our coordination team will initiate contact within 24 business hours.</p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        className="mt-8 bg-transparent border border-white/20 text-white hover:border-gold hover:text-gold rounded-none font-condensed font-bold tracking-widest uppercase text-[10px]"
                      >
                        Send New Message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Full Name <span className="text-gold">*</span></Label>
                        <Input
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="EXECUTIVE NAME"
                          className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                          required
                        />
                      </div>
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Email <span className="text-gold">*</span></Label>
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
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Company</Label>
                        <Input
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
                          placeholder="BRAND / ORGANIZATION"
                          className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                        />
                      </div>
                      <div className="relative group">
                        <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Phone / WhatsApp</Label>
                        <Input
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+00 (0) 000 000 0000"
                          className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Subject</Label>
                      <Input
                        value={form.subject}
                        onChange={(e) => update("subject", e.target.value)}
                        placeholder="INQUIRY CLASSIFICATION"
                        className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 h-10 transition-all text-sm tracking-wide"
                      />
                    </div>
                    <div className="relative group">
                      <Label className="text-white/30 text-[10px] font-condensed font-bold tracking-widest uppercase mb-2 block group-focus-within:text-gold transition-colors">Brief <span className="text-gold">*</span></Label>
                      <Textarea
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="OUTLINE YOUR OBJECTIVES OR QUESTIONS..."
                        className="bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-gold rounded-none px-0 min-h-[120px] transition-all text-sm tracking-wide resize-none pt-4"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitContact.isPending}
                      className="relative overflow-hidden w-full bg-gold text-black hover:text-white transition-colors duration-500 font-condensed font-bold tracking-[0.3em] uppercase text-xs py-8 h-auto rounded-none group shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)]"
                    >
                      <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[var(--bezier-out)]" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {submitContact.isPending ? "Transmitting..." : "Initialize Transmission"}
                        {!submitContact.isPending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                      </span>
                    </Button>
                  </form>
                )}
              </FadeIn>
            </div>

            {/* Map + WhatsApp */}
            <div className="space-y-12">
              <FadeIn direction="left">
                {/* Google Maps Embed */}
                <div className="relative group">
                  <div className="absolute -inset-px bg-gradient-to-tr from-gold/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
                  <div className="relative z-10 bg-[#050505] border border-white/5 p-2">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <iframe
                        title="Sialkot Sample Masters Factory Location - Sialkot, Pakistan"
                        src="https://maps.google.com/maps?q=Sialkot+Sample+Masters,+Sialkot,+Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        className="grayscale invert opacity-60 hover:opacity-80 transition-opacity duration-700"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/30 -translate-x-4 translate-y-4" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/30 translate-x-4 -translate-y-4" />
                </div>

                {/* WhatsApp CTA */}
                <div className="mt-12 bg-[#050505] border border-white/5 p-8 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(37,211,102,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10 flex items-start gap-6">
                    <div className="w-14 h-14 bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#25D366]/30 transition-colors">
                      <MessageCircle className="w-6 h-6 text-[#25D366]" />
                    </div>
                    <div>
                      <h3 className="font-condensed font-bold text-white uppercase tracking-[0.2em] text-xs mb-3 group-hover:text-[#25D366] transition-colors">
                        Accelerated Dialogue via WhatsApp
                      </h3>
                      <p className="text-white/40 font-light text-sm mb-8 leading-relaxed">
                        For immediate tactical response or rapid prototyping inquiries, our priority line remains available for global partners.
                      </p>
                      <a
                        href="https://wa.me/923022922242?text=Hello%20Sialkot%20Sample%20Masters!%20I%20have%20an%20inquiry%20about%20custom%20apparel%20manufacturing."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 text-white font-condensed font-bold tracking-[0.3em] uppercase text-[9px] group/btn"
                      >
                        <span className="relative">
                          Commence Chat
                          <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#25D366] transition-all group-hover/btn:w-full" />
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#25D366] group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
