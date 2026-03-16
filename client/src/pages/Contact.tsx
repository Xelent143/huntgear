import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { motion } from "framer-motion";
import { FadeIn, PageWrapper } from "@/components/animations";
import { Breadcrumb, predefinedBreadcrumbs } from "@/components/Breadcrumb";

const contactInfo = [
  { icon: MapPin, title: "Factory Address", lines: ["Sialkot Industrial Estate", "Sialkot 51310, Punjab, Pakistan"] },
  { icon: Phone, title: "Phone", lines: ["+92-302-2922242", "Mon-Fri 9AM-6PM PST"] },
  { icon: Mail, title: "Email", lines: ["info@xelenthuntgear.com", "sales@xelenthuntgear.com"] },
  { icon: Clock, title: "Working Hours", lines: ["Monday - Friday: 9AM - 6PM", "Saturday: 9AM - 2PM"] },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <PageWrapper>
      <SEOHead
        title="Contact Us | Xelent Huntgear Pakistan"
        description="Get in touch with Xelent Huntgear. Request a free quote for custom hunting apparel manufacturing. Email info@xelenthuntgear.com or call +92-302-2922242."
        canonical="/contact"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Contact Us", item: "/contact" },
        ]}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#0a0a0a] border-b border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={predefinedBreadcrumbs.contact} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.aboutBg} alt="Contact Xelent Huntgear - Global B2B Manufacturing and Export Support" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </div>

        <div className="relative z-10 min-h-[60vh] flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#ff6b00] font-condensed font-semibold tracking-[0.2em] uppercase text-sm mb-4"
            >
              Get In Touch
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] mb-6"
            >
              Let's Start Your
              <span className="block text-[#ff6b00] italic font-light">Project</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-20 h-1 bg-[#ff6b00] origin-left mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/80 text-lg max-w-2xl leading-relaxed"
            >
              Ready to manufacture your hunting apparel line? Contact us for a free quote.
              We typically respond within 24 hours.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CONTACT SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <FadeIn direction="left">
              <div className="bg-[#111111] border border-white/10 p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-3 text-white focus:border-[#ff6b00] focus:outline-none transition-colors"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-3 text-white focus:border-[#ff6b00] focus:outline-none transition-colors"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Company Name</label>
                    <input
                      type="text"
                      className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-3 text-white focus:border-[#ff6b00] focus:outline-none transition-colors"
                      placeholder="Your Brand"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-3 text-white focus:border-[#ff6b00] focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#ff6b00] text-black hover:bg-[#ff8533] font-condensed font-bold uppercase tracking-wider py-4 h-auto"
                  >
                    Send Message <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn direction="right" delay={0.1}>
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex gap-4 p-6 bg-[#111111] border border-white/10 hover:border-[#ff6b00]/30 transition-colors">
                      <div className="w-12 h-12 bg-[#ff6b00]/10 border border-[#ff6b00]/20 flex items-center justify-center shrink-0">
                        <info.icon className="w-5 h-5 text-[#ff6b00]" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                        {info.lines.map((line, i) => (
                          <p key={i} className="text-white/60 text-sm">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <div className="mt-8 p-6 bg-[#ff6b00]/10 border border-[#ff6b00]/30">
                  <h3 className="text-white font-bold mb-2">Prefer WhatsApp?</h3>
                  <p className="text-white/60 text-sm mb-4">Chat with us directly for quick inquiries</p>
                  <a
                    href="https://wa.me/923022922242"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#ff6b00] font-semibold hover:underline"
                  >
                    Message on WhatsApp <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAP SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="h-96 bg-[#0d0d0d]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107567.123456789!2d74.5123456!3d32.5123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDMwJzQ0LjQiTiA3NMKwMzAnNDQuNCJF!5e0!3m2!1sen!2s!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(100%) invert(92%)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Xelent Huntgear Location"
        />
      </section>
    </PageWrapper>
  );
}
