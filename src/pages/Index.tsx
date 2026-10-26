import AnnouncementBar from "@/components/AnnouncementBar";
import SaleBanner from "@/components/SaleBanner";
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
import Seo from "@/components/Seo";
import { organization, website } from "@/lib/structuredData";
import heroSteak from "@/assets/hero-steak.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Dot Seven Ranch | Premium Ranch-Raised Beef Delivered"
        description="Four generations of premium, sustainably raised beef delivered from our family ranch to your table. Shop steaks, beef boxes, and more."
        path="/"
        jsonLd={[organization(), website()]}
        preloadImage={heroSteak}
      />
      <header className="sticky top-0 z-50">
        <AnnouncementBar />
        <SaleBanner />
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
