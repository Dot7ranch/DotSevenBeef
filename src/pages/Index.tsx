import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProps from "@/components/ValueProps";
import ShopCategories from "@/components/ShopCategories";
import RanchToTable from "@/components/RanchToTable";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <HeroSection />
      <WhyBetter />
      <ValueProps />
      <ShopCategories />
      <RanchToTable />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
