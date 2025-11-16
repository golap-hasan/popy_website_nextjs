"use client";

import type { Category } from "@/types/shop";
import { Slider } from "@/components/ui/slider";
import { StarRating } from "@/tools/StarRating";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const priceRanges = [
  { label: "৳200 - ৳400", value: "200-400" },
  { label: "৳400 - ৳600", value: "400-600" },
  { label: "৳600 - ৳800", value: "600-800" },
  { label: "৳800+", value: "800-1200" },
];

const authorFilters = [
  { name: "Humayun Ahmed" },
  { name: "Zafar Iqbal" },
  { name: "Muhammed Zafar Iqbal" },
  { name: "Anisul Hoque" },
  { name: "Rabindranath Tagore" },
];

type FiltersSidebarProps = {
  categories?: Category[];
  selectedCategory?: string;
  onCategoryChange?: (slug: string) => void;
  priceRange?: [number, number];
  onPriceChange?: (range: [number, number]) => void;
  selectedRating?: number;
  onRatingChange?: (rating: number) => void;
  selectedAuthors?: string[];
  onAuthorChange?: (authors: string[]) => void;
};

const FiltersSidebar = ({
  categories = [],
  selectedCategory = "",
  onCategoryChange,
  priceRange = [200, 2000],
  onPriceChange,
  selectedRating = 0,
  onRatingChange,
  selectedAuthors = [],
  onAuthorChange,
}: FiltersSidebarProps) => {
  const handleAuthorSelection = (name: string, checked: boolean) => {
    if (onAuthorChange) {
      const newAuthors = checked
        ? [...selectedAuthors, name]
        : selectedAuthors.filter((item) => item !== name);
      onAuthorChange(newAuthors);
    }
  };

  return (
    <aside className="space-y-8 rounded-3xl border border-border/40 bg-background/80 p-6 shadow-sm backdrop-blur">
      <div className="space-y-8">
        <ScrollArea className="h-96 pr-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => {
                const catId = `cat-${cat.slug}`;
                const isChecked = selectedCategory === cat.name;
                return (
                  <label
                    key={cat._id}
                    htmlFor={catId}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/20 px-3 py-2 text-sm text-foreground transition hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={catId}
                        checked={isChecked}
                        onCheckedChange={() => onCategoryChange?.(cat.name)}
                        className="rounded"
                      />
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {isChecked ? "Selected" : "Select"}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>

        <Accordion
          type="multiple"
          defaultValue={["price", "rating", "authors"]}
          className="space-y-3"
        >
          <AccordionItem
            value="authors"
            className="rounded-2xl border border-border/50 bg-background/60 px-4"
          >
            <AccordionTrigger className="px-0 py-3 text-sm font-medium text-foreground">
              By authors
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <ScrollArea className="max-h-60 pr-2">
                <div className="space-y-2">
                  {authorFilters.map((author) => {
                    const authorId = `author-${author.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`;
                    const isChecked = selectedAuthors.includes(author.name);

                    return (
                      <label
                        key={author.name}
                        htmlFor={authorId}
                        className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-sm text-foreground transition hover:bg-muted"
                      >
                        <span className="flex items-center gap-2">
                          <Checkbox
                            id={authorId}
                            checked={isChecked}
                            onCheckedChange={(checked) =>
                              handleAuthorSelection(author.name, checked === true)
                            }
                          />
                          <span>{author.name}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="price"
            className="rounded-2xl border border-border/50 bg-background/60 px-4"
          >
            <AccordionTrigger className="px-0 py-3 text-sm font-medium text-foreground">
              Price range
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  <span>Min ৳{priceRange[0]}</span>
                  <span>Max ৳{priceRange[1]}</span>
                </div>
                <Slider
                  min={200}
                  max={2000}
                  step={10}
                  value={priceRange}
                  onValueChange={(v) => onPriceChange?.([v[0], v[1]])}
                />
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  {priceRanges.map((range) => (
                    <Button
                      key={range.value}
                      variant="outline"
                      className="justify-center rounded-full border-border/60 px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary"
                      onClick={() => {
                        const [min, max] = range.value
                          .split("-")
                          .map((value) => Number(value));
                        onPriceChange?.([min, max]);
                      }}
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="rating"
            className="rounded-2xl border border-border/50 bg-background/60 px-4"
          >
            <AccordionTrigger className="px-0 py-3 text-sm font-medium text-foreground">
              Minimum rating
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                <StarRating
                  rating={selectedRating}
                  totalStars={5}
                  onRate={onRatingChange}
                  className="text-primary"
                  size={18}
                  gap={2}
                />
                <p className="text-xs text-muted-foreground">
                  Showing books rated {selectedRating || "any"} stars and above.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
