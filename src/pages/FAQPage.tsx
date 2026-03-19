import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import shippingZones from "@/assets/shipping-zones.png";

const beefLogistics = [
  {
    question: "When can I order Dot Seven beef?",
    answer:
      "Anytime! You may order 24/7 365 here on our website as long as we have beef available!",
  },
  {
    question: "When will my beef ship?",
    answer:
      "Because we use dry ice to keep your beef frozen, beef boxes will ship once a week. You may order any day of the week but we will ship either Monday or Tuesday for Wednesday or Thursday (at the latest) delivery. Cutoff to guarantee your beef will arrive on time will be every Sunday evening at 11:59pm PST. If you order after that but before we pickup dry ice, we will make every effort to get your order out the door, however we cannot guarantee it.",
  },
  {
    question: "How long will it take for my beef to arrive at my doorstep?",
    answer:
      "The time zone you are in will determine how fast you receive your order. We are located in California so most of the western states will receive their order the following day and the rest of the country will receive theirs 1–2 days. Rest assured there will be enough dry ice in your box to keep everything perfectly frozen for 48 hours or more.",
  },
  {
    question: "What shipping option do I choose at checkout?",
    answer:
      "To make it simple, our shipping is a flat rate based on which time zone you are in. Your correct zone will default based on your address and will calculate your shipping cost. Please note, this is flat rate shipping so fill that box up to make the most of the shipping cost. We recommend no less than 12–15 pounds but are able to ship any amount.",
    hasImage: true,
  },
  {
    question: "If I am local, can I pickup?",
    answer:
      "YES! There is an option at checkout for \"Local Pickup\" for those in our pickup zone. Our local pickup location is Longhorn Feed and Supply on the corner of Shaw and Academy in Clovis. You will receive a text message from us once we have your beef ready for pickup. We drop beef here every Tuesday for pickup. If you need it sooner, just reach out and we will accommodate.\n\nLonghorn Feed and Supply — 5092 N Academy Avenue Clovis, CA 93619\nHours — Mon–Fri 8–5:30pm, Saturday 8–4:30pm & Sunday 9–4pm.",
  },
  {
    question: "How do I handle the dry ice?",
    answer:
      "There will be instructions on the box. Please handle with caution. Dry ice can burn and therefore we recommend you use gloves to set it aside when unpacking your box into the freezer. Do not put the dry ice in your freezer!",
  },
];

const beefRaised = [
  {
    question: "What breed of cattle do you raise on the Dot Seven Ranch?",
    answer:
      "We raise premium Angus beef. We run registered Angus bulls on our Angus cows. We've spent three generations building and improving these genetics and feel we produce a premium product. Our ranch is a mostly closed herd, meaning it's a rare case for us to buy cows that were not born on our ranch. Each year we choose the best heifers to replace back into the herd.",
  },
  {
    question: "Is your beef grain or grass fed/finished?",
    answer:
      "Here at The Dot Seven Ranch we believe in choices. We don't however believe in fear based marketing, which is why we are offering both options based on availability. Providing beef direct to the public can be up to a two year process for a grass fed animal. We do our best to project correct quantities but sometimes we may not guess correctly and could be out of one or the other.",
  },
  {
    question:
      "Can you tell a difference in taste between the grain and grass fed?",
    answer:
      "Our family chooses grain finished because we believe the flavor is richer and the marbling is greater. However, since harvesting some animals finished on grass from our ranch, the taste is similar. We recommend you choose based on your own preference or, if you don't know, try some of both!",
  },
  {
    question: "Antibiotics. Do you use them?",
    answer:
      "Short answer, yes. However, anything that we have to give antibiotics to will be sold conventionally (and always after the required withdrawal time has elapsed) and not go into our program. With that said, we feel that antibiotics are not something to be feared. It is our duty as ranchers to treat our cattle if/when they are sick. We work very closely with our veterinarian and have protocols put in place for these cases. Because we take great care of our animals and their nutrition, it is very, very rare that our cattle get sick.",
  },
  {
    question: 'How about hormones? I see labels that say "no hormones".',
    answer:
      "Dot Seven calves are natural and receive no added hormones. Every living thing has hormones but we do not implant our cattle with additional hormones. We feel that there is a sustainability factor to the use of hormones but our girls grow their calves quickly as it is so for our specific ranch we don't use this tool.",
  },
  {
    question: "Is your beef organic?",
    answer:
      "No, our beef is not organic. We are organically minded but realize that certification comes at a cost that we would be forced to pass on to the customer. And because there are no scientific studies that show any food is more healthful because it's organic, we choose not to certify.",
  },
  {
    question: "How are your cattle handled?",
    answer:
      "On the Dot Seven Ranch, nutrition and low-stress handling practices are our main focus. We believe these are the two main things that produce the highest quality beef possible. Cattle have access to fresh water, salt, minerals and care 24/7, 365. When we gather to work the cattle in the corrals we do so quietly and intentionally. We always consider the weather on these days and our start time depends on when the cattle will be most cool. Our cattle know the corrals are not a place to be scared, they learn that we work slowly through the alleys and chute.",
  },
  {
    question: "What certification do you have to sell beef by the cut?",
    answer:
      "For any beef sold by the cut after processing, it must pass USDA inspection. Our beef is USDA inspected (and passed). We use a small family owned locker and feel that this is least stressful for the animals.",
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Buying & Shipping Beef Q&A
          </h1>
          <p className="text-muted-foreground text-center mb-12 font-body text-lg">
            Everything you need to know about ordering from Dot Seven Ranch.
          </p>

          {/* Beef Logistics */}
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Beef Logistics
          </h2>
          <Accordion type="single" collapsible className="w-full mb-12">
            {beefLogistics.map((faq, i) => (
              <AccordionItem key={i} value={`logistics-${i}`} className="border-border">
                <AccordionTrigger className="font-body text-base text-left text-foreground hover:text-barn-red hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground whitespace-pre-line">
                  {faq.answer}
                  {faq.hasImage && (
                    <img
                      src={shippingZones}
                      alt="Dot Seven Ranch shipping zones map"
                      className="mt-4 rounded-lg w-full max-w-lg"
                    />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* How Our Beef Is Raised */}
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            How Our Beef Is Raised
          </h2>
          <Accordion type="single" collapsible className="w-full mb-12">
            {beefRaised.map((faq, i) => (
              <AccordionItem key={i} value={`raised-${i}`} className="border-border">
                <AccordionTrigger className="font-body text-base text-left text-foreground hover:text-barn-red hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center font-body text-muted-foreground">
            <p>
              Did we miss anything? Send your question to{" "}
              <a
                href="mailto:support@dotsevenranch.com"
                className="text-barn-red hover:underline"
              >
                support@dotsevenranch.com
              </a>{" "}
              and we will answer it as soon as possible!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
