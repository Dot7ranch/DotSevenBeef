import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect, useRef } from "react";
import { fetchFeaturedReviews } from "@/lib/judgeme";
import { getPrerenderData } from "@/lib/prerenderData";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  rating: number;
  product?: string;
}

// Shown only if Judge.me can't be reached.
const fallbackTestimonials: Testimonial[] = [
  { quote: "Love the beef. Nothing beats it when it comes to flavor. I need to order more!", author: "Victor A." },
  { quote: "Wow! What an awesome ribeye! It was soooo good. We completed the meal with scalloped potatoes and brussel sprouts. Yum!", author: "Andrea C." },
  { quote: "We had our top sirloin steaks last night and they were fantastic... super delicious!", author: "Scott & Maggie T." },
  { quote: "What a difference between the beef we usually buy at a grocery store and this delicious cut from a local rancher. So fresh, so tender, so flavorful!", author: "Heidi H." },
  { quote: "We love Dot Seven Beef as every cut has soooo much flavor and just melts in your mouth!", author: "Josh L." },
  { quote: "Picked up some of your broth & bouillon & it was so delicious! I made soup with it. Can't wait to buy more!", author: "Sarah S." },
].map((t) => ({ ...t, id: t.author, rating: 5 }));

const fromJudgeMe = (reviews: Awaited<ReturnType<typeof fetchFeaturedReviews>>): Testimonial[] =>
  reviews.map((r) => ({
    id: r.id,
    quote: r.body || r.title,
    author: r.author,
    rating: r.rating,
    product: r.product,
  }));

const Testimonials = () => {
  const seeded = getPrerenderData().featuredReviews;
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    seeded?.length ? fromJudgeMe(seeded) : fallbackTestimonials
  );
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayPlugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: false }));

  // Judge.me's featured carousel is the source of truth; refresh it on every visit.
  useEffect(() => {
    fetchFeaturedReviews()
      .then((reviews) => {
        if (reviews.length) setTestimonials(fromJudgeMe(reviews));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="lg:py-14 bg-background py-8">
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
              onClick={() => api?.scrollPrev()}
              aria-label="Previous testimonial"
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              aria-label="Next testimonial"
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        <Carousel
          setApi={setApi}
          plugins={[autoplayPlugin.current]}
          opts={{ align: "start", loop: true }}
          className="w-full"
          aria-label="Customer testimonials"
          aria-live="polite"
        >
          <CarouselContent className="-ml-5">
            {testimonials.map((t, i) => (
              <CarouselItem key={t.id} className="pl-5 basis-[85%] md:basis-[45%] lg:basis-[33%]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-card rounded-lg p-6 border border-border hover-lift h-full"
                >
                  <div className="flex gap-0.5 mb-4" role="img" aria-label={`${t.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        aria-hidden="true"
                        className={j < t.rating ? "fill-warm-gold text-warm-gold" : "text-border"}
                      />
                    ))}
                  </div>
                  <p className="font-body text-base text-foreground leading-relaxed mb-4 italic line-clamp-6">
                    "{t.quote}"
                  </p>
                  <p className="font-body text-sm font-semibold text-muted-foreground">— {t.author}</p>
                  {t.product && <p className="font-body text-xs text-muted-foreground mt-1">{t.product}</p>}
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-barn-red" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
