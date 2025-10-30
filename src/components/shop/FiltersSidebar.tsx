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
    children: ["Picture books", "Activity kits", "Learning cards"],
  },
  {
    label: "Nursery",
    children: ["Alphabet", "Coloring", "Early maths"],
  },
  {
    label: "KG",
    children: ["Phonics", "Story time", "Crafts"],
  },
  {
    label: "Class One",
    children: ["English", "Bangla", "Math", "Science"],
  },
  {
    label: "Class Two",
    children: ["English", "Bangla", "Math", "General knowledge"],
  },
  {
    label: "Class Three",
    children: ["English", "Bangla", "Math", "Science"],
  },
  {
    label: "Class Four",
    children: ["English", "Bangla", "Math", "Science"],
  },
  {
    label: "Class Five",
    children: ["PSC prep", "English", "Bangla", "Math"],
  },
  {
    label: "Class Six",
    children: ["Textbooks", "Guide books", "Model tests"],
  },
  {
    label: "Class Seven",
    children: ["Textbooks", "Guide books", "Workbooks"],
  },
  {
    label: "Class Eight",
    children: ["JSC prep", "Science", "Bangla", "Math"],
  },
  {
    label: "Class Nine",
    children: ["NCTB", "Model tests", "Guide books"],
  },
  {
    label: "SSC",
    children: ["Board questions", "Model tests", "Guide books"],
  },
  {
    label: "HSC",
    children: ["Board questions", "Suggestion", "Admission prep"],
  },
];

const FiltersSidebar = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 800]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);

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

  return (
    <aside className="space-y-8 rounded-3xl border border-border/40 bg-background/80 p-6 shadow-sm backdrop-blur">
      <div className="space-y-8">
        <ScrollArea className="h-96">
          <div className="space-y-3 mr-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Book levels
            </h3>
            <Accordion type="single" collapsible className="w-full space-y-1">
              {levelFilters.map((item) => (
                <AccordionItem
                  key={item.label}
                  value={item.label}
                  className="rounded-xl border border-border/50 bg-background/60 px-3"
                >
                  <AccordionTrigger className="rounded-xl px-0 py-3 text-sm font-medium text-foreground [&>svg]:size-4">
                    <span className="flex items-center gap-2">
                      <span className="text-primary">›</span>
                      {item.label}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {item.label} focuses
                    </p>
                    <div className="space-y-2">
                      {item.children.map((child) => (
                        <Button
                          key={child}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-between rounded-lg bg-muted/30 px-3 py-2 text-sm text-foreground hover:bg-muted"
                        >
                          <span>{child}</span>
                          <span className="text-xs text-muted-foreground">
                            Browse
                          </span>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>

        <ScrollArea className="h-64">
          <div className="space-y-3 mr-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              By authors
            </h3>
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
          </div>
        </ScrollArea>
        <ScrollArea className="h-64">
          <div className="space-y-3 mr-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              By publishers
            </h3>
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
          </div>
        </ScrollArea>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Price range
        </h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span>Min ৳{priceRange[0]}</span>
            <span>Max ৳{priceRange[1]}</span>
          </div>
          <Slider
            min={200}
            max={1200}
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
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Minimum rating
        </h3>
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

      <div className="space-y-3 rounded-2xl bg-primary/10 p-4 text-sm text-muted-foreground">
        <h4 className="text-sm font-semibold text-primary">Popular tags</h4>
        <div className="flex flex-wrap gap-2">
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
      </div>
    </aside>
  );
};

export default FiltersSidebar;
