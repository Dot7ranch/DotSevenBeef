import { motion } from "framer-motion";
import { Leaf, Truck, ShieldCheck, Heart } from "lucide-react";

const props = [
  { 
    icon: Leaf, 
    title: "Sustainably Raised", 
    desc: `Pasture-raised with environmental
stewardship at the core of everything we do.` 
  },
  { 
    icon: ShieldCheck, 
    title: "No Antibiotics or Added Hormones", 
    desc: `Clean, natural beef — the way it was meant
to be. Nothing artificial, ever.` 
  },
  { 
    icon: Truck, 
    title: "Shipped Fresh Weekly", 
    desc: "Beef boxes ship every Tuesday. Local pickup available at Longhorn Feed & Supply." 
  },
  { 
    icon: Heart, 
    title: "Family Owned", 
    desc: `Four generations of ranching heritage. We
take pride in every cut we produce.` 
  }
];


const ValueProps = () => {
  return (
    <section className="bg-muted lg:py-20 border-0 py-[40px]">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {props.map((item, i) =>
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center border border-border rounded-lg p-6 h-full">
            
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-barn-red/20 mb-4">
                <item.icon size={22} className="text-barn-red" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{item.desc}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default ValueProps;
