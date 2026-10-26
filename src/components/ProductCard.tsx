import { Link } from "react-router-dom";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import StarRating, { parseRating } from "@/components/StarRating";

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { node } = product;
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const selectedVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount).toFixed(2);
  const isSoldOut = node.variants.edges.every(({ node: variant }) => !variant.availableForSale);
  const rating = parseRating(node);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(`${node.title} added to cart`, { position: "top-center" });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="bg-cream-dark rounded-lg overflow-hidden hover-lift">
        <div className="relative aspect-square overflow-hidden bg-charcoal/5">
          {isSoldOut && (
            <span className="absolute top-2 left-2 z-10 bg-charcoal/90 text-primary-foreground px-2 py-1 rounded text-[10px] font-body font-semibold uppercase tracking-wider">
              Sold out
            </span>
          )}
          {image ? (
            <img loading="lazy" decoding="async"
              src={image.url}
              alt={image.altText || node.title}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isSoldOut ? "opacity-60" : ""}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-charcoal-light font-body">
              No image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-display text-sm uppercase tracking-wider text-charcoal truncate">{node.title}</h3>
          {rating ? <StarRating rating={rating} className="mt-1 h-4" /> : <div className="mt-1 h-4" aria-hidden="true" />}
          <div className="flex items-center justify-between mt-2">
            <p className="font-body font-semibold text-barn-red text-lg">${price}</p>
            <button
              onClick={handleAddToCart}
              disabled={isSoldOut || isLoading || !selectedVariant?.availableForSale}
              className="inline-flex items-center gap-1 bg-charcoal text-primary-foreground px-3 py-1.5 rounded text-xs font-body font-semibold uppercase tracking-wider hover:bg-barn-red transition-colors disabled:opacity-50"
            >
              {isSoldOut ? (
                "Sold out"
              ) : (
                <>
                  {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <ShoppingCart className="w-3 h-3" />}
                  Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
