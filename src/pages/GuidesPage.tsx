import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { guides } from "@/data/guides";
import { breadcrumbs, SITE_URL } from "@/lib/structuredData";

const GuidesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Beef Guides"
        description="Straight answers from our family ranch about buying, storing, and shipping beef, from freezer space for a quarter beef to how our cattle are raised."
        path="/guides"
        jsonLd={[
          breadcrumbs([{ name: "Beef Guides", path: "/guides" }]),
          {
            "@type": "ItemList",
            name: "Dot Seven Ranch Beef Guides",
            itemListElement: guides.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/guides/${g.slug}`,
            })),
          },
        ]}
      />
      <Navbar />
      <main id="main-content" className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4 text-center md:text-2xl">Beef Guides</h1>
          <p className="text-muted-foreground text-center mb-12 font-body text-lg">
            Straight answers to the questions we get asked most.
          </p>
          <ul className="space-y-6">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  to={`/guides/${g.slug}`}
                  className="group block bg-card border border-border rounded-lg p-6 hover:border-barn-red transition-colors"
                >
                  <h2 className="font-display text-xl font-bold text-foreground group-hover:text-barn-red transition-colors mb-2">
                    {g.title}
                  </h2>
                  <p className="font-body text-muted-foreground leading-relaxed mb-3">{g.description}</p>
                  <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-barn-red">
                    Read the guide <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuidesPage;
