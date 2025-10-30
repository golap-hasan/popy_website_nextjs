import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ShieldCheck, Truck } from "lucide-react";
import type { BookDetail } from "./book-details-data";

const SummarySection = ({ detail }: { detail: BookDetail }) => {
  const discount = detail.originalPrice
    ? Math.max(
        0,
        Math.round(
          ((Number.parseInt(detail.originalPrice.replace(/[^0-9]/g, ""), 10) -
            Number.parseInt(detail.price.replace(/[^0-9]/g, ""), 10)) /
            Number.parseInt(detail.originalPrice.replace(/[^0-9]/g, ""), 10)) *
            100,
        ),
      )
    : null;

  return (
    <section className="relative overflow-hidden bg-background/95">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-6">
          <Badge variant="secondary" className="w-fit bg-primary/15 text-primary">
            {detail.tag}
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-[48px]">
              {detail.title}
            </h1>
            {detail.subtitle ? (
              <p className="text-lg text-muted-foreground">{detail.subtitle}</p>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary">
              <Star className="size-4 fill-current" />
              <span className="font-semibold text-foreground">{detail.rating.toFixed(1)}</span>
              <span>({detail.reviewsCount} reviews)</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2">
              <ShieldCheck className="size-4 text-emerald-500" />
              Authentic Popy partners
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2">
              <Truck className="size-4 text-primary" />
              48h delivery inside Dhaka
            </div>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{detail.description}</p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="space-y-1">
              <div className="flex items-end gap-2 text-3xl font-semibold text-primary">
                <span>{detail.price}</span>
                {detail.originalPrice ? (
                  <span className="text-base font-normal text-muted-foreground line-through">
                    {detail.originalPrice}
                  </span>
                ) : null}
              </div>
              {discount ? (
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-600">
                  Save {discount}% today
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" className="rounded-full px-8">
                Add to cart
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                <Link href="#reviews">Read reviews</Link>
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            {detail.highlights.slice(0, 2).map((highlight) => (
              <div key={highlight} className="rounded-2xl border border-border/40 bg-muted/20 p-4">
                {highlight}
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute -top-12 right-10 hidden size-72 rounded-full bg-primary/20 blur-3xl md:block" />
          <div className="absolute -bottom-12 left-0 hidden size-72 rounded-full bg-secondary/20 blur-3xl md:block" />
          <div className="relative overflow-hidden rounded-4xl border border-border/40 bg-background/70 p-5 shadow-lg">
            <div className="relative h-[420px] w-[300px] overflow-hidden rounded-2xl border border-border/40 bg-muted/30">
              <Image
                src={detail.coverImage}
                alt={`${detail.title} cover`}
                fill
                sizes="(min-width: 1024px) 320px, 60vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
