import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import beefBox from "@/assets/beef-box.jpg";
import steakCut from "@/assets/steak-cut.jpg";
import groundBeef from "@/assets/ground-beef.jpg";
import roast from "@/assets/roast.jpg";

const categories = [
  { title: "Beef Box Specials", desc: "Curated boxes of our best cuts — perfect for families.", image: beefBox, href: "https://dotsevenranch.com/collections/beef-box-specials", span: "lg:col-span-2 lg:row-span-2" },
  { title: "Signature Steaks", desc: "Ribeyes, sirloins & more.", image: steakCut, href: "https://dotsevenranch.com/collections/steaks", span: "" },
  { title: "Ground Beef & Sausage", desc: "Everyday essentials.", image: groundBeef, href: "https://dotsevenranch.com/collections/ground-beef-sausage", span: "" },
  { title: "Roasts & More", desc: "Sunday dinner favorites.", image: roast, href: "https://dotsevenranch.com/collections/roasts-more", span: "" },
];

const ShopCategories = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-barn-red font-semibold mb-3">Shop Our Selection</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Premium Cuts, <span className="italic">Delivered</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.title}
              href={cat.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-lg ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
            >
              <div className={`relative ${i === 0 ? "aspect-square sm:aspect-[4/3]" : "aspect-[4/3]"} overflow-hidden`}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-primary-foreground mb-1">{cat.title}</h3>
                  <p className="font-body text-sm text-primary-foreground/70 mb-3">{cat.desc}</p>
                  <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-barn-red group-hover:gap-2 transition-all">
                    Shop Now <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopCategories;
