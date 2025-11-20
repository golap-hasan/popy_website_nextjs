'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '@/tools/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { BookmarkCheck, ShoppingBag, Trash2, Eye, X } from 'lucide-react';
import { useAddToCart } from '@/hooks/useAddToCart';
import type { RootState, AppDispatch } from '@/redux/store';
import { removeFromWishlist } from '@/redux/feature/wishlist/wishListSlice';
import type { WishlistItem } from '@/redux/feature/wishlist/wishListSlice';
import type { Book } from '@/types/shop';

const FavoritePage = () => {
  const { handleAddToCart } = useAddToCart();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items as WishlistItem[]
  );

  // Use raw wishlist items directly; no fake status/category/description
  const wishlistBooks = useMemo(() => {
    return Array.isArray(wishlistItems) ? wishlistItems : [];
  }, [wishlistItems]);

  // For now all tabs show the same wishlist list; no fake status-based filtering
  const filteredBooks = useMemo(() => wishlistBooks, [wishlistBooks]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(bookId => bookId !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedIds([]);

  const handleMoveSelectedToCart = () => {
    if (!selectedIds.length) return;

    const booksToMove = wishlistBooks.filter(book =>
      selectedIds.includes(book.id)
    );

    booksToMove.forEach(book => {
      handleAddToCart(book as unknown as Book);
      dispatch(removeFromWishlist(book.id));
    });

    setSelectedIds([]);
  };

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
              <img
                src={book.coverImage}
                alt={`${book.title} cover`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-start gap-3">
              {/* Category / meta badges removed to avoid showing placeholder data */}
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-foreground md:text-xl">
                {book.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                by {book.author} · {book.price}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant="outline"
                className="gap-1.5 rounded-full border-border/60 hover:bg-primary/5"
              >
                <Link href={`/shop/${book.slug ?? book.id}`} className="flex items-center gap-1.5">
                  <Eye className="size-3.5" />
                  <span>View details</span>
                </Link>
              </Button>
              
              <Button
                onClick={() => handleAddToCart(book as unknown as Book)}
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-full border-border/60 hover:bg-primary/5"
              >
                <ShoppingBag className="size-3.5" />
                <span>Add to cart</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-full border-destructive/30 text-destructive hover:bg-destructive/5 hover:text-destructive"
                onClick={() => {
                  dispatch(removeFromWishlist(book.id));
                  setSelectedIds(prev => prev.filter(id => id !== book.id));
                }}
              >
                <X className="size-3.5" />
                <span>Remove</span>
              </Button>
            </div>
          </div>
        </article>
      );
    });
  };

  return (
    <PageLayout paddingSize="small" className='screen-height'>
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
            <Button
              variant="outline"
              className="gap-1.5 rounded-full"
              onClick={() => {
                if (selectedIds.length === wishlistBooks.length) {
                  setSelectedIds([]);
                } else {
                  setSelectedIds(wishlistBooks.map(book => book.id));
                }
              }}
            >
              <BookmarkCheck className="size-4" />
              <span>{selectedIds.length === wishlistBooks.length ? 'Deselect all' : 'Select all'}</span>
            </Button>
            
            <Button
              className="gap-1.5 rounded-full bg-primary hover:bg-primary/90"
              onClick={handleMoveSelectedToCart}
              disabled={!selectedIds.length}
            >
              <ShoppingBag className="size-4" />
              <span>Move selected to cart</span>
            </Button>
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

        <section className="max-w-5xl space-y-6">
          <Card className="border-border/60 bg-background/95">
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <BookmarkCheck className="size-4 text-primary" />
                  <span>
                    {selectedIds.length
                      ? `${selectedIds.length} selected — `
                      : null}
                    {filteredBooks.length} books saved
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                {renderBookList(filteredBooks)}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
};

export default FavoritePage;
