import { useState, useCallback, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const search = useCallback((q: string) => {
    clearTimeout(timerRef.current);
    if (!q.trim()) { setResults([]); return; }
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const products = await fetchProducts(6, q);
        setResults(products);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    search(e.target.value);
  };

  const close = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Search products"
        aria-expanded={isOpen}
        className="text-white/80 hover:text-barn-red transition-colors"
      >
        <Search size={18} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={close} aria-hidden="true" />

          {/* Dropdown */}
          <div className="absolute right-0 top-9 z-50 w-80 bg-charcoal border border-white/10 rounded-lg shadow-2xl overflow-hidden">
            {/* Input row */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <Search size={15} className="text-white/40 flex-shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={handleChange}
                placeholder="Search cuts & products..."
                aria-label="Search products"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 font-body text-sm focus:outline-none"
              />
              {loading && <Loader2 size={14} className="animate-spin text-white/40 flex-shrink-0" aria-hidden="true" />}
              <button onClick={close} aria-label="Close search" className="text-white/40 hover:text-white transition-colors">
                <X size={15} />
              </button>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="max-h-72 overflow-y-auto">
                {results.map((product) => (
                  <Link
                    key={product.node.id}
                    to={`/product/${product.node.handle}`}
                    onClick={close}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                  >
                    {product.node.images.edges[0]?.node && (
                      <img
                        src={product.node.images.edges[0].node.url}
                        alt={product.node.images.edges[0].node.altText || product.node.title}
                        className="w-10 h-10 object-cover rounded flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-white truncate">{product.node.title}</p>
                      <p className="font-body text-xs text-barn-red font-semibold">
                        ${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {query.trim() && !loading && results.length === 0 && (
              <p className="px-4 py-5 font-body text-sm text-white/50 text-center">
                No products found for "{query}"
              </p>
            )}

            {!query.trim() && (
              <p className="px-4 py-4 font-body text-xs text-white/40 text-center">
                Type to search beef cuts & products
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
