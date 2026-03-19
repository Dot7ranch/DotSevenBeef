import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ReturnYourBoxPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
            Return Your Box
          </h1>

          <section className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              How to Recycle / Reuse Your Box!
            </h2>
            <p className="font-body text-muted-foreground mb-8 leading-relaxed">
              As a small business, we so appreciate being able to reuse our custom insulated liners over and over again! They are a huge expense when it comes to shipping beef so getting them back to re-use ensures we will be around for a long time to come :).
            </p>

            <div className="mb-10">
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                Option 1: The Post Office (USPS)
              </h3>
              <p className="font-body text-muted-foreground mb-4 leading-relaxed">
                You can send a box back through the post office using the "Media Mail Rate" (it will take 8-10 days via snail mail but that is okay with us!) Simply place a used book inside (it has to be a book not a magazine - we will donate this to our local community), remove any notes and dry ice bag from inside the box, cover up the dry ice and perishable stickers on the outside of the box and take to your local post office to mail back to us for $6-$8. You can also send Priority Mail or "Retail Ground" but Media Mail Rate will be the cheapest.
              </p>
              <p className="font-body font-semibold text-foreground mb-4">
                Address to send it to is provided on the white sticker inside your beef box.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Once we receive your box we will send you a code for one FREE pound of ground beef to use on your next order. If you don't receive your code within a few days, email us at{" "}
                <a href="mailto:support@dotsevenranch.com" className="text-barn-red hover:underline">
                  support@dotsevenranch.com
                </a>
              </p>
            </div>

            <div className="mb-10">
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                Option 2: UPS
              </h3>
              <p className="font-body text-muted-foreground mb-4 leading-relaxed">
                We can provide a UPS return label to leave the box(es) on your porch for pick up or you can take them to a UPS shipping center. The UPS label costs us a little more than the price of the liner, so we require that you save 2-4 of the boxes of the same size to stack and tape together as one box (since they are so light empty) before you ship them back. The liners are the most valuable part of the box, so you can also pack one liner inside a second box/liner and recycle the first cardboard box. Email{" "}
                <a href="mailto:support@dotsevenranch.com" className="text-barn-red hover:underline">
                  support@dotsevenranch.com
                </a>{" "}
                to print a return UPS label!
              </p>
              <p className="font-body font-semibold text-foreground mb-4">
                Address to send it to is provided on the white sticker inside your beef box.
              </p>
            </div>

            <p className="font-body text-muted-foreground text-center text-lg">
              Thank you! This helps us keep costs down!
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnYourBoxPage;
