import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, ChefHat, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { recipes } from "@/data/recipes";
import recipesFull from "@/data/recipes-full.json";

const fullData: Record<string, {
  name: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  notes: string;
  bodyHtml: string;
  slug: string;
}> = recipesFull as any;

function formatDuration(iso: string) {
  if (!iso) return "";
  // ISO 8601 like PT30M, PT1H, PT2H30M
  const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);
  if (!m) return iso;
  const h = m[1] ? `${m[1]} hr` : "";
  const min = m[2] ? `${m[2]} min` : "";
  return [h, min].filter(Boolean).join(" ");
}

const RecipeDetailPage = () => {
  const { slug = "" } = useParams();
  const recipe = recipes.find((r) => r.slug === slug);
  const full = fullData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!recipe) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-24 text-center section-padding">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Recipe not found</h1>
          <Link to="/recipes" className="text-barn-red font-semibold inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to recipes
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const hasStructured = full && (full.ingredients.length > 0 || full.instructions.length > 0);
  const heroImage = recipe.image || full?.image;
  const prep = formatDuration(full?.prepTime || "");
  const cook = formatDuration(full?.cookTime || "");

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <section className="bg-charcoal text-white">
          <div className="max-w-5xl mx-auto section-padding py-12 lg:py-16">
            <Link
              to="/recipes"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-body text-sm uppercase tracking-wider mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> All Recipes
            </Link>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-barn-red font-semibold mb-3">
              {recipe.date}
            </p>
            <h1 className="font-display text-4xl font-bold text-white leading-tight md:text-2xl">
              {recipe.title.toUpperCase()}
            </h1>
            {full?.description && (
              <p className="font-body text-lg text-white/70 mt-4 max-w-3xl">{full.description}</p>
            )}
            {(full?.servings || prep || cook) && (
              <div className="flex flex-wrap gap-6 mt-6 text-white/80 font-body text-sm">
                {full?.servings && (
                  <span className="inline-flex items-center gap-2"><Users size={16} className="text-barn-red" /> Serves {full.servings}</span>
                )}
                {prep && (
                  <span className="inline-flex items-center gap-2"><Clock size={16} className="text-barn-red" /> Prep {prep}</span>
                )}
                {cook && (
                  <span className="inline-flex items-center gap-2"><ChefHat size={16} className="text-barn-red" /> Cook {cook}</span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Image */}
        {heroImage && (
          <div className="bg-cream py-6">
            <div className="max-w-2xl mx-auto section-padding">
              <img
                src={heroImage}
                alt={recipe.title}
                className="w-full aspect-[4/3] object-cover rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <section className="py-16 lg:py-20 bg-cream">
          <div className="max-w-5xl mx-auto section-padding">
            {hasStructured ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-[1fr_2fr] gap-12"
              >
                {/* Ingredients */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4 uppercase">Ingredients</h2>
                  <ul className="space-y-3">
                    {full.ingredients.map((ing, i) => (
                      <li key={i} className="font-body text-foreground/90 flex gap-3">
                        <span className="text-barn-red mt-1.5 flex-shrink-0">▪</span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Directions */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4 uppercase">Directions</h2>
                  <ol className="space-y-5">
                    {full.instructions.map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-barn-red text-white font-display font-bold flex items-center justify-center text-sm">
                          {i + 1}
                        </span>
                        <p className="font-body text-foreground/90 leading-relaxed pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>

                  {full.notes && (
                    <div className="mt-10 p-5 bg-white border-l-4 border-barn-red rounded">
                      <p className="font-body text-xs font-semibold uppercase tracking-widest text-barn-red mb-2">Recipe Note</p>
                      <p className="font-body text-foreground/80 leading-relaxed">{full.notes}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="max-w-3xl mx-auto">
                {full?.bodyHtml ? (
                  <div
                    className="prose prose-lg max-w-none font-body text-foreground/90 [&_img]:rounded-lg [&_img]:my-6 [&_p]:mb-4"
                    dangerouslySetInnerHTML={{ __html: full.bodyHtml }}
                  />
                ) : (
                  <p className="font-body text-foreground/80">{recipe.description}</p>
                )}
                <a
                  href={recipe.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 text-barn-red font-body text-sm font-semibold uppercase tracking-wider hover:underline"
                >
                  View original post <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </section>

        <CTABanner />
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetailPage;
