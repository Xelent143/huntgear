import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SEOHead from "@/components/SEOHead";
import { FadeIn, StaggerChildren, AnimatedChild, HoverCard, PageWrapper, SectionHeading } from "@/components/animations";
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

      {/* Hero */}
      <section className="relative pt-16 pb-16 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-sm mb-3">Get in Touch</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-foreground mb-6">
            Let's Start a
            <span className="text-gradient-gold italic"> Conversation</span>
          </h1>
          <div className="gold-divider mx-auto" />
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-6">
            Have a question or ready to start your project? Our team responds to all inquiries within 24 business hours.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info) => (
              <div key={info.title} className="bg-card border border-border rounded-sm p-5 hover:border-gold/30 transition-all">
                <div className="w-10 h-10 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <info.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-condensed font-bold text-foreground uppercase tracking-wide text-sm mb-2">{info.title}</h3>
                {info.lines.map((line) => (
                  <p key={line} className="text-muted-foreground text-sm">{line}</p>
                ))}
                {info.link && (
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gold hover:text-gold/80 text-xs font-condensed font-semibold tracking-widest uppercase mt-3 transition-colors"
                  >
                    {info.linkText} <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
              <div className="gold-divider" />
              <p className="text-muted-foreground text-sm mt-4 mb-6">
                For detailed manufacturing inquiries, we recommend using our <a href="/rfq" className="text-gold hover:underline">RFQ form</a> for a faster, more detailed response.
              </p>

              {submitted ? (
                <div className="bg-card border border-gold/30 rounded-sm p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Full Name <span className="text-gold">*</span></Label>
                      <Input
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="John Smith"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Email <span className="text-gold">*</span></Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="john@brand.com"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-foreground text-sm mb-1.5 block">Company</Label>
                      <Input
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        placeholder="Your Brand Name"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
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
                  </div>
                  <div>
                    <Label className="text-foreground text-sm mb-1.5 block">Subject</Label>
                    <Input
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      placeholder="e.g., Custom hoodie manufacturing inquiry"
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground text-sm mb-1.5 block">Message <span className="text-gold">*</span></Label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell us about your project or ask any questions..."
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-gold min-h-[140px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitContact.isPending}
                    className="w-full bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-sm py-3 h-auto rounded-sm"
                  >
                    {submitContact.isPending ? "Sending..." : "Send Message"}
                    {!submitContact.isPending && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              )}
            </div>

            {/* Map + WhatsApp */}
            <div className="space-y-6">
              {/* Google Maps Embed */}
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Find Us</h2>
                <div className="gold-divider" />
                <div className="mt-5 rounded-sm overflow-hidden border border-border aspect-[4/3]">
                  <iframe
                    title="Sialkot Sample Masters Factory Location - Sialkot, Pakistan"
                    src="https://maps.google.com/maps?q=Sialkot+Sample+Masters,+Sialkot,+Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-card border border-border rounded-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-condensed font-bold text-foreground uppercase tracking-wide text-sm mb-1">
                      Fastest Response via WhatsApp
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      For urgent inquiries or quick questions, WhatsApp is the fastest way to reach our team.
                    </p>
                    <a
                      href="https://wa.me/923022922242?text=Hello%20Sialkot%20Sample%20Masters!%20I%20have%20an%20inquiry%20about%20custom%20apparel%20manufacturing."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white font-condensed font-bold tracking-widest uppercase text-xs px-5 py-2.5 rounded-sm hover:bg-[#1ea855] transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Start WhatsApp Chat
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
