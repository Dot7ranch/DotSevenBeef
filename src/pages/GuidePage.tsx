import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { guides } from "@/data/guides";
import { article, breadcrumbs, faqPage } from "@/lib/structuredData";
import NotFound from "./NotFound";

const GuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return <NotFound />;

  const path = `/guides/${guide.slug}`;
  const others = guides.filter((g) => g.slug !== guide.slug);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={guide.title}
        description={guide.description}
        path={path}
        type="article"
        jsonLd={[
          article({ path, headline: guide.title, description: guide.description, datePublished: guide.datePublished }),
          faqPage(guide.faqs),
          breadcrumbs([
            { name: "Beef Guides", path: "/guides" },
            { name: guide.title, path },
          ]),
        ]}
      />
      <Navbar />
      <main id="main-content" className="pt-28 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <nav className="font-body text-sm text-charcoal-light mb-6">
            <Link to="/" className="hover:text-barn-red transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/guides" className="hover:text-barn-red transition-colors">Beef Guides</Link>
          </nav>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{guide.title}</h1>

          {guide.body}

          <div className="mt-10">
            <Link
              to={guide.cta.href}
              className="inline-flex items-center gap-2 bg-barn-red text-primary-foreground px-6 py-3 rounded font-body font-semibold uppercase tracking-wider text-sm hover:bg-barn-red/90 transition-colors"
            >
              {guide.cta.label} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <section className="mt-16 border-t border-border pt-10" aria-labelledby="quick-answers">
            <h2 id="quick-answers" className="font-display text-2xl font-bold text-foreground mb-6">
              Quick answers
            </h2>
            <dl className="space-y-5">
              {guide.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-body font-semibold text-foreground mb-1">{faq.question}</dt>
                  <dd className="font-body text-muted-foreground leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          {others.length > 0 && (
            <section className="mt-16 border-t border-border pt-10" aria-labelledby="more-guides">
              <h2 id="more-guides" className="font-display text-2xl font-bold text-foreground mb-6">
                More beef guides
              </h2>
              <ul className="space-y-3">
                {others.map((g) => (
                  <li key={g.slug}>
                    <Link to={`/guides/${g.slug}`} className="font-body text-barn-red hover:underline">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default GuidePage;
