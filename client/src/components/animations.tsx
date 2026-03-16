/**
 * Reusable Framer Motion animation primitives for Sialkot Sample Masters
 * All components are designed to feel premium and professional — not gimmicky.
 */
import { motion, useInView, useMotionValue, useSpring, type Transition, type Variants } from "framer-motion";
import { useRef, useEffect, ReactNode } from "react";

// Typed easing constant — satisfies Framer Motion v12 Easing type
const EASE_OUT = "easeOut" as const;
const EASE_IN = "easeIn" as const;

// ─── Shared Transitions ───────────────────────────────────────────────────────

const t = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_OUT,
});

// ─── Shared Variants ──────────────────────────────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: t(0.6) },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: t(0.55) },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: t(0.6) },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: t(0.6) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: t(0.7) },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: t(0.55) },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0 } },
};

// ─── FadeIn ───────────────────────────────────────────────────────────────────

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px 0px" });

  const hiddenMap = {
    up: { opacity: 0, y: 32 },
    down: { opacity: 0, y: -24 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
    none: { opacity: 0 },
  };

  const visibleMap = {
    up: { opacity: 1, y: 0 },
    down: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    none: { opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hiddenMap[direction]}
      animate={isInView ? visibleMap[direction] : hiddenMap[direction]}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerChildren ──────────────────────────────────────────────────────────

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}

export function StaggerChildren({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  once = true,
}: StaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedChild (use inside StaggerChildren) ───────────────────────────────

interface AnimatedChildProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none" | "scale";
}

export function AnimatedChild({ children, className, direction = "up" }: AnimatedChildProps) {
  const variantMap: Record<string, Variants> = {
    up: {
      hidden: { opacity: 0, y: 28 },
      visible: { opacity: 1, y: 0, transition: t(0.55) },
    },
    down: {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0, transition: t(0.55) },
    },
    left: {
      hidden: { opacity: 0, x: -32 },
      visible: { opacity: 1, x: 0, transition: t(0.55) },
    },
    right: {
      hidden: { opacity: 0, x: 32 },
      visible: { opacity: 1, x: 0, transition: t(0.55) },
    },
    none: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: t(0.5) },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: t(0.5) },
    },
  };

  return (
    <motion.div className={className} variants={variantMap[direction]}>
      {children}
    </motion.div>
  );
}

// ─── CountUp ─────────────────────────────────────────────────────────────────

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ to, suffix = "", prefix = "", duration = 2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (isInView) motionValue.set(to);
  }, [isInView, motionValue, to]);

  useEffect(() => {
    return springValue.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

// ─── AnimatedGoldLine ─────────────────────────────────────────────────────────

export function AnimatedGoldLine({ className }: { className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      className={`h-px bg-gold ${className ?? ""}`}
      initial={{ scaleX: 0, originX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
    />
  );
}

// ─── HoverCard ────────────────────────────────────────────────────────────────

export function HoverCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: EASE_OUT } }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

// ─── PageWrapper ──────────────────────────────────────────────────────────────

export function PageWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

// ─── SectionHeading ───────────────────────────────────────────────────────────

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const textAlign = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${textAlign} ${className ?? ""}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {label && (
        <motion.span
          className="font-condensed text-gold text-xs tracking-[0.3em] uppercase mb-3"
          variants={fadeInDown}
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
        variants={fadeInUp}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-muted-foreground mt-4 max-w-2xl leading-relaxed"
          variants={fadeInUp}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className="mt-5 h-px bg-gold w-16"
        initial={{ scaleX: 0 }}
        style={{ originX: align === "center" ? 0.5 : 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT }}
      />
    </motion.div>
  );
}

// Suppress unused import warning
void EASE_IN;
