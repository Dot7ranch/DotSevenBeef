import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { quote: "Love the beef. Nothing beats it when it comes to flavor. I need to order more!", author: "Victor A." },
  { quote: "Wow! What an awesome ribeye! It was soooo good. We completed the meal with scalloped potatoes and brussel sprouts. Yum!", author: "Andrea C." },
  { quote: "We had our top sirloin steaks last night and they were fantastic... super delicious!", author: "Scott & Maggie T." },
  { quote: "What a difference between the beef we usually buy at a grocery store and this delicious cut from a local rancher. So fresh, so tender, so flavorful!", author: "Heidi H." },
  { quote: "We love Dot Seven Beef as every cut has soooo much flavor and just melts in your mouth!", author: "Josh L." },
  { quote: "Picked up some of your broth & bouillon & it was so delicious! I made soup with it. Can't wait to buy more!", author: "Sarah S." },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="lg:py-28 bg-background py-[40px]">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-body text-sm tracking-[0.3em] uppercase text-barn-red font-semibold mb-3">
              Testimonials
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              What Our <span className="italic">Customers</span> Say
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-4 px-4"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="min-w-[300px] md:min-w-[380px] flex-shrink-0 snap-start bg-card rounded-lg p-6 border border-border hover-lift"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-warm-gold text-warm-gold" />
                ))}
              </div>
              <p className="font-body text-base text-foreground leading-relaxed mb-4 italic">
                "{t.quote}"
              </p>
              <p className="font-body text-sm font-semibold text-muted-foreground">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
