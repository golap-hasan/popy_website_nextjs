"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { InfoToast } from "@/lib/utils";

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

  const handlePlaceOrder = () => {
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

    // TODO: Replace this with an actual API call when backend is ready.
    console.log("Checkout order payload", payload);
  };

  return (
    <PageLayout paddingSize="small" className="screen-height">
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
