import { Link } from "react-router-dom";
import { Gift } from "lucide-react";

// Ranch Thank-You Week (Mon 11/23 – Mon 11/30, 11:59pm Pacific).
// Free beef is added by hand at packing based on the order subtotal; no code or cart item needed.
// Shows as a "starts Monday" preview before the week, then hides itself after Cyber Monday.
const WEEK_START = new Date("2026-11-23T08:00:00Z");
const WEEK_END = new Date("2026-12-01T07:59:59Z");

const tiers = [
  {
    spend: "$150+",
    gift: "2 lb of ground beef",
  },
  {
    spend: "$300+",
    gift: "2 lb of ground beef plus a pack of short ribs or carne asada (rancher's choice)",
  },
  {
    spend: "$500+ or any quarter share",
    gift: "2 lb of ground beef, a pack of short ribs or carne asada, and a Dot Seven tallow candle",
  },
];

const ThankYouWeek = () => {
  const now = Date.now();
  if (now > WEEK_END.getTime()) return null;
  const started = now >= WEEK_START.getTime();

  return (
    <section id="thank-you-week" className="bg-cream py-10 lg:py-14 scroll-mt-40">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="font-body text-sm uppercase tracking-widest text-barn-red font-semibold mb-2">
          {started ? "On now through Monday, Nov 30" : "Starts Monday, Nov 23 · Runs through Monday, Nov 30"}
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Ranch Thank-You Week
        </h2>
        <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          One deal all week, no codes. Spend more and we'll tuck free beef into your box as a thank-you for supporting our family ranch.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {tiers.map((tier) => (
            <div key={tier.spend} className="bg-background rounded-lg p-6 shadow-sm border-4 border-[hsl(40,12%,78%)]">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-barn-red/20 mb-3">
                <Gift size={22} className="text-barn-red" aria-hidden="true" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground mb-2">Spend {tier.spend}</p>
              <p className="font-body text-muted-foreground leading-relaxed">Free {tier.gift}</p>
            </div>
          ))}
        </div>

        <Link
          to="/shop-all"
          className="inline-block bg-barn-red text-primary-foreground font-body font-semibold uppercase tracking-wide px-8 py-3 rounded-md hover:bg-barn-red-dark transition-colors"
        >
          Shop Beef
        </Link>

        <p className="font-body text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
          Gifts are added to your box when we pack it, based on your order subtotal before shipping and tax. Good online and at our market booth while supplies last. Thank-You Week orders ship Monday, Nov 30.
        </p>
      </div>
    </section>
  );
};

export default ThankYouWeek;
