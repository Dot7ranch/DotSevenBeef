import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoRed from "@/assets/logo-text-red.png";

const navLinks = [
  { label: "Shop Beef", href: "https://dotsevenranch.com/collections/build-your-own-box" },
  { label: "Beef Boxes", href: "https://dotsevenranch.com/collections/beef-box-specials" },
  { label: "Beef Shares", href: "https://dotsevenranch.com/collections/beef-shares" },
  { label: "Recipes", href: "https://dotsevenranch.com/blogs/dinner-on-the-dot" },
  { label: "Our Story", href: "#story" },
  { label: "Contact", href: "https://dotsevenranch.com/pages/contact-the-team" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="https://dotsevenranch.com" className="flex items-center">
          <img src={logoRed} alt="Dot Seven Ranch" className="h-8 md:h-10 w-auto" />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-medium tracking-widest uppercase text-primary-foreground/80 hover:text-barn-red transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://dotsevenranch.com/collections/build-your-own-box"
            className="inline-flex items-center gap-2 bg-barn-red text-primary-foreground px-5 py-2.5 rounded font-body text-sm font-semibold uppercase tracking-wider hover:bg-barn-red-dark transition-colors"
          >
            <ShoppingCart size={16} />
            Order Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-primary-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-charcoal overflow-hidden"
          >
            <div className="flex flex-col px-6 pb-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm font-medium tracking-widest uppercase text-primary-foreground/80 hover:text-barn-red transition-colors py-2 border-b border-primary-foreground/10"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://dotsevenranch.com/collections/build-your-own-box"
                className="inline-flex items-center justify-center gap-2 bg-barn-red text-primary-foreground px-5 py-3 rounded font-body text-sm font-semibold uppercase tracking-wider mt-2"
              >
                <ShoppingCart size={16} />
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
