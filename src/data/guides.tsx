import type { ReactNode } from "react";
import { A, H2, Lead, P, Table, UL } from "@/components/GuideContent";

export interface Guide {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  /** Shown at the bottom of the page and marked up as FAQPage structured data. */
  faqs: { question: string; answer: string }[];
  cta: { label: string; href: string };
  body: ReactNode;
}

export const guides: Guide[] = [
  {
    slug: "quarter-beef-freezer-space",
    title: "How Much Freezer Space Does a Quarter Beef Need?",
    description:
      "A quarter beef from Dot Seven is 150 pounds of beef and fits in about 4 to 5 cubic feet of freezer space. Here's what's in it and how to pack it.",
    datePublished: "2026-10-27",
    cta: { label: "Shop the 1/4 Beef Share", href: "/product/1-4-beef-share" },
    faqs: [
      {
        question: "How many pounds is a quarter beef?",
        answer:
          "At Dot Seven Ranch, a quarter beef share is 150 pounds of beef: about 50 pounds of steaks and roasts and 100 pounds of ground beef, stew meat, kabob meat and short ribs.",
      },
      {
        question: "What size freezer do I need for a quarter beef?",
        answer: "About 4 to 5 cubic feet. A 5 cubic foot chest freezer is a good fit.",
      },
    ],
    body: (
      <>
        <Lead>
          A quarter beef from Dot Seven Ranch is 150 pounds of beef, and it fits in about 4 to 5 cubic feet of freezer
          space. A 5 cubic foot chest freezer holds it with a little room left over. The freezer on top of your fridge
          won't come close.
        </Lead>
        <P>
          The math is simple. Plan on about one cubic foot for every 35 to 40 pounds of packaged beef. That puts 150
          pounds right around 4 cubic feet, and we always tell people to give themselves a little extra so you're not
          playing Tetris every time you want a roast.
        </P>

        <H2>What's in a quarter beef</H2>
        <P>About 50 pounds of steaks and roasts:</P>
        <UL
          items={[
            "8 bone-in ribeye steaks",
            "8 New York strip steaks",
            "8 filet mignons",
            "8 top sirloin steaks",
            "2 chuck roasts",
            "1 brisket (2 to 3 pounds)",
          ]}
        />
        <P>Plus 100 pounds of everyday cuts:</P>
        <UL
          items={[
            "70 pounds of ground beef",
            "10 pounds of stew meat",
            "10 pounds of kabob meat",
            "10 pounds of short ribs",
          ]}
        />
        <P>Want patties, sausage, or chorizo? Each upgrade swaps 10 pounds of your ground beef for that item, for $25.</P>

        <H2>Packing tips from our freezer to yours</H2>
        <P>
          Ground beef is most of the volume, so put it in first. Stack it flat on the bottom and save the top layer for
          steaks, since those are the packages you'll dig for on a Friday night. A couple of plastic bins or baskets make
          a chest freezer way easier to live with. One for ground beef, one for steaks, one for roasts and everything
          else.
        </P>
        <P>Tape a list to the lid and cross things off as you go. Future you will be thankful.</P>

        <H2>Good to know</H2>
        <P>
          Right now the quarter share is for local customers only. After you order, we'll reach out to set up pickup or
          delivery.
        </P>
        <P>
          Not quite ready for 150 pounds? The{" "}
          <A to="/product/ground-beef-stock-up-special">Ground Beef Stock Up Special</A> gets you 11 or 22 pounds of
          ground beef, and it ships.
        </P>
      </>
    ),
  },
  {
    slug: "grass-fed-grain-finished-beef",
    title: "What Does Grass-Fed, Grain-Finished Beef Mean?",
    description:
      "Grass-fed, grain-finished cattle graze most of their lives on ranches, then eat a grain-based ration for their last few months. Here's how we do it at Dot Seven Ranch.",
    datePublished: "2026-10-27",
    cta: { label: "Try it with the Ranch Starter Box", href: "/product/the-ranch-starter-box" },
    faqs: [
      {
        question: "What does grass-fed, grain-finished mean?",
        answer:
          "The cattle graze for most of their lives, then eat a grain-based ration for their final months. Dot Seven Ranch cattle graze near Sanger, California, then spend roughly their last 120 days on a ration of alfalfa, corn silage, rolled corn, molasses and minerals.",
      },
      {
        question: "Is grain-finished beef more marbled?",
        answer: "Grain finishing typically adds marbling, which is why Dot Seven chooses it for flavor.",
      },
    ],
    body: (
      <>
        <Lead>
          Grass-fed, grain-finished means the cattle spend most of their lives grazing, then eat a grain-based ration for
          the last few months before harvest. At Dot Seven Ranch, our cattle graze the hills around Sanger, California,
          and spend their last roughly 120 days on a ration a cattle nutritionist built for us with feedstuffs such as
          alfalfa, corn silage, rolled corn, molasses, and minerals.
        </Lead>
        <P>
          We bring them onto that ration slowly. A sudden change in diet is hard on cattle, same as it would be on you.
        </P>

        <H2>Why we finish on grain</H2>
        <P>
          Flavor. Our family thinks grain-finished beef is richer and has more marbling, those little streaks of fat that
          melt while it cooks and make a steak juicy. When people tell us our beef tastes like a steakhouse at home, that
          last 120 days is a big part of why.
        </P>

        <H2>What else people ask us</H2>
        <P>
          <strong className="text-foreground">Hormones?</strong> None added. Our calves grow well on their own, so we
          don't implant them.
        </P>
        <P>
          <strong className="text-foreground">Antibiotics?</strong> If an animal gets sick, we treat it. That's our job
          as ranchers. Any animal that needed antibiotics goes to market the conventional way and doesn't go into our
          beef program. It's rare, because good nutrition and low-stress handling keep our cattle healthy.
        </P>
        <P>
          <strong className="text-foreground">What breed?</strong> Angus. We've spent three generations building our
          herd, and 95% of our cows were born right here on the ranch.
        </P>
      </>
    ),
  },
  {
    slug: "how-frozen-beef-shipping-works",
    title: "How Frozen Beef Shipping Works at Dot Seven Ranch",
    description:
      "We ship frozen beef on dry ice once a week. Order by Sunday night, we ship Monday or Tuesday, and your beef arrives by Thursday, still frozen.",
    datePublished: "2026-10-27",
    cta: { label: "Build Your Box", href: "/collections/build-your-own-box" },
    faqs: [
      {
        question: "How does Dot Seven Ranch ship frozen beef?",
        answer:
          "Packed with dry ice, once a week. Orders placed by Sunday at 11:59 p.m. Pacific ship Monday or Tuesday and arrive Tuesday through Thursday.",
      },
      {
        question: "How much is shipping?",
        answer:
          "A flat rate by region: $19 for the West Coast and nearby states, up to $69 for the eastern U.S. Dot Seven doesn't ship to Alaska or Hawaii.",
      },
      {
        question: "Will my beef stay frozen?",
        answer: "Yes. Each box has enough dry ice to keep it frozen for 48 hours or more.",
      },
    ],
    body: (
      <>
        <Lead>
          We ship our beef frozen, packed with dry ice, once a week. Order by Sunday at 11:59 p.m. Pacific, we ship Monday
          or Tuesday, and your box arrives Tuesday through Thursday with enough dry ice to keep everything frozen for 48
          hours or more.
        </Lead>
        <P>
          You can order any day. Orders placed after the Sunday cutoff usually still make it out that week if we haven't
          picked up dry ice yet, but we can't promise it.
        </P>

        <H2>How long it takes</H2>
        <P>
          We're in California, so most western states get their beef the next day. Everywhere else takes 1 to 2 days.
        </P>

        <H2>What shipping costs</H2>
        <P>Shipping is a flat rate based on where you live, not how much you order:</P>
        <Table
          head={["Zone", "States", "Flat rate"]}
          rows={[
            ["Zone 1", "CA, OR, WA, NV, ID, UT, AZ", "$19"],
            ["Zone 2", "CO", "$39"],
            ["Zone 3", "MT, WY, NM", "$55"],
            ["Zone 4", "All other states in the lower 48", "$69"],
          ]}
        />
        <P>We don't ship to Alaska or Hawaii.</P>
        <P>
          Since the rate is the same no matter what's inside, fill that box up. We recommend 12 to 15 pounds to get the
          most out of your shipping.
        </P>

        <H2>When your box shows up</H2>
        <P>
          Get the beef into the freezer first. Then deal with the dry ice: wear gloves, because it can burn skin, and
          never put it in your freezer. Let it melt away somewhere with good airflow, out of reach of kids and pets.
        </P>
        <P>
          If anything doesn't look right when you open it, email us at{" "}
          <A to="mailto:support@dotsevenranch.com">support@dotsevenranch.com</A>.
        </P>

        <H2>Send the box back, get a free pound of ground beef</H2>
        <P>
          Those insulated liners are expensive, and we reuse them. Ship your box back through USPS Media Mail (put a used
          book inside, it's $6 to $8 and we donate the books) and we'll send you a code for a free pound of ground beef.
          Details on our <A to="/return-your-box">Return Your Box</A> page.
        </P>

        <H2>Local? Skip shipping</H2>
        <P>
          Choose Local Pickup at checkout and grab your order at Longhorn Feed and Supply, 5092 N Academy Avenue in
          Clovis. We drop beef there every Tuesday and text you when it's ready.
        </P>
      </>
    ),
  },
];
