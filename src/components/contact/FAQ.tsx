import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "./contact-data";

const FAQ = () => {
  return (
    <section className="py-16">
      <PageLayout className="space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">FAQ</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Quick answers before you reach out
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Still exploring? These common questions cover deliveries, studio visits, and partnerships.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((item) => (
            <Card key={item.question} className="border-border/60 bg-background/80">
              <CardContent className="space-y-2 p-6 text-sm text-muted-foreground">
                <p className="text-base font-semibold text-foreground">{item.question}</p>
                <p>{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageLayout>
    </section>
  );
};

export default FAQ;
