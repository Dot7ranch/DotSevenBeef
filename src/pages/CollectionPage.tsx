import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { fetchCollectionByHandle, type ShopifyProduct } from "@/lib/shopify";

const CollectionPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    fetchCollectionByHandle(handle, 50).then((collection) => {
      if (collection) {
        setCollectionTitle(collection.title);
        setCollectionDescription(collection.description || "");
        setProducts(collection.products.edges.map((e: { node: ShopifyProduct["node"] }) => ({ node: e.node })));
      }
      setLoading(false);
    });
  }, [handle]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto section-padding">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="font-body text-sm text-charcoal-light">
              <Link to="/" className="hover:text-barn-red transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-charcoal">{collectionTitle || "Collection"}</span>
            </nav>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal uppercase tracking-wider mb-3">
              {collectionTitle}
            </h1>
            {collectionDescription && (
              <p className="font-body text-lg text-charcoal-light max-w-2xl">{collectionDescription}</p>
            )}
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-barn-red" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-lg text-charcoal-light">No products found in this collection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CollectionPage;
