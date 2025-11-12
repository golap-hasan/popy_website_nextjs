'use client';

import { useMemo, useState } from 'react';
import PageLayout from '@/tools/PageLayout';
import FiltersSidebar from './FiltersSidebar';
import ShopProducts, { SortOption } from './ShopProducts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter } from 'lucide-react';

const MobileFilters = () => {
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
            <FiltersSidebar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const ShopLayout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('popularity');
  const [resultsCount, setResultsCount] = useState<number>(0);

  useMemo(() => {
    switch (sortOption) {
      case 'newest':
        return 'Newest';
      case 'price_low_high':
        return 'Price: Low to High';
      case 'popularity':
      default:
        return 'Popularity';
    }
  }, [sortOption]);

  return (
    <PageLayout>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
        <div className="hidden lg:block lg:sticky lg:top-28 lg:h-fit">
          <FiltersSidebar />
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
                  : 'Browse curated books and refine with filters to match your reading goals.'}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:justify-end">
              <MobileFilters />
              <div className="flex w-full flex-col gap-1 md:w-64">
                <Label
                  htmlFor="shop-search"
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
                >
                  Search
                </Label>
                <Input
                  id="shop-search"
                  value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value)}
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
                  onValueChange={(value: SortOption) => setSortOption(value)}
                >
                  <SelectTrigger className="rounded-full text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent align="end" className="text-sm">
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price_low_high">
                      Price: Low to High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <ShopProducts
            searchTerm={searchTerm}
            sortOption={sortOption}
            onResultsChange={setResultsCount}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ShopLayout;
