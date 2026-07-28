import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CartDrawer } from "@/components/CartDrawer";
import SearchBar from "@/components/SearchBar";

const shopBeefLinks = [
  { label: "Shop All Products", href: "/shop-all" },
  { label: "¼ Beef Share", href: "/product/1-4-beef-share", featured: true },
  { label: "Beef Box Specials", href: "/collections/beef-box-specials" },
  { label: "Shop by the Cut", href: "/collections/build-your-own-box" },
  { label: "Signature Steaks", href: "/collections/steaks" },
  { label: "Ground Beef & Sausage", href: "/collections/ground-beef-sausage" },
  { label: "Roasts & More", href: "/collections/roasts-more" },
  { label: "Offal Cuts", href: "/collections/offal-cuts" },
] as { label: string; href: string; featured?: boolean }[];

const navLinks = [
  { label: "Dinner on the Dot", href: "/recipes" },
  { label: "Ranch Swag", href: "/collections/ranch-swag" },
  { label: "Our Story", href: "/our-story" },
  { label: "FAQ", href: "/faq" },
  { label: "Return Your Box", href: "/return-your-box" },
  { label: "Contact", href: "https://dotsevenranch.com/pages/contact-the-team", external: true },
];

const Navbar = ({ fixed: isFixed = true }: { fixed?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <nav className={`${isFixed ? "fixed top-0 left-0 right-0 z-50" : "relative w-full"} bg-charcoal shadow-lg`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <Link to="/" className="flex items-center flex-shrink-0">
          <img alt="Dot Seven Ranch" className="h-8 md:h-10 w-auto" src="/uploads/7ae91d95-dfac-40ac-9c80-3e44e7d849a2.png" />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-7">
          <div className="relative group">
            <button
              className="font-body text-sm font-medium tracking-wide uppercase text-white/80 hover:text-barn-red transition-colors duration-200 inline-flex items-center gap-1 whitespace-nowrap"
              aria-haspopup="menu"
            >
              Shop Beef <ChevronDown size={14} aria-hidden="true" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div role="menu" className="bg-charcoal rounded-lg shadow-xl border border-white/10 py-2 min-w-[220px]">
                {shopBeefLinks.map((link) =>
                  link.featured ? (
                    <div key={link.label}>
                      <div className="px-4 pt-2 pb-1">
                        <p className="font-body text-xs uppercase tracking-widest text-white/30">Buy in Bulk</p>
                      </div>
                      <Link
                        to={link.href}
                        className="block px-4 py-2 font-body text-sm font-semibold text-barn-red hover:bg-white/5 transition-colors border-b border-white/10 mb-1"
                      >
                        {link.label}
                      </Link>
                    </div>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block px-4 py-2 font-body text-sm text-white/80 hover:text-barn-red hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm font-medium tracking-wide uppercase text-white/80 hover:text-barn-red transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="font-body text-sm font-medium tracking-wide uppercase text-white/80 hover:text-barn-red transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop search + cart */}
        <div className="hidden lg:flex items-center gap-5 ml-8">
          <SearchBar />
          <CartDrawer />
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-4">
          <SearchBar />
          <CartDrawer />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            id="mobile-menu"
          className="lg:hidden bg-charcoal overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col px-6 pb-6 gap-2">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="font-body text-sm font-medium tracking-wide uppercase text-white/80 hover:text-barn-red transition-colors py-3 border-b border-white/10 flex items-center justify-between"
              >
                Shop Beef <ChevronDown size={14} className={`transition-transform ${shopOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {shopOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pl-4">
                    {shopBeefLinks.map((link) =>
                      link.featured ? (
                        <div key={link.label}>
                          <p className="font-body text-xs uppercase tracking-widest text-white/30 pt-2 pb-1">Buy in Bulk</p>
                          <Link
                            to={link.href}
                            className="block font-body text-sm font-semibold text-barn-red py-2 border-b border-white/10 mb-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </div>
                      ) : (
                        <Link
                          key={link.label}
                          to={link.href}
                          className="block font-body text-sm text-white/70 hover:text-barn-red py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-body text-sm font-medium tracking-wide uppercase text-white/80 hover:text-barn-red transition-colors py-3 border-b border-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <div key={link.label}>
                    <Link
                      to={link.href}
                      className="font-body text-sm font-medium tracking-wide uppercase text-white/80 hover:text-barn-red transition-colors py-3 border-b border-white/10 block"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.label === "Our Story" && (
                      <Link
                        to="/history"
                        className="block font-body text-sm text-white/70 hover:text-barn-red py-2 pl-4"
                        onClick={() => setIsOpen(false)}
                      >
                        Ranch History
                      </Link>
                    )}
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
