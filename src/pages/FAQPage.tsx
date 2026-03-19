import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Where does your beef come from?",
    answer:
      "All of our beef is raised right here on Dot Seven Ranch. Our cattle are born and raised on our family ranch, where they graze on open pastures and are finished on a carefully managed diet to ensure the highest quality and flavor.",
  },
  {
    question: "Is your beef grass-fed or grain-finished?",
    answer:
      "Our cattle are pasture-raised and grain-finished. This combination gives our beef incredible marbling and tenderness while ensuring the animals live healthy, stress-free lives on open pastures.",
  },
  {
    question: "How is the beef shipped?",
    answer:
      "We ship our beef frozen in insulated packaging with dry ice to ensure it arrives in perfect condition. Orders are shipped early in the week to avoid weekend delays. You'll receive tracking information once your order ships.",
  },
  {
    question: "What areas do you ship to?",
    answer:
      "We currently ship to most of the continental United States. Check our shipping zones page for specific delivery areas and estimated transit times. Some remote areas may have limited availability.",
  },
  {
    question: "How should I store my beef when it arrives?",
    answer:
      "Place your beef in the freezer immediately upon arrival. Our vacuum-sealed packaging keeps beef fresh in the freezer for up to 12 months. When you're ready to cook, thaw in the refrigerator for 24–48 hours for best results.",
  },
  {
    question: "Do you use hormones or antibiotics?",
    answer:
      "We never use added hormones or unnecessary antibiotics. Our cattle are raised naturally, and we believe in sustainable, ethical ranching practices that prioritize animal welfare and product quality.",
  },
  {
    question: "What cuts are included in the beef boxes?",
    answer:
      "Each beef box is curated with a variety of cuts including steaks, roasts, and ground beef. The exact contents vary by box — check each product listing for a detailed breakdown of what's included.",
  },
  {
    question: "Can I customize my order?",
    answer:
      "Yes! In addition to our curated beef boxes, we offer a Build Your Own Box option where you can select individual cuts to create your perfect order.",
  },
  {
    question: "What is your return or refund policy?",
    answer:
      "We stand behind the quality of our beef. If your order arrives damaged or you're not satisfied, please contact us within 48 hours of delivery with photos, and we'll make it right with a replacement or refund.",
  },
  {
    question: "How do I contact you?",
    answer:
      "You can reach our team through our Contact page, or email us directly. We typically respond within 24 hours on business days.",
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-center mb-12 font-body text-lg">
            Everything you need to know about ordering from Dot Seven Ranch.
          </p>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="font-body text-base text-foreground hover:text-barn-red hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
