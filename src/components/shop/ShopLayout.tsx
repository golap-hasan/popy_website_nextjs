import PageLayout from "@/tools/PageLayout";
import FiltersSidebar from "./FiltersSidebar";
import ShopProducts from "./ShopProducts";

const ShopLayout = () => {
  return (
    <PageLayout>
      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <FiltersSidebar />
        </div>
        <div className="space-y-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">All books</h2>
              <p className="text-sm text-muted-foreground">
                734 titles found—tune the filters to match your reading goals.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-muted-foreground">Sort by:</span>
              <button className="rounded-full border border-border/60 px-4 py-2 text-foreground shadow-sm transition hover:border-primary hover:text-primary">
                Popularity
              </button>
              <button className="rounded-full border border-border/60 px-4 py-2 text-muted-foreground shadow-sm transition hover:border-primary hover:text-primary">
                Newest
              </button>
              <button className="rounded-full border border-border/60 px-4 py-2 text-muted-foreground shadow-sm transition hover:border-primary hover:text-primary">
                Price: Low to High
              </button>
            </div>
          </div>

          <ShopProducts />
        </div>
      </div>
    </PageLayout>
  );
};

export default ShopLayout;
