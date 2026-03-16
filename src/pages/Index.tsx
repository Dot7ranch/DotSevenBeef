import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyBetter from "@/components/WhyBetter";
import ValueProps from "@/components/ValueProps";
import ShopCategories from "@/components/ShopCategories";
import RanchToTable from "@/components/RanchToTable";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyBetter />
      <ValueProps />
      <ShopCategories />
      <RanchToTable />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
