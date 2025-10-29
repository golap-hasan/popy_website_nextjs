"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CartItem } from "./cart-data";

type CartItemsTableProps = {
  items: CartItem[];
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
};

const CartItemsTable = ({
  items,
  onQuantityChange,
  onRemove,
}: CartItemsTableProps) => {
  return (
    <section>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/80 shadow-sm">
        <div className="border-b border-border/60 p-6">
          <h2 className="text-lg font-semibold text-foreground">
            Cart summary
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage the books you want to order. You can update quantities or
            remove items.
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[45%]">Item</TableHead>
              <TableHead className="w-[15%]">Price</TableHead>
              <TableHead className="w-[20%]">Quantity</TableHead>
              <TableHead className="w-[20%] text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  Your cart is empty. Continue shopping to add new books.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} className="align-top">
                  <TableCell>
                    <div className="flex gap-3">
                      <div className="relative hidden size-20 overflow-hidden rounded-xl border border-border/40 bg-muted/30 sm:block">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.variant}
                        </p>
                        <Button
                          variant="link"
                          className="px-0 text-xs text-muted-foreground hover:text-destructive"
                          onClick={() => onRemove(item.id)}
                        >
                          <Trash2 className="mr-1 size-3" /> Remove
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    ৳{item.price}
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-2 py-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={() => onQuantityChange(item.id, -1)}
                      >
                        <Minus className="size-3" />
                      </Button>
                      <Input
                        value={item.quantity}
                        readOnly
                        className="h-7 w-12 border-none bg-transparent p-0 text-center text-sm"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={() => onQuantityChange(item.id, 1)}
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold text-foreground">
                    ৳{item.price * item.quantity}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default CartItemsTable;
