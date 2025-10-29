import PageLayout from "@/tools/PageLayout";

const highlights = [
  {
    label: "New this week",
    value: "24 titles",
  },
  {
    label: "Academic guides",
    value: "350+",
  },
  {
    label: "Readers served",
    value: "120K",
  },
];

const ShopHero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-secondary/20 via-background to-background py-6">
      <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />

      <PageLayout paddingSize="none" className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Popy Library Shop
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              All the books you need, in one destination
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              From school companions to university prep, Popy Library keeps every shelf stocked. Enjoy fast delivery and publisher-authenticated editions with every order.
            </p>

            <div className="flex flex-wrap gap-3 text-sm">
              {[
                "Study guides",
                "Bangla literature",
                "English literature",
                "Exam prep",
                "School & college",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border/60 bg-background/80 px-4 py-2 text-foreground shadow-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border border-border/50 bg-background/80 p-8 shadow-lg backdrop-blur">
            <h2 className="text-sm font-semibold tracking-[0.35em] uppercase text-muted-foreground">
              Why Popy?
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {highlights.map((highlight) => (
                <div key={highlight.label} className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                    {highlight.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {highlight.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Fresh titles land every week—be the first to know when you subscribe.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-full border border-border/60 bg-background px-5 py-3 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </PageLayout>
    </section>
  );
};

export default ShopHero;
