import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AccessibilityPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="pt-20">
        <section className="py-12 lg:py-16 bg-cream">
          <div className="max-w-3xl mx-auto section-padding">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">Accessibility Statement</h1>
            <p className="font-body text-sm text-muted-foreground mb-10">Last updated: May 2026</p>

            <div className="font-body text-base text-foreground/90 leading-relaxed space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">Our Commitment</h2>
                <p>
                  Dot Seven Ranch is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">Standards</h2>
                <p>
                  We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible to people with disabilities.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">What We've Done</h2>
                <ul className="list-disc list-inside space-y-2 text-foreground/80">
                  <li>Keyboard navigation support throughout the site</li>
                  <li>Screen reader labels on all interactive elements</li>
                  <li>Skip-to-content link for keyboard users</li>
                  <li>Sufficient color contrast on all text</li>
                  <li>Descriptive alt text on all meaningful images</li>
                  <li>Reduced motion support for users with vestibular disorders</li>
                  <li>Semantic HTML structure with proper heading hierarchy</li>
                  <li>Accessible cart and navigation menus</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">Known Limitations</h2>
                <p>
                  Our checkout process is handled by Shopify, which maintains its own accessibility standards. Third-party embedded content such as Instagram feeds may not fully meet our accessibility standards.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">Feedback & Contact</h2>
                <p className="mb-3">
                  We welcome feedback on the accessibility of the Dot Seven Ranch website. If you experience any barriers or have suggestions for improvement, please contact us:
                </p>
                <ul className="space-y-1 text-foreground/80">
                  <li>Email: <a href="mailto:support@dotsevenranch.com" className="text-barn-red hover:underline">support@dotsevenranch.com</a></li>
                </ul>
                <p className="mt-4">
                  We aim to respond to accessibility feedback within 3 business days.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AccessibilityPage;
