const AnnouncementBar = () => {
  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="bg-barn-red text-primary-foreground py-2">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-body text-xs sm:text-sm font-medium leading-relaxed">
          Local Pickup @ Longhorn Feed &amp; Supply. Beef will be ready for pickup the Tuesday following your order. Beef boxes ship every Monday!
        </p>
      </div>
    </div>);

};

export default AnnouncementBar;