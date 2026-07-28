import { motion } from "framer-motion";
import cattlePasture from "@/assets/cattle-pasture.jpg";
import familyHorse from "@/assets/family-horse.jpg";

const RanchToTable = () => {
  return (
    <section className="lg:py-14 bg-cream py-8">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-bold text-charcoal text-center mb-6">
          From Our Ranch to Your Table
        </motion.h2>

        {/* Ranch Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden mb-6">
          <img

            alt="Black Angus cattle grazing on Dot Seven Ranch pasture"
            className="w-full aspect-[16/9] object-cover" src="/uploads/721313ac-4e66-4fbe-97cf-490a3d5ede7d.jpg" />
        </motion.div>

        {/* Short Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-lg text-muted-foreground leading-relaxed space-y-4 mb-6 max-w-3xl mx-auto text-center">
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
          className="rounded-lg overflow-hidden">
          <img

            alt="The Dot Seven Ranch family with horse and cattle"
            className="w-full aspect-[16/9] object-cover" src="/uploads/21eac2bf-a30b-4456-ab42-3aebc68fac49.jpg" />
        </motion.div>
      </div>
    </section>);

};

export default RanchToTable;