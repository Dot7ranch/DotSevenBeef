import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
{ quote: "Love the beef. Nothing beats it when it comes to flavor. I need to order more!", author: "Victor A." },
{ quote: "Wow! What an awesome ribeye! It was soooo good. We completed the meal with scalloped potatoes and brussel sprouts. Yum!", author: "Andrea C." },
{ quote: "We had our top sirloin steaks last night and they were fantastic... super delicious!", author: "Scott & Maggie T." },
{ quote: "What a difference between the beef we usually buy at a grocery store and this delicious cut from a local rancher. So fresh, so tender, so flavorful!", author: "Heidi H." },
{ quote: "We love Dot Seven Beef as every cut has soooo much flavor and just melts in your mouth!", author: "Josh L." },
{ quote: "Picked up some of your broth & bouillon & it was so delicious! I made soup with it. Can't wait to buy more!", author: "Sarah S." }];


const Testimonials = () => {
  return (
    <section className="lg:py-28 bg-background py-[40px]">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14">
          
          <p className="font-body text-sm tracking-[0.3em] uppercase text-barn-red font-semibold mb-3">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            What Our <span className="italic">Customers</span> Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) =>
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-lg p-6 border border-border hover-lift">
            
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) =>
              <Star key={j} size={14} className="fill-warm-gold text-warm-gold" />
              )}
              </div>
              <p className="font-body text-base text-foreground leading-relaxed mb-4 italic">"{t.quote}"</p>
              <p className="font-body text-sm font-semibold text-muted-foreground">— {t.author}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default Testimonials;