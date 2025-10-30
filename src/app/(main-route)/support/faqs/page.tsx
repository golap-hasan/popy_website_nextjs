import PageLayout from "@/tools/PageLayout";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const FAQsPage = () => {
  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Support</p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Frequently Asked Questions</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">Find quick answers about orders, shipping, returns, and using Popy Library.</p>
        </div>
        <Separator className="my-2" />
        <Accordion type="single" collapsible className="divide-y rounded-2xl border border-border/60 bg-background/95">
          <AccordionItem value="item-1" className="px-4">
            <AccordionTrigger>How long does shipping take?</AccordionTrigger>
            <AccordionContent>
              Inside Dhaka: 2-3 business days. Outside Dhaka: 3-5 business days. Pre-order items ship when available.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="px-4">
            <AccordionTrigger>What are the delivery charges?</AccordionTrigger>
            <AccordionContent>
              Inside Dhaka: ৳60-80 depending on weight. Outside Dhaka: ৳100-130 via courier partners. Free delivery on eligible promotions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="px-4">
            <AccordionTrigger>Can I return or exchange a book?</AccordionTrigger>
            <AccordionContent>
              Yes, returns are accepted for manufacturing defects or wrong items within 7 days of delivery. Keep packaging and invoice.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="px-4">
            <AccordionTrigger>How do I track my order?</AccordionTrigger>
            <AccordionContent>
              Use the order ID sent to your email/SMS on the Track Order page. Courier tracking link will be available once dispatched.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="px-4">
            <AccordionTrigger>Which payment methods are supported?</AccordionTrigger>
            <AccordionContent>
              We support cash on delivery (COD), mobile banking, and major cards where available.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </PageLayout>
  );
};

export default FAQsPage;
