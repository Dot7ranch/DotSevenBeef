import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal py-16">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-xl font-bold text-primary-foreground mb-4">
              DOT SEVEN <span className="text-barn-red">RANCH</span>
            </h3>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
              Four generations of raising premium beef with pride, sustainability, and an unwavering commitment to quality.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/40 font-semibold mb-4">Shop</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Beef Box Specials", href: "https://dotsevenranch.com/collections/beef-box-specials" },
                { label: "Signature Steaks", href: "https://dotsevenranch.com/collections/steaks" },
                { label: "Ground Beef & Sausage", href: "https://dotsevenranch.com/collections/ground-beef-sausage" },
                { label: "Roasts & More", href: "https://dotsevenranch.com/collections/roasts-more" },
                { label: "Beef Shares", href: "https://dotsevenranch.com/collections/beef-shares" },
                { label: "Gift Cards", href: "https://dotsevenranch.com/products/dot-seven-ranch-gift-cards-1" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="font-body text-sm text-primary-foreground/60 hover:text-barn-red transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/40 font-semibold mb-4">Learn</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Our History", href: "https://dotsevenranch.com/pages/history-of-the-dot-seven-ranch" },
                { label: "Meet the Ranchers", href: "https://dotsevenranch.com/pages/your-ranchers" },
                { label: "Beef FAQs", href: "https://dotsevenranch.com/pages/buying-shipping-beef-q-a" },
                { label: "Recipes", href: "https://dotsevenranch.com/blogs/dinner-on-the-dot" },
                { label: "Event Schedule", href: "https://dotsevenranch.com/pages/event-schedule" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="font-body text-sm text-primary-foreground/60 hover:text-barn-red transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/40 font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:dotsevenranch@gmail.com" className="inline-flex items-center gap-2 font-body text-sm text-primary-foreground/60 hover:text-barn-red transition-colors">
                <Mail size={14} /> dotsevenranch@gmail.com
              </a>
              <div className="inline-flex items-start gap-2 font-body text-sm text-primary-foreground/60">
                <MapPin size={14} className="mt-0.5 shrink-0" /> Local Pickup: Longhorn Feed & Supply
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Dot Seven Ranch. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://dotsevenranch.com/pages/buying-shipping-beef-q-a" className="font-body text-xs text-primary-foreground/40 hover:text-barn-red transition-colors">
              Shipping & Returns
            </a>
            <a href="https://dotsevenranch.com/pages/contact-the-team" className="font-body text-xs text-primary-foreground/40 hover:text-barn-red transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
