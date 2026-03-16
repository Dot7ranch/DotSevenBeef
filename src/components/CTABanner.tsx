import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="bg-barn-red py-16 lg:py-20">
      <div className="max-w-4xl mx-auto section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Ready to Taste the Difference?
          </h2>
          <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Order today and receive premium, ranch-raised beef delivered to your door. Beef boxes ship every Monday!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://dotsevenranch.com/collections/build-your-own-box"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-barn-red px-8 py-4 rounded font-body text-base font-semibold uppercase tracking-wider hover:bg-cream transition-colors"
            >
              Build Your Box
              <ArrowRight size={18} />
            </a>
            <a
              href="https://dotsevenranch.com/collections/beef-shares"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/40 text-primary-foreground px-8 py-4 rounded font-body text-base font-semibold uppercase tracking-wider hover:border-primary-foreground/80 transition-colors"
            >
              Buy a Beef Share
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
