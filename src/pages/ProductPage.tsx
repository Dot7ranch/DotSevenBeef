import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ShoppingCart, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    fetchProductByHandle(handle).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center pt-32 pb-20">
          <Loader2 className="w-8 h-8 animate-spin text-barn-red" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="text-center pt-32 pb-20">
          <h1 className="font-display text-3xl text-charcoal">Product not found</h1>
          <Link to="/" className="font-body text-barn-red hover:underline mt-4 inline-block">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const hasMultipleVariants = variants.length > 1 && !(variants.length === 1 && variants[0].node.title === "Default Title");

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(`${product.title} added to cart`, { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Shipping banner */}
      <div className="mt-16 bg-barn-red text-white py-3 px-6 text-center">
        <p className="font-display text-sm md:text-base font-bold uppercase tracking-wider">
          Flat Rate Shipping — Up to 15 lbs of Beef for One Low Price. Load Up Your Box!
        </p>
      </div>

      <div className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto section-padding">
          {/* Breadcrumb */}
          <nav className="font-body text-sm text-charcoal-light mb-8">
            <Link to="/" className="hover:text-barn-red transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">{product.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="aspect-square rounded-lg overflow-hidden bg-cream-dark mb-4">
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-charcoal-light font-body">No image</div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        idx === selectedImage ? "border-barn-red" : "border-transparent"
                      }`}
                    >
                      <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal uppercase tracking-wider mb-4">
                {product.title}
              </h1>

              <p className="font-display text-2xl text-barn-red font-bold mb-6">
                ${selectedVariant ? parseFloat(selectedVariant.price.amount).toFixed(2) : parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
              </p>

              {/* Variant selection */}
              {hasMultipleVariants && product.options?.map((option: any, optIdx: number) => (
                <div key={optIdx} className="mb-6">
                  <label className="font-body text-sm font-semibold uppercase tracking-wider text-charcoal mb-2 block">
                    {option.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v: any, vIdx: number) => {
                      const optionValue = v.node.selectedOptions?.find((o: any) => o.name === option.name)?.value;
                      if (!optionValue) return null;
                      // Only show unique values for this option
                      const alreadyShown = variants.slice(0, vIdx).some((prev: any) =>
                        prev.node.selectedOptions?.find((o: any) => o.name === option.name)?.value === optionValue
                      );
                      if (alreadyShown) return null;

                      const isSelected = selectedVariant?.selectedOptions?.find((o: any) => o.name === option.name)?.value === optionValue;
                      return (
                        <button
                          key={`${optIdx}-${optionValue}`}
                          onClick={() => {
                            const matchIdx = variants.findIndex((vv: any) =>
                              vv.node.selectedOptions?.find((o: any) => o.name === option.name)?.value === optionValue
                            );
                            if (matchIdx >= 0) setSelectedVariantIdx(matchIdx);
                          }}
                          className={`px-4 py-2 rounded font-body text-sm transition-colors ${
                            isSelected
                              ? "bg-charcoal text-primary-foreground"
                              : "bg-cream-dark text-charcoal hover:bg-charcoal/10"
                          }`}
                        >
                          {optionValue}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div className="mb-6">
                <label className="font-body text-sm font-semibold uppercase tracking-wider text-charcoal mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded border border-charcoal/20 flex items-center justify-center hover:bg-charcoal/10"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-body text-lg w-10 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded border border-charcoal/20 flex items-center justify-center hover:bg-charcoal/10"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={isLoading || !selectedVariant?.availableForSale}
                className="w-full inline-flex items-center justify-center gap-2 bg-barn-red text-primary-foreground px-8 py-4 rounded font-body text-base font-semibold uppercase tracking-wider hover:bg-barn-red-dark transition-all duration-300 disabled:opacity-50 mb-6"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    {selectedVariant?.availableForSale ? "Add to Cart" : "Sold Out"}
                  </>
                )}
              </button>

              {/* Description */}
              {product.descriptionHtml ? (
                <div
                  className="font-body text-charcoal-light leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : product.description ? (
                <p className="font-body text-charcoal-light leading-relaxed">{product.description}</p>
              ) : null}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
