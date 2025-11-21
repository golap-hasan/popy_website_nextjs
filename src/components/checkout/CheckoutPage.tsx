"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import PageLayout from "@/tools/PageLayout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter as DialogFooterRoot,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { ErrorToast, InfoToast, SuccessToast } from "@/lib/utils";
import { placeOrder } from "@/services/order";

const divisions = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

const CheckoutPage = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    division: divisions[0],
    city: "",
    addressLine: "",
    postalCode: "",
  });

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discount = 0;

    let delivery = 0;
    if (subtotal < 1599) {
      delivery = shippingInfo.division === "Dhaka" ? 70 : 130;
    }

    const total = subtotal - discount + delivery;

    return {
      subtotal,
      discount,
      delivery,
      total,
    };
  }, [items, shippingInfo.division]);

  const isCartEmpty = items.length === 0;

  const handlePlaceOrder = async () => {
    const hasAllAddress =
      Boolean(shippingInfo.division) &&
      Boolean(shippingInfo.city.trim()) &&
      Boolean(shippingInfo.addressLine.trim()) &&
      Boolean(shippingInfo.postalCode.trim());

    if (!hasAllAddress) {
      InfoToast("Please fill in all shipping address fields");
      return;
    }

    const books = items.map((item) => ({
      book: item.id,
      quantity: item.quantity,
    }));

    const parts = [
      shippingInfo.addressLine,
      shippingInfo.city,
      shippingInfo.division,
      shippingInfo.postalCode,
    ].filter(Boolean);

    const shippingAddress = parts.join(", ");

    const payload = {
      books,
      shippingAddress,
      paymentMethod: "COD" as const,
    };
    try {
      const res = await placeOrder(payload);
      if (res?.success) {
        SuccessToast("Order completed successfully");
        setIsSuccessOpen(true);
      } else {
        ErrorToast(res?.message || "Failed to place order");
      }
    } catch {
    }
  };

  return (
    <PageLayout paddingSize="small" className="screen-height">
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-2xl border-primary/40">
          <DialogHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <DialogTitle className="text-xl sm:text-2xl">
              Thank you! Your order is confirmed
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Weve received your order and will start preparing your books for delivery.
              A confirmation has been sent with all the details.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 text-sm sm:grid-cols-[1.5fr,1fr] items-start">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wide text-primary/80">
                Order items
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-lg bg-background/80 px-3 py-2 shadow-sm ring-1 ring-border/60"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      			৳{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-xl bg-background/90 p-4 shadow-sm ring-1 ring-primary/30">
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-primary/80">
                  Order summary
                </p>
                <p className="text-2xl font-semibold text-foreground">
                  ৳{totals.total}
                </p>
                <p className="text-xs text-muted-foreground">
                  Includes books and delivery charges
                </p>
              </div>

              <Separator />

              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    ৳{totals.subtotal}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery fee</span>
                  <span className="font-medium text-foreground">
                    ৳{totals.delivery}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">Delivery address</p>
                <p>
                  {shippingInfo.addressLine && `${shippingInfo.addressLine}, `}
                  {shippingInfo.city && `${shippingInfo.city}, `}
                  {shippingInfo.division && `${shippingInfo.division} `}
                  {shippingInfo.postalCode && `- ${shippingInfo.postalCode}`}
                </p>
              </div>
            </div>
          </div>

          <DialogFooterRoot className="mt-2 flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setIsSuccessOpen(false)}
            >
              Continue browsing
            </Button>
            <Button className="w-full sm:w-auto">
              <Link href="/my-orders">View my orders</Link>
            </Button>
          </DialogFooterRoot>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-3">
            <Badge className="bg-primary/10 text-primary">Secure checkout</Badge>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Confirm order & delivery
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Provide your delivery address to complete your order.
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <Link href="/cart">Back to cart</Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
          <div className="space-y-6">
            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Shipping address</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="checkout-district">Division</Label>
                    <Select
                      value={shippingInfo.division}
                      onValueChange={(value) =>
                        setShippingInfo((prev) => ({ ...prev, division: value }))
                      }
                    >
                      <SelectTrigger id="checkout-district">
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                      <SelectContent>
                        {divisions.map((division) => (
                          <SelectItem key={division} value={division}>
                            {division}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="checkout-city">City / Upazila</Label>
                    <Input
                      id="checkout-city"
                      placeholder="City or upazila"
                      value={shippingInfo.city}
                      onChange={(event) =>
                        setShippingInfo((prev) => ({ ...prev, city: event.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkout-postcode">Postal code</Label>
                    <Input
                      id="checkout-postcode"
                      placeholder="e.g., 1216"
                      value={shippingInfo.postalCode}
                      onChange={(event) =>
                        setShippingInfo((prev) => ({ ...prev, postalCode: event.target.value }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-address">Address</Label>
                  <Textarea
                    id="checkout-address"
                    placeholder="House, road, area details"
                    value={shippingInfo.addressLine}
                    onChange={(event) =>
                      setShippingInfo((prev) => ({ ...prev, addressLine: event.target.value }))
                    }
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Payment method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    COD
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Cash on delivery</p>
                    <p className="text-xs text-muted-foreground">
                      Pay in cash when your books are delivered to your doorstep.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Our delivery partner will confirm your order on arrival. Please try to keep the exact amount ready.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Order summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-xs text-muted-foreground">
                  <p>
                    <span className="font-semibold text-primary">Delivery inside Dhaka:</span> ৳70 &nbsp;·&nbsp;
                    <span className="font-semibold text-primary">Outside Dhaka:</span> ৳130.
                  </p>
                  <p className="mt-1">
                    Orders of <span className="font-semibold text-foreground">৳1,599</span> or more (excluding delivery) qualify for
                    <span className="font-semibold text-primary"> free home delivery</span>.
                  </p>
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        ৳{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">৳{totals.subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery fee</span>
                    <span className="font-medium text-foreground">৳{totals.delivery}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-base font-semibold text-foreground">
                  <span>Total to pay</span>
                  <span>৳{totals.total}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button
                  size="lg"
                  disabled={isCartEmpty} 
                  className="w-full"
                  onClick={handlePlaceOrder}
                >
                  Place order now
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  By placing this order, you agree to our delivery & return policy.
                </p>
              </CardFooter>
            </Card>

            {/* <Card className="border-dashed border-border/60 bg-background/60 shadow-none">
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p className="text-sm font-semibold text-foreground">Need assistance?</p>
                <p>
                  Our support team is available 9am-10pm daily. Call
                  <span className="font-medium text-foreground"> +880 9606-787878 </span>
                  or message us on Messenger for faster help.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Link href="/contact">Contact support</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary">
                    <Link href="/faq">Delivery FAQ</Link>
                  </Button>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CheckoutPage;
