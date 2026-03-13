import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import cowImage from "@/assets/dot-seven-cow.png";
import heroSteak from "@/assets/hero-steak.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroSteak})` }}
      />
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="relative z-10 max-w-7xl mx-auto section-padding w-full py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text */}
          <div className="max-w-xl flex-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-sm tracking-[0.3em] uppercase text-barn-red font-semibold mb-4"
            >
              Four Generations of Ranching
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6"
            >
              Ranch to Table.{" "}
              <span className="italic text-barn-red">Unmatched</span> Quality.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-body text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-lg leading-relaxed"
            >
              Premium, sustainably raised beef delivered directly from our family ranch to your door. Taste the difference heritage makes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://dotsevenranch.com/collections/build-your-own-box"
                className="inline-flex items-center justify-center gap-2 bg-barn-red text-primary-foreground px-8 py-4 rounded font-body text-base font-semibold uppercase tracking-wider hover:bg-barn-red-dark transition-all duration-300 hover:shadow-lg"
              >
                Shop Our Beef
                <ArrowRight size={18} />
              </a>
              <a
                href="https://dotsevenranch.com/collections/beef-box-specials"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded font-body text-base font-semibold uppercase tracking-wider hover:border-primary-foreground/60 transition-all duration-300"
              >
                View Beef Boxes
              </a>
            </motion.div>
          </div>

          {/* Cow Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <img
              src={cowImage}
              alt="Dot Seven Ranch cow"
              className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-primary-foreground/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
