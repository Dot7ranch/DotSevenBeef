import { MapPin, Truck } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="bg-barn-red text-primary-foreground py-2">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-1 text-center">
        <span className="inline-flex items-center gap-1.5 font-body text-xs sm:text-sm font-medium">
          <MapPin size={14} className="shrink-0" />
          Local Pickup @ Longhorn Feed &amp; Supply — ready the Tuesday following your order.
        </span>
        <span className="inline-flex items-center gap-1.5 font-body text-xs sm:text-sm font-medium">
          <Truck size={14} className="shrink-0" />
          Beef boxes ship every Monday!
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
