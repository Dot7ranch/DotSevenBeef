import { motion } from "framer-motion";
import familyPortrait2 from "@/assets/family-portrait-2.jpg";
import coupleRanch from "@/assets/couple-ranch.jpg";
import brandingIron from "@/assets/branding-iron.jpg";
import ranchKid from "@/assets/ranch-kid.jpg";
import dotSevenCow from "@/assets/dot-seven-cow.png";

const historyBlocks = [
  {
    text: "The history of the .7 brand and ranch began when Jay Robinson returned home from the Army and World War II. Jay returned to his job with Bud and June Sample. He had worked on the Sample's cattle ranch for many years and had become like a son to them and a brother to their two daughters, Sally and Pug. Bud was a mentor and advisor to Jay, telling him it was time to start his own herd and register a brand. He wanted the brand to be simple, easy to read, and to burn clean. The Dot Seven (.7) was soon registered to Jay Robinson.",
  },
  {
    text: "Jay married Betty in 1948 and together they bought a small Grade B dairy near Clovis, California. They worked hard, saving every penny to put towards their future. If Jay was fixing fence the staple was taken out, pounded straight, and used again. In 1960 a prime 60 acre permanent pasture place came available; they sold the dairy to buy this land. There Jay & Betty began their commercial cow calf operation east of Sanger, California.",
  },
  {
    text: "Over time Jay and Betty grew their beef cattle business. Looking to expand their cattle numbers, Jay leased every available piece of land he could find. The cattle were spread out over much of Sanger and Clovis. When Fred Hazelton heard Jay was looking to buy another ranch in the area, the Hazelton's brought a proposal to him. What was once the Bar OX Ranch then became part of the Dot Seven Ranch.",
  },
  {
    text: "The Dot Seven Ranch sits in the rolling hills of Eastern Fresno County, about ten miles northeast of downtown Sanger. Lying just below where the oak trees grow, the ranch is full of gentle rolling hills and easy terrain. Typically the cattle on the Dot Seven grow fat off the native grass with only a few months spent supplementing their diet with hay during the winter.",
  },
  {
    text: "Over the years, the breeds of cattle raised on the Dot Seven have changed with the market. Today you will see a conventional cow-calf operation that is mostly Black Angus. This is a closed herd and all of the replacement heifers are grown on the ranch. Jay was a progressive cattleman by nature — his genetic choices set the groundwork for which the ranch is still operated by today.",
  },
  {
    text: "Jay and Betty were always very focused on the next generation. They cultivated a desire to continue the legacy in both their children and grandchildren by instilling a deep pride of the land and the cattle. Jay and Betty's two daughters, Betsy Behlen and Jayne Robinson, the third generation, now own the ranch. Betsy manages the cattle operation with the help of her husband Steve and her two children Brooke Helsel and Brett Behlen and their spouses, the fourth generation.",
  },
];

const RanchStory = () => {
  return (
    <section id="story" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Hero intro */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden col-span-2">
                <img src={familyPortrait2} alt="Robinson family portrait" className="w-full object-cover" />
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
            viewport={{ once: true }}>
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
                <p className="font-body text-sm text-muted-foreground">Family Owned</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-display text-3xl font-bold text-barn-red">0</p>
                <p className="font-body text-sm text-muted-foreground">Hormones Added</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ranch History Timeline */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-barn-red font-semibold mb-3">Est. 1948</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              History of the Dot Seven Ranch
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-barn-red/20" />

            <div className="space-y-12 lg:space-y-20">
              {historyBlocks.map((block, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.1 }}
                    className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center`}
                  >
                    {/* Dot on timeline */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
                      <div className="w-3 h-3 rounded-full bg-barn-red" />
                    </div>

                    <div className={`${isEven ? 'lg:pr-12' : 'lg:col-start-2 lg:pl-12'}`}>
                      <p className="font-body text-base text-muted-foreground leading-relaxed">
                        {block.text}
                      </p>
                    </div>

                    {/* Empty column for alternating layout */}
                    {isEven && <div className="hidden lg:block" />}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Closing mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <img src={dotSevenCow} alt="Dot Seven brand" className="w-16 h-16 mx-auto mb-6 object-contain" />
          <p className="font-body text-base text-muted-foreground leading-relaxed italic">
            "We will always continue to adapt with the changes in the market, new technologies and improved management techniques so that we may continue to carry on the Dot Seven Brand for many generations to come."
          </p>
        </motion.div>

        {/* Branding action photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-lg overflow-hidden max-w-2xl mx-auto">
          <img src={brandingIron} alt="Branding day on the ranch" className="w-full aspect-[3/4] object-cover" />
        </motion.div>
      </div>
    </section>
  );
};

export default RanchStory;
