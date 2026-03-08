import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProps from "@/components/ValueProps";
import ShopCategories from "@/components/ShopCategories";
import RanchStory from "@/components/RanchStory";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ValueProps />
      <ShopCategories />
      <RanchStory />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
