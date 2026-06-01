import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroSteak from "@/assets/hero-steak.jpg";

const fathersDayBanner = "https://cdn.shopify.com/s/files/1/0584/0411/0525/files/Untitled_design_24.png?v=1780347788";

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 2);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-charcoal">

      {/* Slide 1 background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${heroSteak})`, opacity: current === 0 ? 1 : 0 }}
        aria-hidden="true"
      />
      {/* Slide 2 background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${fathersDayBanner})`, opacity: current === 1 ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* Slide 1 overlay */}
      <div
        className="absolute inset-0 bg-charcoal/70 transition-opacity duration-1000"
        style={{ opacity: current === 0 ? 1 : 0 }}
        aria-hidden="true"
      />
      {/* Slide 2 overlay — very light so image text stays readable */}
      <div
        className="absolute inset-0 bg-charcoal/10 transition-opacity duration-1000"
        style={{ opacity: current === 1 ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* Slide 1 content */}
      <div
        className="relative z-10 max-w-7xl mx-auto section-padding w-full lg:py-20 py-12 transition-opacity duration-700"
        style={{ opacity: current === 0 ? 1 : 0, pointerEvents: current === 0 ? "auto" : "none" }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="max-w-xl flex-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-sm tracking-[0.3em] uppercase text-cream font-semibold mb-4"
            >
              Four Generations of Ranching
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-6"
            >
              Better Beef. Raised by Ranchers.{" "}
              <span className="italic text-barn-red text-secondary">Shipped Straight</span> to Your Door.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-body text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-lg leading-relaxed"
            >
              Premium, sustainably raised, Black Angus beef delivered directly from our 4th-generation California ranch — to your freezer.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/collections/beef-box-specials"
                className="inline-flex items-center justify-center gap-2 bg-barn-red text-primary-foreground rounded font-body text-base font-semibold uppercase tracking-wider hover:bg-barn-red-dark transition-all duration-300 hover:shadow-lg px-[20px] py-[16px] border-0 whitespace-nowrap"
              >
                SHOP CURATED BOXES
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/collections/build-your-own-box"
                className="inline-flex items-center justify-center gap-2 bg-barn-red text-primary-foreground rounded font-body text-base font-semibold uppercase tracking-wider hover:bg-barn-red-dark transition-all duration-300 hover:shadow-lg px-[20px] py-[16px] border-0 whitespace-nowrap"
              >
                BUILD YOUR OWN BOX
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide 2 — button */}
      <div
        className="absolute inset-0 z-10 flex items-end justify-center pb-16 transition-opacity duration-700"
        style={{ opacity: current === 1 ? 1 : 0, pointerEvents: current === 1 ? "auto" : "none" }}
      >
        <Link
          to="/collections/steaks"
          className="inline-flex items-center justify-center gap-2 bg-barn-red text-white rounded font-body text-base font-semibold uppercase tracking-wider hover:bg-barn-red-dark transition-all duration-300 hover:shadow-lg px-8 py-4 whitespace-nowrap"
        >
          SHOP SIGNATURE STEAKS
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
