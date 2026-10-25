import Navbar from "@/components/Navbar";
import RanchStory from "@/components/RanchStory";
import ShippingZones from "@/components/ShippingZones";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { breadcrumbs } from "@/lib/structuredData";

const OurStoryPage = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Meet the Ranchers"
        description="Meet the family behind Dot Seven Ranch. We raise Angus cattle in the hills east of Sanger, California and ship our grain-finished beef to your door."
        path="/our-story"
        jsonLd={breadcrumbs([{ name: "Our Story", path: "/our-story" }])}
      />
      <Navbar />
      <div className="pt-20">
        <RanchStory />
        <Testimonials />
        <ShippingZones />
        <CTABanner />
      </div>
      <Footer />
    </div>
  );
};

export default OurStoryPage;
