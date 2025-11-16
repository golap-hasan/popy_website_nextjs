export default function Loading() {
  const sidebarItems = Array.from({ length: 4 });
  const productItems = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 space-y-3 animate-pulse">
          <div className="h-8 w-1/3 rounded bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
          <div className="space-y-4">
            <div className="h-10 w-full rounded bg-muted" />
            <div className="space-y-3 rounded-lg bg-card p-4 shadow-sm">
              {sidebarItems.map((_, index) => (
                <div
                  key={index}
                  className="h-4 w-full rounded bg-muted/70"
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-10 w-32 rounded bg-muted" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productItems.map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border bg-card shadow-sm"
                >
                  <div className="h-40 w-full bg-muted" />
                  <div className="space-y-2 p-4">
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-3 w-1/2 rounded bg-muted" />
                    <div className="h-4 w-1/3 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <div className="h-8 w-48 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
