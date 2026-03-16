import { motion } from "framer-motion";
import ranchLandscape from "@/assets/ranch-landscape.jpg";
import familyPortrait from "@/assets/family-portrait.jpg";

const RanchToTable = () => {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-bold text-charcoal text-center mb-12"
        >
          From Our Ranch to Your Table
        </motion.h2>

        {/* Ranch Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden mb-10"
        >
          <img
            src={ranchLandscape}
            alt="Dot Seven Ranch landscape"
            className="w-full aspect-[16/9] object-cover"
          />
        </motion.div>

        {/* Short Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-lg text-muted-foreground leading-relaxed space-y-4 mb-10 max-w-3xl mx-auto text-center"
        >
          <p>
            Since the inception of this ranch, four generations back, the mission hasn't wavered. Our goal is to grow healthy and sustainable cattle that supply a great source of protein for a growing population.
          </p>
          <p>
            We take environmental stewardship very seriously and work hard to improve the land for future generations of both cattle and family. We hold a strong sense of pride in the product we produce, the industry that we are a part of, and the generations of family for which this ranch provides.
          </p>
        </motion.div>

        {/* Family Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden"
        >
          <img
            src={familyPortrait}
            alt="The Dot Seven Ranch family"
            className="w-full aspect-[16/9] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default RanchToTable;
