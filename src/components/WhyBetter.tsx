import { motion } from "framer-motion";
import { Beef, Timer, Package } from "lucide-react";

const features = [
  {
    icon: "🐄",
    title: "Raised on Our Family Ranch.",
    description: "No commodity beef. We know exactly how each animal was raised.",
  },
  {
    icon: "🥩",
    title: "Premium Black Angus Genetics.",
    description: "Four generations of selective breeding.",
  },
  {
    icon: "⏳",
    title: "Dry-Aged for Flavor.",
    description: "Tender, steakhouse-quality beef.",
  },
  {
    icon: "📦",
    title: "Ranch to Freezer Shipping.",
    description: "Frozen at peak freshness and delivered nationwide.",
  },
];

const WhyBetter = () => {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal text-center mb-16"
        >
          Why Dot Seven Ranch Beef Tastes Better
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-display text-lg font-semibold text-charcoal mb-2 uppercase tracking-wide">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBetter;
