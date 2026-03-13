import Navbar from "@/components/Navbar";
import RanchStory from "@/components/RanchStory";
import ShippingZones from "@/components/ShippingZones";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const OurStoryPage = () => {
  return (
    <div className="min-h-screen">
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
