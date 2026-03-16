import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CartDrawer } from "@/components/CartDrawer";
import logoRed from "@/assets/logo-text-red.png";

const shopBeefLinks = [
{ label: "Beef Box Specials", href: "/collections/beef-box-specials" },
{ label: "Shop by the Cut", href: "/collections/build-your-own-box" },
{ label: "Signature Steaks", href: "/collections/steaks" },
{ label: "Ground Beef & Sausage", href: "/collections/ground-beef-sausage" },
{ label: "Roasts & More", href: "/collections/roasts-more" },
{ label: "Offal Cuts", href: "/collections/offal-cuts" },
{ label: "Beef Shares", href: "/collections/beef-shares" }];


const navLinks = [
{ label: "Recipes", href: "https://dotsevenranch.com/blogs/dinner-on-the-dot", external: true },
{ label: "Ranch Swag", href: "/collections/ranch-swag" },
{ label: "Our Story", href: "/our-story" },
{ label: "Contact", href: "https://dotsevenranch.com/pages/contact-the-team", external: true }];


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 bg-primary">
        <Link to="/" className="flex items-center">
          <img alt="Dot Seven Ranch" className="h-8 md:h-10 w-auto" src="/lovable-uploads/7ae91d95-dfac-40ac-9c80-3e44e7d849a2.png" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Shop Beef dropdown */}
          <div className="relative group">
            <button className="font-body text-sm font-medium tracking-widest uppercase text-primary-foreground/80 hover:text-barn-red transition-colors duration-200 inline-flex items-center gap-1">
              Shop Beef <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-charcoal rounded-lg shadow-xl border border-primary-foreground/10 py-2 min-w-[220px]">
                {shopBeefLinks.map((link) =>
                <Link
                  key={link.label}
                  to={link.href}
                  className="block px-4 py-2 font-body text-sm text-primary-foreground/80 hover:text-barn-red hover:bg-primary-foreground/5 transition-colors">
                  
                    {link.label}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {navLinks.map((link) =>
          link.external ?
          <a
            key={link.label}
            href={link.href}
            className="font-body text-sm font-medium tracking-widest uppercase text-primary-foreground/80 hover:text-barn-red transition-colors duration-200">
            
                {link.label}
              </a> :

          <Link
            key={link.label}
            to={link.href}
            className="font-body text-sm font-medium tracking-widest uppercase text-primary-foreground/80 hover:text-barn-red transition-colors duration-200">
            
                {link.label}
              </Link>

          )}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <CartDrawer />
          <Link
            to="/collections/build-your-own-box"
            className="inline-flex items-center gap-2 bg-barn-red text-primary-foreground px-5 py-2.5 rounded font-body text-sm font-semibold uppercase tracking-wider hover:bg-barn-red-dark transition-colors">
            
            Order Now
          </Link>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-4">
          <CartDrawer />
          <button onClick={() => setIsOpen(!isOpen)} className="text-primary-foreground">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="lg:hidden bg-charcoal overflow-hidden">
          
            <div className="flex flex-col px-6 pb-6 gap-2">
              <button
              onClick={() => setShopOpen(!shopOpen)}
              className="font-body text-sm font-medium tracking-widest uppercase text-primary-foreground/80 hover:text-barn-red transition-colors py-3 border-b border-primary-foreground/10 flex items-center justify-between">
              
                Shop Beef <ChevronDown size={14} className={`transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {shopOpen &&
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pl-4">
                    {shopBeefLinks.map((link) =>
                <Link
                  key={link.label}
                  to={link.href}
                  className="block font-body text-sm text-primary-foreground/70 hover:text-barn-red py-2"
                  onClick={() => setIsOpen(false)}>
                  
                        {link.label}
                      </Link>
                )}
                  </motion.div>
              }
              </AnimatePresence>

              {navLinks.map((link) =>
            link.external ?
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-medium tracking-widest uppercase text-primary-foreground/80 hover:text-barn-red transition-colors py-3 border-b border-primary-foreground/10"
              onClick={() => setIsOpen(false)}>
              
                    {link.label}
                  </a> :

            <Link
              key={link.label}
              to={link.href}
              className="font-body text-sm font-medium tracking-widest uppercase text-primary-foreground/80 hover:text-barn-red transition-colors py-3 border-b border-primary-foreground/10"
              onClick={() => setIsOpen(false)}>
              
                    {link.label}
                  </Link>

            )}

              <Link
              to="/collections/build-your-own-box"
              className="inline-flex items-center justify-center gap-2 bg-barn-red text-primary-foreground px-5 py-3 rounded font-body text-sm font-semibold uppercase tracking-wider mt-2"
              onClick={() => setIsOpen(false)}>
              
                Order Now
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

};

export default Navbar;