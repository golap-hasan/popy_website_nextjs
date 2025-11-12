'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import PageLayout from '@/tools/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  BookmarkCheck,
  Clock,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { curatedLists, savedBooks } from './favorite-data';

const FavoritePage = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const filteredBooks = useMemo(() => {
    if (activeTab === 'in-stock') {
      return savedBooks.filter(book => book.status === 'In stock');
    }
    if (activeTab === 'low-stock') {
      return savedBooks.filter(book => book.status === 'Low stock');
    }
    return savedBooks;
  }, [activeTab]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(bookId => bookId !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedIds([]);

  const renderBookList = (booksToRender = filteredBooks) => {
    if (!booksToRender.length) {
      return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border/50 bg-muted/10 p-10 text-center text-sm text-muted-foreground">
          <BookmarkCheck className="size-6 text-primary" />
          Nothing saved here yet. Explore the shop and tap the heart icon to
          keep books handy.
        </div>
      );
    }

    return booksToRender.map(book => {
      const statusStyles =
        book.status === 'Low stock'
          ? 'bg-orange-100 text-orange-600'
          : book.status === 'Pre-order'
          ? 'bg-blue-100 text-blue-600'
          : 'bg-emerald-100 text-emerald-600';

      return (
        <article
          key={book.id}
          className="group flex flex-col gap-4 rounded-3xl border border-border/50 bg-background/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:flex-row"
        >
          <div className="flex items-start gap-4 md:w-48">
            <Checkbox
              checked={selectedIds.includes(book.id)}
              onCheckedChange={() => toggleSelection(book.id)}
              className="mt-1"
              aria-label={`Select ${book.title}`}
            />
            <div className="relative h-40 w-28 overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
              <Image
                src={book.coverImage}
                alt={`${book.title} cover`}
                fill
                sizes="(min-width: 1024px) 180px, (min-width: 768px) 140px, 45vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-start gap-3">
              <Badge
                variant="secondary"
                className="rounded-full bg-primary/15 text-primary"
              >
                {book.category}
              </Badge>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <Clock className="size-3" /> {book.lastVisited}
              </span>
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]',
                  statusStyles
                )}
              >
                {book.status}
              </span>
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-foreground md:text-xl">
                {book.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                by {book.author} · {book.price}
              </p>
              <p className="text-sm text-muted-foreground/90">
                {book.description}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button size="sm" className="rounded-full">
                <Link href={`/shop/${book.id}`}>View details</Link>
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                Add to cart
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => toggleSelection(book.id)}
              >
                {selectedIds.includes(book.id) ? 'Remove' : 'Unsave'}
              </Button>
            </div>
          </div>
        </article>
      );
    });
  };

  return (
    <PageLayout paddingSize="small">
      <div className="space-y-12">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
              Favorite shelf
            </p>
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Save it, revisit it, finish it
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                Everything you&apos;ve shortlisted in one place. Organise by
                stock status, share with friends, and move books to your cart
                when you&apos;re ready to check out.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/cart">
              <Button className="rounded-full">
                <ShoppingBag className="mr-2 size-4" /> Move selected to cart
              </Button>
            </Link>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={clearSelection}
              disabled={!selectedIds.length}
            >
              <Trash2 className="mr-2 size-4" /> Clear selection
            </Button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Card className="border-border/60 bg-background/95">
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <BookmarkCheck className="size-4 text-primary" />
                  <span>
                    {selectedIds.length
                      ? `${selectedIds.length} selected — `
                      : null}
                    {filteredBooks.length} books saved
                  </span>
                </div>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="md:w-fit"
                >
                  <TabsList className="grid grid-cols-3 rounded-full bg-muted/30 p-1 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    <TabsTrigger
                      value="all"
                      className="rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="in-stock"
                      className="rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground"
                    >
                      In stock
                    </TabsTrigger>
                    <TabsTrigger
                      value="low-stock"
                      className="rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground"
                    >
                      Low stock
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Separator />

              <Tabs value={activeTab} className="space-y-6">
                <TabsContent value="all" className="space-y-4">
                  {renderBookList(filteredBooks)}
                </TabsContent>
                <TabsContent value="in-stock" className="space-y-4">
                  {renderBookList(
                    filteredBooks.filter(book => book.status === 'In stock')
                  )}
                </TabsContent>
                <TabsContent value="low-stock" className="space-y-4">
                  {renderBookList(
                    filteredBooks.filter(book => book.status === 'Low stock')
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border/60 bg-background/95">
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
                    Quick actions
                  </p>
                  <h2 className="text-xl font-semibold text-foreground">
                    Keep collecting what matters
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Export your list, set reminders, or explore curated shelves
                    that pair perfectly with what you love.
                  </p>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-muted/10 px-4 py-3 text-sm text-muted-foreground">
                    <BookOpen className="size-4 text-primary" /> Continue where
                    you left off
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-muted/10 px-4 py-3 text-sm text-muted-foreground">
                    <BookmarkCheck className="size-4 text-primary" /> Create a
                    reading routine
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-background/95">
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      Curated for you
                    </h3>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Refresh the shelf
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    Refresh
                  </Button>
                </div>
                <div className="space-y-4">
                  {curatedLists.map(list => (
                    <div
                      key={list.title}
                      className="rounded-3xl border border-border/40 bg-muted/20 p-5"
                    >
                      <div className="space-y-2">
                        <h4 className="text-base font-semibold text-foreground">
                          {list.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {list.description}
                        </p>
                      </div>
                      <Button size="sm" className="mt-3 rounded-full">
                        <Link href={list.href}>{list.ctaLabel}</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default FavoritePage;
