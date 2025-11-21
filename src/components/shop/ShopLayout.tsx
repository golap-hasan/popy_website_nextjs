"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import PageLayout from "@/tools/PageLayout";
import FiltersSidebar from "./FiltersSidebar";
import ShopProducts, { SortOption } from "./ShopProducts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import CustomPagination from "../common/custom-pagination/CustomPagination";
import type { ApiMeta, Book, Category } from "@/types/shop";

type ShopLayoutProps = {
  initialBooks: Book[];
  initialMeta: ApiMeta;
  initialCategories: Category[];
};

type MobileFiltersProps = Parameters<typeof FiltersSidebar>[0];

const MobileFilters = (props: MobileFiltersProps) => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-2 rounded-full"
          >
            <Filter className="size-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] gap-0 p-0 sm:max-w-md">
          <SheetHeader className="border-b border-border px-6 pb-4 pt-6">
            <SheetTitle className="text-base font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Filters
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-3 pb-10 pt-5">
            <FiltersSidebar {...props} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const DEFAULT_MIN_PRICE = 200;
const DEFAULT_MAX_PRICE = 2000;

const ShopLayout = ({
  initialBooks,
  initialMeta,
  initialCategories,
}: ShopLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const replaceWithParams = (updater: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    updater(params);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const updateFilter = (key: string, value: string | undefined) => {
    replaceWithParams((params) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      if (key !== "page") {
        params.set("page", "1");
      }
    });
  };

  const searchTerm = searchParams.get("searchTerm") ?? "";
  const selectedCategory = searchParams.get("category") ?? "";
  const sortParam = searchParams.get("sort");
  const sortOption = (sortParam as SortOption) ?? "price";
  const currentPage = Number(searchParams.get("page") ?? "1");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const rating = searchParams.get("rating");
  // const authors = searchParams.get("authors");
  const publishers = searchParams.get("publishers");

  const priceRange: [number, number] = useMemo(
    () => [
      minPrice ? Number(minPrice) : DEFAULT_MIN_PRICE,
      maxPrice ? Number(maxPrice) : DEFAULT_MAX_PRICE,
    ],
    [minPrice, maxPrice]
  );
  const selectedRating = rating ? Number(rating) : 0;
  // const selectedAuthors = authors ? authors.split(",") : [];
  const selectedPublishers = publishers ? publishers.split(",") : [];

  const [searchInput, setSearchInput] = useState(searchTerm);
  const [priceInput, setPriceInput] = useState<[number, number]>(priceRange);

  useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setPriceInput(priceRange);
  }, [priceRange]);

  // Ensure a default sort is present in the URL so the Select shows a value initially
  useEffect(() => {
    if (!sortParam) {
      updateFilter("sort", "price");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortParam]);

  const totalPages = initialMeta.totalPage ?? 1;
  const resultsCount = initialMeta.total ?? 0;

  const updatePrice = (range: [number, number]) => {
    replaceWithParams((params) => {
      params.set("minPrice", String(range[0]));
      params.set("maxPrice", String(range[1]));
      params.set("page", "1");
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    updateFilter("searchTerm", e.target.value);
  };

  const handleCategoryChange = (slug: string) => {
    updateFilter("category", selectedCategory === slug ? undefined : slug);
  };

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceInput(newRange);
    updatePrice(newRange);
  };

  const handleRatingChange = (newRating: number) => {
    updateFilter("rating", newRating > 0 ? String(newRating) : undefined);
  };

  // const handleAuthorChange = (newAuthors: string[]) => {
  //   updateFilter(
  //     "authors",
  //     newAuthors.length > 0 ? newAuthors.join(",") : undefined
  //   );
  // };

  const handlePublisherChange = (newPublishers: string[]) => {
    updateFilter(
      "publishers",
      newPublishers.length > 0 ? newPublishers.join(",") : undefined
    );
  };

  const handlePageChange = (page: number) => {
    updateFilter("page", String(page));
  };

  const sidebarProps = {
    categories: initialCategories,
    selectedCategory,
    onCategoryChange: handleCategoryChange,
    priceRange: priceInput,
    onPriceChange: handlePriceChange,
    selectedRating,
    onRatingChange: handleRatingChange,
    // selectedAuthors,
    // onAuthorChange: handleAuthorChange,
    selectedPublishers,
    onPublisherChange: handlePublisherChange,
  };

  return (
    <PageLayout
      paddingSize="small"
      pagination={
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={handlePageChange}
        />
      }
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr] mb-6">
        <div className="hidden lg:block lg:sticky lg:top-28 lg:h-fit">
          <FiltersSidebar {...sidebarProps} />
        </div>
        <div className="space-y-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                All books
              </h2>
              <p className="text-sm text-muted-foreground">
                {resultsCount > 0
                  ? `${resultsCount} titles found — refine your search to get even closer to what you need.`
                  : "Browse curated books and refine with filters to match your reading goals."}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:justify-end">
              <MobileFilters {...sidebarProps} />
              <div className="flex w-full flex-col gap-1 md:w-64">
                <Label
                  htmlFor="shop-search"
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
                >
                  Search
                </Label>
                <Input
                  id="shop-search"
                  value={searchInput}
                  onChange={handleSearchChange}
                  placeholder="Search by title, author, or tag"
                  className="rounded-full"
                />
              </div>
              <div className="flex w-full flex-col gap-1 md:w-48">
                <Label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Sort by
                </Label>
                <Select
                  value={sortOption}
                  onValueChange={(value: SortOption) =>
                    updateFilter("sort", value)
                  }
                >
                  <SelectTrigger className="rounded-full text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent align="end" className="text-sm">
                    <SelectItem value="price">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="-price">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Rating: Low to high</SelectItem>
                    <SelectItem value="-rating">Rating: High to low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <ShopProducts books={initialBooks} />
        </div>
      </div>
    </PageLayout>
  );
};

export default ShopLayout;
