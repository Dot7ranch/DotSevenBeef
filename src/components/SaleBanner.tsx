import { Link } from "react-router-dom";

// Sale banner. Times match the Shopify discount windows.
// Top Sirloin shows until the Flanken code goes live (10/16/2026 3:35pm Pacific),
// then Flanken Ribs shows until its code expires (10/23/2026 3:35pm Pacific).
const FLANKEN_START = new Date("2026-10-16T22:35:00Z");
const FLANKEN_END = new Date("2026-10-23T22:35:00Z");

const bannerClass = "block bg-barn-red text-primary-foreground py-2 border-t border-primary-foreground/20";
const textClass = "font-body text-xs sm:text-sm font-medium leading-relaxed";

const SaleBanner = () => {
  const now = Date.now();
  if (now > FLANKEN_END.getTime()) return null;

  if (now < FLANKEN_START.getTime()) {
    return (
      <div role="status" aria-live="polite" aria-atomic="true" className={bannerClass}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={textClass}>
            Top Sirloin Steak sale now through Friday, October 16. Take 10% off with code <span className="font-semibold tracking-wide">FallTopSirloin10</span>, entered at checkout.
          </p>
        </div>
      </div>);
  }

  return (
    <Link to="/product/flanken-style-ribs" className={`${bannerClass} hover:bg-barn-red-dark transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className={textClass}>
          Flanken Style Ribs are 10% off through Friday, October 23. Use code <span className="font-semibold tracking-wide">FallFlankenRibs10</span> in your cart. <span className="underline underline-offset-2 font-semibold">Shop Flanken Ribs</span>
        </p>
      </div>
    </Link>);

};

export default SaleBanner;
