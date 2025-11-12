import Link from 'next/link';
import PageLayout from '@/tools/PageLayout';
import { Button } from '@/components/ui/button';

const ContactHero = () => {
  return (
    <section className="bg-linear-to-b from-primary/10 via-background to-background">
      <PageLayout paddingSize="small">
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-background/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Let&#39;s build better learning journeys
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-[52px]">
            Talk to the Popy team
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Need help choosing a bundle, planning a workshop, or setting up a
            library partnership? Share your goals and we&apos;ll match you with
            the right curator.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="px-6">
              <Link href="#connect">Send us a message</Link>
            </Button>
            <Button variant="ghost" size="lg" className="px-6">
              <Link href="tel:+8809606787878">Call +880 9606-787878</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    </section>
  );
};

export default ContactHero;
