import { motion } from "framer-motion";
import familyPortrait2 from "@/assets/family-portrait-2.jpg";
import coupleRanch from "@/assets/couple-ranch.jpg";
import brandingIron from "@/assets/branding-iron.jpg";
import ranchKid from "@/assets/ranch-kid.jpg";

const RanchStory = () => {
  return (
    <section id="story" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden col-span-2">
                <img src={familyPortrait2} alt="The Dot Seven Ranch family" className="w-full aspect-[16/9] object-cover" />
              </div>
              <div className="relative rounded-lg overflow-hidden">
                <img src={coupleRanch} alt="Ranch couple watching the work" className="w-full aspect-[3/4] object-cover" />
              </div>
              <div className="relative rounded-lg overflow-hidden">
                <img src={ranchKid} alt="Young rancher on the job" className="w-full aspect-[3/4] object-cover" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-barn-red font-semibold mb-3">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              A Legacy of <span className="italic">Quality</span> & Stewardship
            </h2>
            <div className="space-y-4 font-body text-base text-muted-foreground leading-relaxed">
              <p>
                Since the inception of this ranch, four generations back, the mission hasn't wavered. Our goal is to grow healthy and sustainable cattle that supply a great source of protein for a growing population.
              </p>
              <p>
                We take environmental stewardship very seriously and work hard to improve the land for future generations of both cattle and family. We hold a strong sense of pride in the product we produce, the industry that we are a part of, and the generations of family for which this ranch provides.
              </p>
            </div>
            <div className="mt-8 flex gap-8">
              <div>
                <p className="font-display text-3xl font-bold text-barn-red">4</p>
                <p className="font-body text-sm text-muted-foreground">Generations</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-display text-3xl font-bold text-barn-red">100%</p>
                <p className="font-body text-sm text-muted-foreground">Pasture Raised</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-display text-3xl font-bold text-barn-red">0</p>
                <p className="font-body text-sm text-muted-foreground">Hormones Added</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Branding action photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-lg overflow-hidden max-w-2xl mx-auto"
        >
          <img src={brandingIron} alt="Branding day on the ranch" className="w-full aspect-[3/4] object-cover" />
        </motion.div>
      </div>
    </section>
  );
};

export default RanchStory;
