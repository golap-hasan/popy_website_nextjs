"use client";

import Link from "next/link";
import PageLayout from "@/tools/PageLayout";
import CartItemsTable from "./CartItemsTable";
import CartSummaryCard from "./CartSummaryCard";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { RootState, AppDispatch } from "@/redux/store";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/feature/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  // const [couponCode, setCouponCode] = useState("");

  const isCartEmpty = items.length === 0;

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find((cartItem) => cartItem.id === id);
    if (!item) return;

    const nextQuantity = Math.max(1, item.quantity + delta);
    if (nextQuantity === item.quantity) return;

    dispatch(updateQuantity({ id, quantity: nextQuantity }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // const handleApplyCoupon = () => {
  //   // Placeholder interaction – integrate with backend/cart API when ready.
  //   if (!couponCode) return;
  //   // For now just clear the input to acknowledge application.
  //   setCouponCode("");
  // };

  return (
    <PageLayout paddingSize="small" className="screen-height">
      <div className="space-y-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-primary/10 text-primary">Free delivery over ৳1,500</Badge>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">Your cart</h1>
              <p className="text-sm text-muted-foreground">
                Review your selected books, apply coupons, and get ready to checkout.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{items.length} item{items.length !== 1 ? "s" : ""} in cart</span>
              <Separator orientation="vertical" className="hidden h-5 lg:block" />
              <Button variant="ghost" size="sm" disabled={isCartEmpty} onClick={handleClearCart}>
                Clear cart
              </Button>
              <Link href="/shop" className="text-primary hover:underline">
                Continue shopping
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.5fr]">
          <CartItemsTable
            items={items}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />

          <div className="space-y-6">
            <CartSummaryCard items={items} />

            {/* <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Coupon & offers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Input
                    value={couponCode}
                    onChange={(event) => setCouponCode(event.target.value)}
                    placeholder="Enter promo code"
                    className="sm:flex-1"
                  />
                  <Button
                    variant="secondary"
                    className="sm:w-32"
                    disabled={!couponCode}
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Have a student account? Use code <span className="font-medium text-foreground">STUDENT15</span> to
                  unlock extra savings.
                </p>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CartPage;
