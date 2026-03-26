import { useState } from "react";
import { ArrowRight, Upload, CheckCircle, Send } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { motion } from "framer-motion";
import { FadeIn, PageWrapper } from "@/components/animations";

const productTypes = [
  "Hunting Jackets",
  "Hunting Pants",
  "Camo Gear",
  "Base Layers",
  "Tactical Wear",
  "Outdoor Accessories"
];

const orderQuantities = [
  "50-100 pieces",
  "100-500 pieces",
  "500-1000 pieces",
  "1000+ pieces"
];

export default function RFQ() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    productType: "",
    quantity: "",
    description: "",
    files: null as FileList | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setStep(3);
  };

  return (
    <PageWrapper>
      <SEOHead
        title="Request Free Quote | Xelent Huntgear Manufacturing"
        description="Get a free quote for custom hunting apparel manufacturing. Low MOQ 50pcs. 7-day sample turnaround. Waterproof gear, camo patterns, tactical wear."
        canonical="/rfq"
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[50vh] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.ctaBg} alt="RFQ" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/60" />
        </div>

        <div className="relative z-10 min-h-[50vh] flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#ff6b00] font-condensed font-semibold tracking-[0.2em] uppercase text-sm mb-4"
            >
              Get Started
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] mb-6"
            >
              Request a
              <span className="block text-[#ff6b00] italic font-light">Free Quote</span>
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
              Tell us about your hunting apparel project. We'll respond within 24 hours
              with a detailed quote and production timeline.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FORM SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {step === 3 ? (
            <FadeIn>
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-[#ff6b00]/20 border border-[#ff6b00]/30 flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-10 h-10 text-[#ff6b00]" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Quote Request Received!</h2>
                <p className="text-white/60 text-lg max-w-lg mx-auto mb-8">
                  Thank you for your inquiry. Our team will review your requirements
                  and respond within 24 hours with a detailed quote.
                </p>
                <Link href="/">
                  <Button className="bg-[#ff6b00] text-black hover:bg-[#ff8533] font-condensed font-bold uppercase tracking-wider px-8 py-3">
                    Return Home <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <div className="bg-[#111111] border border-white/10 p-8 lg:p-12">
                {/* Progress */}
                <div className="flex items-center gap-4 mb-10">
                  <div className={`w-10 h-10 flex items-center justify-center font-bold ${step >= 1 ? "bg-[#ff6b00] text-black" : "bg-[#161616] text-white/40"}`}>1</div>
                  <div className={`flex-1 h-px ${step >= 2 ? "bg-[#ff6b00]" : "bg-white/10"}`} />
                  <div className={`w-10 h-10 flex items-center justify-center font-bold ${step >= 2 ? "bg-[#ff6b00] text-black" : "bg-[#161616] text-white/40"}`}>2</div>
                </div>

                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white mb-6">Step 1: Your Information</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/60 text-sm mb-2">Full Name *</label>
                          <input
                            type="text"
                            required
                            className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-3 text-white focus:border-[#ff6b00] focus:outline-none transition-colors"
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
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/60 text-sm mb-2">Company Name</label>
                        <input
                          type="text"
                          className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-3 text-white focus:border-[#ff6b00] focus:outline-none transition-colors"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>

                      <div className="pt-6">
                        <Button
                          type="button"
                          onClick={() => setStep(2)}
                          className="bg-[#ff6b00] text-black hover:bg-[#ff8533] font-condensed font-bold uppercase tracking-wider px-8 py-3"
                        >
                          Continue <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white mb-6">Step 2: Project Details</h2>

                      <div>
                        <label className="block text-white/60 text-sm mb-3">Product Type *</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {productTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({ ...formData, productType: type })}
                              className={`p-3 text-sm border transition-all ${formData.productType === type
                                  ? "border-[#ff6b00] bg-[#ff6b00]/10 text-white"
                                  : "border-white/10 text-white/60 hover:border-white/30"
                                }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/60 text-sm mb-3">Order Quantity *</label>
                        <div className="flex flex-wrap gap-3">
                          {orderQuantities.map((qty) => (
                            <button
                              key={qty}
                              type="button"
                              onClick={() => setFormData({ ...formData, quantity: qty })}
                              className={`px-4 py-2 text-sm border transition-all ${formData.quantity === qty
                                  ? "border-[#ff6b00] bg-[#ff6b00]/10 text-white"
                                  : "border-white/10 text-white/60 hover:border-white/30"
                                }`}
                            >
                              {qty}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/60 text-sm mb-2">Project Description</label>
                        <textarea
                          rows={4}
                          className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-3 text-white focus:border-[#ff6b00] focus:outline-none transition-colors resize-none"
                          placeholder="Describe your project requirements..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>

                      <div className="flex gap-4 pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="border-white/30 text-white hover:border-[#ff6b00] hover:text-[#ff6b00] font-condensed font-bold uppercase tracking-wider px-8 py-3"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="bg-[#ff6b00] text-black hover:bg-[#ff8533] font-condensed font-bold uppercase tracking-wider px-8 py-3"
                        >
                          Submit Request <Send className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TRUST INDICATORS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#111111] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "24h", label: "Response Time" },
              { value: "7 Days", label: "Sample Turnaround" },
              { value: "50 pcs", label: "Minimum Order" },
              { value: "Free", label: "Quote" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-condensed font-bold text-[#ff6b00]">{stat.value}</div>
                <div className="text-white/50 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
