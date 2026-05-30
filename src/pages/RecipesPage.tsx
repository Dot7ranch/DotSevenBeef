import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { recipes } from "@/data/recipes";

const RecipesPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <section className="py-8 lg:py-10 bg-charcoal text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto section-padding"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-barn-red font-semibold mb-3">
              Beef Recipes
            </p>
            <h1 className="font-display text-4xl font-bold text-white mb-4 leading-tight md:text-2xl">
              Dinner on the Dot
            </h1>
            <p className="font-body text-lg text-white/60 max-w-xl mx-auto">
              Simple, delicious recipes featuring our ranch-raised beef. From weeknight dinners to weekend grilling — we've got you covered.
            </p>
          </motion.div>
        </section>

        {/* Recipe Grid */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto section-padding">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe, index) => (
                <motion.div
                  key={recipe.slug + index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: (index % 3) * 0.08 }}
                >
                  <Link
                    to={`/recipes/${recipe.slug}`}
                    className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="p-5">
                      <p className="font-body text-xs tracking-widest uppercase text-barn-red mb-2">
                        {recipe.date}
                      </p>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-barn-red transition-colors">
                        {recipe.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {recipe.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 mt-3 font-body text-xs font-semibold uppercase tracking-wider text-barn-red">
                        View Recipe <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </div>
      <Footer />
    </div>
  );
};

export default RecipesPage;
