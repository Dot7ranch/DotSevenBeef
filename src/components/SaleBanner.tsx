// Top Sirloin Steak sale banner. Hides itself after 10/16/2026 at 11:30pm Pacific.
const SALE_END = new Date("2026-10-17T06:30:00Z");

const SaleBanner = () => {
  if (Date.now() > SALE_END.getTime()) return null;

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="bg-barn-red text-primary-foreground py-2 border-t border-primary-foreground/20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-body text-xs sm:text-sm font-medium leading-relaxed">
          Top Sirloin Steak sale now through Friday, October 16. Take 10% off with code <span className="font-semibold tracking-wide">FallTopSirloin10</span>, entered at checkout.
        </p>
      </div>
    </div>);

};

export default SaleBanner;
