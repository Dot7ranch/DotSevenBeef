import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, ChefHat, ExternalLink, Printer, Minus, Plus, ShoppingCart } from "lucide-react";
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
  const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);
  if (!m) return iso;
  const h = m[1] ? `${m[1]} hr` : "";
  const min = m[2] ? `${m[2]} min` : "";
  return [h, min].filter(Boolean).join(" ");
}

function formatAmount(n: number): string {
  if (n <= 0) return "0";
  const whole = Math.floor(n);
  const dec = n - whole;
  const fracs: [number, string][] = [
    [0.125, "⅛"], [0.25, "¼"], [0.333, "⅓"],
    [0.5, "½"], [0.667, "⅔"], [0.75, "¾"],
  ];
  if (dec < 0.06) return String(whole);
  for (const [val, sym] of fracs) {
    if (Math.abs(dec - val) < 0.07) return whole > 0 ? `${whole} ${sym}` : sym;
  }
  return n.toFixed(1).replace(/\.0$/, "");
}

function scaleIngredient(ingredient: string, ratio: number): string {
  if (Math.abs(ratio - 1) < 0.01) return ingredient;
  return ingredient.replace(/\d+\/\d+|\d+\.?\d*/g, (match) => {
    let value: number;
    if (match.includes("/")) {
      const parts = match.split("/");
      value = Number(parts[0]) / Number(parts[1]);
    } else {
      value = Number(match);
    }
    return formatAmount(value * ratio);
  });
}

const RecipeDetailPage = () => {
  const { slug = "" } = useParams();
  const recipe = recipes.find((r) => r.slug === slug);
  const full = fullData[slug];

  const baseServings = full?.servings ? parseInt(full.servings) || 4 : 4;
  const [servings, setServings] = useState(baseServings);
  const ratio = baseServings > 0 ? servings / baseServings : 1;

  useEffect(() => {
    window.scrollTo(0, 0);
    setServings(parseInt(full?.servings) || 4);
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
      {/* Hidden when printing */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="pt-20 print:pt-0">

        {/* Screen-only hero */}
        <section className="bg-charcoal text-white print:hidden">
          <div className="max-w-5xl mx-auto section-padding py-10 lg:py-14">
            <Link
              to="/recipes"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-body text-sm uppercase tracking-wider mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> All Recipes
            </Link>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-barn-red font-semibold mb-3">
              {recipe.date}
            </p>
            <h1 className="font-display text-4xl font-bold text-white leading-tight md:text-2xl mb-4">
              {recipe.title.toUpperCase()}
            </h1>
            {full?.description && (
              <p className="font-body text-lg text-white/70 max-w-3xl mb-6">{full.description}</p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {/* Meta */}
              <div className="flex flex-wrap gap-5 text-white/80 font-body text-sm">
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

              {/* Serving scaler */}
              {hasStructured && (
                <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-body text-sm text-white/80 uppercase tracking-wide">Servings:</span>
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-barn-red flex items-center justify-center transition-colors"
                  >
                    <Minus size={13} className="text-white" />
                  </button>
                  <span className="font-display text-xl font-bold text-white w-6 text-center">{servings}</span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-barn-red flex items-center justify-center transition-colors"
                  >
                    <Plus size={13} className="text-white" />
                  </button>
                </div>
              )}

              {/* Print button */}
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-barn-red text-white px-4 py-2 rounded font-body text-sm font-semibold uppercase tracking-wider hover:bg-barn-red-dark transition-colors"
              >
                <Printer size={14} /> Print Recipe
              </button>
            </div>
          </div>
        </section>

        {/* Image - screen only */}
        {heroImage && (
          <div className="bg-cream py-6 print:hidden">
            <div className="max-w-2xl mx-auto section-padding">
              <img
                src={heroImage}
                alt={recipe.title}
                className="w-full aspect-[4/3] object-cover rounded-lg"
              />
            </div>
          </div>
        )}

        {/* ── Print-only layout ── */}
        <div className="hidden print:block">
          <div className="text-center mb-5">
            <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '10px', letterSpacing: '0.2em', color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>
              Dot Seven Ranch
            </p>
            <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '26px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>
              {recipe.title.toUpperCase()}
            </h1>
            {full?.description && (
              <p style={{ fontSize: '12px', color: '#555', maxWidth: '480px', margin: '0 auto 10px' }}>{full.description}</p>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '11px', color: '#777', marginBottom: '12px' }}>
              {servings && <span>Serves {servings}</span>}
              {prep && <span>Prep {prep}</span>}
              {cook && <span>Cook {cook}</span>}
            </div>
            {heroImage && (
              <img
                src={heroImage}
                alt={recipe.title}
                style={{ maxHeight: '160px', width: 'auto', objectFit: 'cover', borderRadius: '6px', margin: '0 auto 20px', display: 'block' }}
              />
            )}
          </div>

          {hasStructured && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', fontSize: '12px' }}>
              <div>
                <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '6px', marginBottom: '12px' }}>
                  Ingredients
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {full.ingredients.map((ing, i) => (
                    <li key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', color: '#333' }}>
                      <span style={{ color: '#aaa', flexShrink: 0 }}>▪</span>
                      <span>{scaleIngredient(ing, ratio)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '6px', marginBottom: '12px' }}>
                  Directions
                </h2>
                <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {full.instructions.map((step, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', color: '#333' }}>
                      <span style={{ flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%', background: '#333', color: 'white', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                        {i + 1}
                      </span>
                      <p style={{ margin: 0, lineHeight: 1.5 }}>{step}</p>
                    </li>
                  ))}
                </ol>
                {full.notes && (
                  <div style={{ marginTop: '16px', padding: '10px 12px', borderLeft: '3px solid #ccc', background: '#fafafa' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '4px' }}>Note</p>
                    <p style={{ margin: 0, color: '#444' }}>{full.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {!hasStructured && full?.bodyHtml && (
            <div
              style={{ fontSize: '12px', color: '#333', lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: full.bodyHtml }}
            />
          )}
        </div>

        {/* Screen-only recipe body */}
        <section className="py-12 lg:py-16 bg-cream print:hidden">
          <div className="max-w-5xl mx-auto section-padding">
            {hasStructured ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-[1fr_2fr] gap-12"
              >
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4 uppercase">Ingredients</h2>
                  <ul className="space-y-3">
                    {full.ingredients.map((ing, i) => (
                      <li key={i} className="font-body text-foreground/90 flex gap-3">
                        <span className="text-barn-red mt-1.5 flex-shrink-0">▪</span>
                        <span>{scaleIngredient(ing, ratio)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

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
                  href={(recipe as any).externalUrl}
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

        {/* Shop the cut CTA */}
        {recipe.shopUrl && (
          <div className="print:hidden bg-charcoal py-10">
            <div className="max-w-3xl mx-auto section-padding text-center">
              <p className="font-body text-sm tracking-[0.2em] uppercase text-barn-red font-semibold mb-2">
                Ready to Cook This?
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Get the Exact Cut for This Recipe
              </h2>
              <p className="font-body text-white/70 mb-6">
                All our beef is grass-fed, grain-finished, and shipped fresh from our ranch every Monday.
              </p>
              <Link
                to={recipe.shopUrl}
                className="inline-flex items-center gap-2 bg-barn-red text-white px-8 py-4 rounded font-body text-base font-semibold uppercase tracking-wider hover:bg-barn-red-dark transition-colors"
              >
                <ShoppingCart size={18} />
                {recipe.shopLabel}
              </Link>
            </div>
          </div>
        )}

        <div className="print:hidden">
          <CTABanner />
        </div>
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default RecipeDetailPage;
