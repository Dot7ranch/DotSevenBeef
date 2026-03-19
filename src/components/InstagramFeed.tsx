import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { useEffect } from "react";

const InstagramFeed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Follow Us on Instagram
          </h2>
          <a
            href="https://www.instagram.com/dotsevenranch/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-lg text-primary hover:text-primary/80 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            @dotsevenranch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          {/* 
            To display a live Instagram feed grid, sign up for a free widget at 
            snapwidget.com or elfsight.com, then paste your embed code below.
            The Instagram profile link is shown as a fallback.
          */}
          <div className="w-full max-w-4xl text-center">
            <div className="elfsight-app-b6a779d4-9bf3-4879-8ffc-88e93db9d274" data-elfsight-app-lazy></div>
            <a
              href="https://www.instagram.com/dotsevenranch/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-display text-sm font-bold tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              FOLLOW US ON INSTAGRAM
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;
