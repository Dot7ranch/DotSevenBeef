import { Link } from "react-router-dom";
import holidayBanner from "@/assets/holiday-banner.webp";
import holidayBannerSmall from "@/assets/holiday-banner-960.webp";

// "Howdy Holidays" image banner. Links to the Holiday Boxes collection.
// Hides itself automatically after Christmas.
const HOLIDAY_END = new Date("2026-12-26T08:00:00Z");

const HolidayBanner = () => {
  if (Date.now() > HOLIDAY_END.getTime()) return null;

  return (
    <section className="bg-cream py-6 lg:py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          to="/collections/holiday-beef-boxes-1"
          className="block overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-barn-red"
        >
          <img
            src={holidayBanner}
            srcSet={`${holidayBannerSmall} 960w, ${holidayBanner} 1920w`}
            sizes="(max-width: 1152px) 100vw, 1152px"
            width={1920}
            height={1080}
            alt="Howdy Holidays. Shop Dot Seven Ranch holiday beef boxes."
            className="w-full h-auto block"
          />
        </Link>
      </div>
    </section>
  );
};

export default HolidayBanner;
