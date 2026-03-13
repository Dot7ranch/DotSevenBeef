import { motion } from "framer-motion";
import shippingMap from "@/assets/shipping-zones.png";

const ShippingZones = () => {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4"
          >
            We Ship Nationwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-lg text-charcoal-light max-w-2xl mx-auto"
          >
            Fresh, frozen beef delivered right to your door. Check your shipping zone below.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <img
            src={shippingMap}
            alt="Dot Seven Ranch shipping zones map - Zone 1: $19, Zone 2: $39, Zone 3: $55, Zone 4: $69"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ShippingZones;
