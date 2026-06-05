import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import beefBox from "@/assets/beef-box.jpg";
import steakCut from "@/assets/steak-cut.jpg";
import groundBeef from "@/assets/ground-beef.jpg";
import roast from "@/assets/roast.jpg";
import offalCuts from "@/assets/offal-cuts.jpg";
const BEEF_SHARE_IMAGE = "https://cdn.shopify.com/s/files/1/0584/0411/0525/files/OneFullBeefShare.png?v=1778879970";

const categories = [
{ title: "¼ Beef Share", desc: "Fill your freezer direct from our ranch — 150 lbs of custom-cut beef.", image: BEEF_SHARE_IMAGE, href: "/product/1-4-beef-share" },
{ title: "Beef Box Specials", desc: "Curated boxes of our best cuts — perfect for families.", image: beefBox, href: "/collections/beef-box-specials" },
{ title: "Shop by the Cut", desc: "Build your own box with exactly the cuts you want.", image: roast, href: "/collections/build-your-own-box" },
{ title: "Signature Steaks", desc: "Ribeyes, sirloins & more — our best cuts.", image: steakCut, href: "/collections/steaks" },
];


const ShopCategories = () => {
  return (
    <section className="lg:py-14 bg-background py-8">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6">

          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Shop Our Best Sellers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) =>
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}>

              <Link to={cat.href} className="group block relative overflow-hidden rounded-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-xl lg:text-2xl font-bold text-primary-foreground mb-1">{cat.title}</h3>
                    <p className="font-body text-sm text-primary-foreground/70 mb-3">{cat.desc}</p>
                    <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-barn-red group-hover:gap-2 transition-all">
                      Shop Now <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default ShopCategories;