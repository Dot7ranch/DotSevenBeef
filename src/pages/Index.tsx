import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProps from "@/components/ValueProps";
import ShopCategories from "@/components/ShopCategories";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ValueProps />
      <ShopCategories />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
