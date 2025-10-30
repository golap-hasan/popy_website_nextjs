"use client";

import { useState } from "react";
import Link from "next/link";
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
  { label: "৳800+", value: "800+" },
];

const authorFilters = [
  { name: "Humayun Ahmed" },
  { name: "Zafar Iqbal" },
  { name: "Muhammed Zafar Iqbal" },
  { name: "Anisul Hoque" },
  { name: "Rabindranath Tagore" },
];

const publisherFilters = [
  { name: "Somoy Prokashoni" },
  { name: "Anonna Prokashoni" },
  { name: "Bishwa Sahitya Kendra" },
  { name: "Adarsha" },
  { name: "Pathak Shamabesh" },
];

const levelFilters = [
  {
    label: "Play Group",
  },
  {
    label: "Nursery",
  },
  {
    label: "KG",
  },
  {
    label: "Class One",
  },
  {
    label: "Class Two",
  },
  {
    label: "Class Three",
  },
  {
    label: "Class Four",
  },
  {
    label: "Class Five",
  },
  {
    label: "Class Six",
  },
  {
    label: "Class Seven",
  },
  {
    label: "Class Eight",
  },
  {
    label: "Class Nine",
  },
  {
    label: "SSC",
  },
  {
    label: "HSC",
  },
];

const FiltersSidebar = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 800]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const handlePriceChange = (values: number[]) => {
    if (values.length === 1) {
      setPriceRange([values[0], priceRange[1]]);
    } else {
      setPriceRange([values[0], values[1]]);
    }
  };

  const handleAuthorSelection = (name: string, checked: boolean) => {
    setSelectedAuthors((previous) => {
      if (checked) {
        return previous.includes(name) ? previous : [...previous, name];
      }
      return previous.filter((item) => item !== name);
    });
  };

  const handlePublisherSelection = (name: string, checked: boolean) => {
    setSelectedPublishers((previous) => {
      if (checked) {
        return previous.includes(name) ? previous : [...previous, name];
      }
      return previous.filter((item) => item !== name);
    });
  };

  const handleLevelSelection = (label: string, checked: boolean) => {
    setSelectedLevels((previous) => {
      if (checked) {
        return previous.includes(label) ? previous : [...previous, label];
      }
      return previous.filter((item) => item !== label);
    });
  };

  return (
    <aside className="space-y-8 rounded-3xl border border-border/40 bg-background/80 p-6 shadow-sm backdrop-blur">
      <div className="space-y-8">
        <ScrollArea className="h-96 pr-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Book levels
            </h3>
            <div className="space-y-2">
              {levelFilters.map((item) => {
                const levelId = `level-${item.label.toLowerCase().replace(/\s+/g, "-")}`;
                const isChecked = selectedLevels.includes(item.label);

                return (
                  <label
                    key={item.label}
                    htmlFor={levelId}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/20 px-3 py-2 text-sm text-foreground transition hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={levelId}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleLevelSelection(item.label, checked === true)
                        }
                        className="rounded"
                      />
                      <span>{item.label}</span>
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

        <Accordion type="multiple" defaultValue={["price", "rating"]} className="space-y-3">
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
            value="publishers"
            className="rounded-2xl border border-border/50 bg-background/60 px-4"
          >
            <AccordionTrigger className="px-0 py-3 text-sm font-medium text-foreground">
              By publishers
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <ScrollArea className="max-h-60 pr-2">
                <div className="space-y-2">
                  {publisherFilters.map((publisher) => {
                    const publisherId = `publisher-${publisher.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`;
                    const isChecked = selectedPublishers.includes(publisher.name);

                    return (
                      <label
                        key={publisher.name}
                        htmlFor={publisherId}
                        className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-sm text-foreground transition hover:bg-muted"
                      >
                        <span className="flex items-center gap-2">
                          <Checkbox
                            id={publisherId}
                            checked={isChecked}
                            onCheckedChange={(checked) =>
                              handlePublisherSelection(
                                publisher.name,
                                checked === true
                              )
                            }
                          />
                          <span>{publisher.name}</span>
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
                  onValueChange={handlePriceChange}
                />
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  {priceRanges.map((range) => (
                    <Button
                      key={range.value}
                      variant="outline"
                      className="justify-center rounded-full border-border/60 px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary"
                      onClick={() => {
                        const [min, max] = range.value.includes("+")
                          ? [Number(range.value.replace("+", "")), 1200]
                          : range.value.split("-").map((value) => Number(value));
                        setPriceRange([min, max]);
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
                  onRate={setSelectedRating}
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

          {/* <AccordionItem
            value="tags"
            className="rounded-2xl border border-border/50 bg-background/60 px-4"
          >
            <AccordionTrigger className="px-0 py-3 text-sm font-medium text-foreground">
              Popular tags
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {["SSC", "HSC", "BCS", "IELTS", "Story"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?tag=${tag.toLowerCase()}`}
                    className="inline-flex items-center rounded-full border border-primary/20 px-3 py-1 text-xs text-primary transition hover:bg-primary/10"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
