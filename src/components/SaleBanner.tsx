import { Link } from "react-router-dom";

// Holiday sale banner. All times are 11:59pm Pacific cutoffs, written in UTC.
// 1. Until the Thanksgiving cutoff (Sun 11/22): Thanksgiving order-by date + Thank-You Week teaser.
// 2. Ranch Thank-You Week (Mon 11/23 – Mon 11/30): free-beef tiers.
// 3. Until the Christmas cutoff (Sun 12/20): Christmas order-by date.
const THANKSGIVING_CUTOFF = new Date("2026-11-23T07:59:59Z");
const THANK_YOU_WEEK_END = new Date("2026-12-01T07:59:59Z");
const CHRISTMAS_CUTOFF = new Date("2026-12-21T07:59:59Z");

const bannerClass = "block bg-barn-red text-primary-foreground py-2 border-t border-primary-foreground/20 hover:bg-barn-red-dark transition-colors";
const textClass = "font-body text-xs sm:text-sm font-medium leading-relaxed";
const linkTextClass = "underline underline-offset-2 font-semibold";

const SaleBanner = () => {
  const now = Date.now();
  if (now > CHRISTMAS_CUTOFF.getTime()) return null;

  let to = "/shop-all";
  let message: React.ReactNode;

  if (now <= THANKSGIVING_CUTOFF.getTime()) {
    to = "/#thank-you-week";
    message = (
      <>
        Thanksgiving orders: order by Sunday, Nov 22 at 11:59pm to ship Monday, Nov 23. Ranch Thank-You Week starts Monday with free beef in your box.{" "}
        <span className={linkTextClass}>See the gifts</span>
      </>
    );
  } else if (now <= THANK_YOU_WEEK_END.getTime()) {
    to = "/#thank-you-week";
    message = (
      <>
        Ranch Thank-You Week: free beef with orders of $150 or more, now through Monday, Nov 30. No code needed.{" "}
        <span className={linkTextClass}>See the gifts</span>
      </>
    );
  } else {
    message = (
      <>
        Christmas orders: order by Sunday, Dec 20 at 11:59pm to ship Monday, Dec 21.{" "}
        <span className={linkTextClass}>Shop now</span>
      </>
    );
  }

  return (
    <Link to={to} role="status" aria-live="polite" aria-atomic="true" className={bannerClass}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className={textClass}>{message}</p>
      </div>
    </Link>
  );
};

export default SaleBanner;
