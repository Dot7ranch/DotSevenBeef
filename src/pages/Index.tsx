import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProps from "@/components/ValueProps";
import ShopCategories from "@/components/ShopCategories";
import RanchToTable from "@/components/RanchToTable";
import HowItWorks from "@/components/HowItWorks";
import InstagramFeed from "@/components/InstagramFeed";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50">
        <AnnouncementBar />
        <Navbar fixed={false} />
      </header>
      <main id="main-content">
      <HeroSection />
      <ValueProps />
      <ShopCategories />
      <RanchToTable />
      <HowItWorks />
      <InstagramFeed />
      <Testimonials />
      <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
