import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import dotSevenCow from "@/assets/dot-seven-cow.png";
import ranchLandscape from "@/assets/ranch-landscape.jpg";
import brandingIron from "@/assets/branding-iron.jpg";
import familyPortrait2 from "@/assets/family-portrait-2.jpg";

const historyBlocks = [
  {
    text: "The history of the .7 brand and ranch began when Jay Robinson returned home from the Army and World War II. Jay returned to his job with Bud and June Sample. He had worked on the Sample's cattle ranch for many years and had become like a son to them and a brother to their two daughters, Sally and Pug. Bud was a mentor and advisor to Jay, telling him it was time to start his own herd and register a brand. He wanted the brand to be simple, easy to read, and to burn clean. The Dot Seven (.7) was soon registered to Jay Robinson.",
  },
  {
    text: "Jay married Betty in 1948 and together they bought a small Grade B dairy near Clovis, California. They worked hard, saving every penny to put towards their future. If Jay was fixing fence the staple was taken out, pounded straight, and used again. In 1960 a prime 60 acre permanent pasture place came available; they sold the dairy to buy this land. There Jay & Betty began their commercial cow calf operation east of Sanger, California. Although most of the Holsteins were sold to help pay for the new place, several of the springers came along in the move. Jay took some of these cows and bred them to his beef bulls. He would buy another calf when these cows calved, graft the new calf, and because these cows gave so much milk, they raised two calves easily. These cows did a lot to pay off that ranch.",
  },
  {
    text: "Over time Jay and Betty grew their beef cattle business. Looking to expand their cattle numbers, Jay leased every available piece of land he could find. The cattle were spread out over much of Sanger and Clovis. The cattle were summered on permanent pastures and wintered on native grass. As the operation grew, the Robinson's were offered the opportunity to purchase a ranch just up the road owned by Fred and Lois Hazelton. Because Jay was an integral part of helping Fred with all his cow work over the years, Fred and Lois treated the Robinson's like family. When Fred heard Jay was looking to buy another ranch in the area, the Hazelton's brought a proposal to him. Due to the relationship these two families had, the Hazelton's knew Jay and Betty would responsibly carry on the legacy that they had built, long into the future. What was once the Bar OX Ranch then became part of the Dot Seven Ranch.",
  },
  {
    text: "The Dot Seven Ranch sits in the rolling hills of Eastern Fresno County, about ten miles northeast of downtown Sanger. Lying just below where the oak trees grow, the ranch is full of gentle rolling hills and easy terrain. While the summers are hot, winters are fairly mild. For the most part, there is plenty of rain to grow tall native grass for grazing cattle. Typically the cattle on the Dot Seven grow fat off the native grass with only a few months spent supplementing their diet with hay during the winter. Calving season begins in early fall. The calves grow with the grass and are marketed in late April or early May.",
  },
  {
    text: "Over the years, the breeds of cattle raised on the Dot Seven have changed with the market. The Hazelton's ran Hereford cattle and towards the latter years of their ownership had Shorthorn cattle as well. Jay and Betty first began their business with Herefords but slowly began to include some Gelbveigh and Simmental into the herd. During the 1990s he began to see how popular the Angus breed was becoming and transitioned the herd to mostly Black Angus. Today on the very same land that the Hazelton's once owned, you will see a conventional cow-calf operation that is mostly Black Angus with some small remnants of Simmental in the herd. This is a closed herd and all of the replacement heifers are grown on the ranch.",
  },
  {
    text: "Jay and Betty were always very focused on the next generation. They cultivated a desire to continue the legacy in both their children and grandchildren by instilling a deep pride of the land and the cattle. Jay and Betty's two daughters, Betsy Behlen and Jayne Robinson, the third generation, now own the ranch. Betsy manages the cattle operation with the help of her husband Steve and her two children Brooke Helsel and Brett Behlen and their spouses, the fourth generation.",
  },
];

const HistoryPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <section className="relative py-24 lg:py-32 bg-foreground overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={ranchLandscape}
              alt="Dot Seven Ranch landscape"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative max-w-4xl mx-auto section-padding text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img src={dotSevenCow} alt="Dot Seven brand" className="w-20 h-20 mx-auto mb-6 object-contain" />
              <h1 className="font-display text-4xl font-bold text-white mb-4 leading-tight md:text-2xl">
                History of the <span className="italic">Dot Seven</span> Ranch
              </h1>
              <p className="font-body text-lg text-white/70">Est. 1948 · Sanger, California</p>
            </motion.div>
          </div>
        </section>

        {/* Timeline content */}
        <section className="py-20 lg:py-28 bg-cream">
          <div className="max-w-3xl mx-auto section-padding">
            <div className="space-y-10">
              {historyBlocks.map((block, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: 0.05 }}
                >
                  {/* Decorative dot */}
                  <div className="flex items-start gap-5">
                    <div className="mt-2 flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-barn-red" />
                    </div>
                    <p className="font-body text-base text-muted-foreground leading-relaxed">
                      {block.text}
                    </p>
                  </div>

                  {/* Insert images between certain blocks */}
                  {index === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="mt-10 rounded-lg overflow-hidden"
                    >
                      <img src={brandingIron} alt="Branding day on the ranch" className="w-full aspect-[16/9] object-cover" />
                    </motion.div>
                  )}
                  {index === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="mt-10 rounded-lg overflow-hidden"
                    >
                      <img src={familyPortrait2} alt="Robinson family" className="w-full object-cover" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Closing quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 pt-10 border-t border-barn-red/20 text-center"
            >
              <p className="font-body text-lg text-muted-foreground leading-relaxed italic max-w-2xl mx-auto">
                "We will always continue to adapt with the changes in the market, new technologies and improved management techniques so that we may continue to carry on the Dot Seven Brand for many generations to come."
              </p>
            </motion.div>

            <div className="mt-12 text-center">
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 font-body text-sm text-barn-red hover:text-barn-red/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Our Story
              </Link>
            </div>
          </div>
        </section>

        <CTABanner />
      </div>
      <Footer />
    </div>
  );
};

export default HistoryPage;
