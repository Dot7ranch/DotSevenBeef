import { motion } from "framer-motion";
import { Package, Truck, UtensilsCrossed } from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "Choose Your Box",
    description: "Pick from curated beef boxes or build your own.",
  },
  {
    icon: Truck,
    title: "We Ship From Our Ranch or Deliver to Longhorn Feed For Local Pick Up",
    description: "Your order ships frozen with dry ice. Orders are packed and shipped/delivered to Longhorn each Monday afternoon.",
  },
  {
    icon: UtensilsCrossed,
    title: "Enjoy Better Beef at Home",
    description: "Stock your freezer with premium ranch beef.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            How It Works
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            How does buying beef online work? <span className="font-semibold">3 simple steps.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="font-display text-sm font-bold text-primary tracking-wider mb-2">
                STEP {i + 1}
              </span>
              <h3 className="font-display text-xl font-bold text-foreground mb-2 leading-tight">
                {step.title}
              </h3>
              <p className="font-body text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
