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
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
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
import { cartItems, calculateCartTotals } from "@/components/cart/cart-data";

const deliveryOptions = [
  {
    value: "standard",
    label: "Standard home delivery",
    description: "Delivered within 3-4 business days",
    fee: 70,
  },
  {
    value: "express",
    label: "Express delivery",
    description: "Delivered within 24 hours inside Dhaka",
    fee: 120,
  },
  {
    value: "pickup",
    label: "Store pickup",
    description: "Collect from Mirpur showroom between 10am-8pm",
    fee: 0,
  },
];

const paymentOptions = [
  {
    value: "cod",
    label: "Cash on delivery",
    helper: "Pay with cash when the order arrives",
  },
  {
    value: "bkash",
    label: "bKash",
    helper: "Secure instant payment via bKash gateway",
  },
  {
    value: "card",
    label: "Debit / Credit card",
    helper: "Visa, Mastercard, American Express supported",
  },
];

const districts = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

const CheckoutPage = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    district: districts[0],
    city: "",
    addressLine: "",
    postalCode: "",
    notes: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryOptions[0].value);
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0].value);

  const baseTotals = useMemo(() => calculateCartTotals(cartItems), []);
  const deliveryFee = useMemo(
    () =>
      deliveryOptions.find((option) => option.value === deliveryMethod)?.fee ??
      baseTotals.delivery,
    [deliveryMethod, baseTotals.delivery],
  );
  const total = baseTotals.subtotal - baseTotals.discount + deliveryFee;

  const isCartEmpty = cartItems.length === 0;

  return (
    <PageLayout paddingSize="small">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <Badge className="bg-primary/10 text-primary">Secure checkout</Badge>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Confirm order & delivery
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Provide your contact details, delivery address, and payment preference to complete your order.
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
                <CardTitle className="text-lg">Contact information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="checkout-email">Email address</Label>
                  <Input
                    id="checkout-email"
                    type="email"
                    placeholder="you@example.com"
                    value={contactInfo.email}
                    onChange={(event) =>
                      setContactInfo((prev) => ({ ...prev, email: event.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-phone">Phone number</Label>
                  <Input
                    id="checkout-phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={contactInfo.phone}
                    onChange={(event) =>
                      setContactInfo((prev) => ({ ...prev, phone: event.target.value }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Shipping address</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="checkout-name">Full name</Label>
                    <Input
                      id="checkout-name"
                      placeholder="Your full name"
                      value={shippingInfo.fullName}
                      onChange={(event) =>
                        setShippingInfo((prev) => ({ ...prev, fullName: event.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkout-district">District</Label>
                    <Select
                      value={shippingInfo.district}
                      onValueChange={(value) =>
                        setShippingInfo((prev) => ({ ...prev, district: value }))
                      }
                    >
                      <SelectTrigger id="checkout-district">
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-notes">Delivery notes (optional)</Label>
                  <Textarea
                    id="checkout-notes"
                    placeholder="Add instructions for the delivery partner"
                    value={shippingInfo.notes}
                    onChange={(event) =>
                      setShippingInfo((prev) => ({ ...prev, notes: event.target.value }))
                    }
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Delivery method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                  {deliveryOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4"
                    >
                      <RadioGroupItem value={option.value} id={`delivery-${option.value}`} className="mt-1" />
                      <Label htmlFor={`delivery-${option.value}`} className="cursor-pointer space-y-1">
                        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                          {option.label}
                          <Badge variant="outline" className="border-primary/40 text-xs text-primary">
                            ৳{option.fee}
                          </Badge>
                        </span>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Payment method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {paymentOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4"
                    >
                      <RadioGroupItem value={option.value} id={`payment-${option.value}`} className="mt-1" />
                      <Label htmlFor={`payment-${option.value}`} className="cursor-pointer space-y-1">
                        <span className="text-sm font-medium text-foreground">{option.label}</span>
                        <p className="text-xs text-muted-foreground">{option.helper}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/60 bg-background/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Order summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-3">
                  {cartItems.map((item) => (
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
                    <span className="font-medium text-foreground">৳{baseTotals.subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Discount</span>
                    <span className="font-medium text-emerald-600">-৳{baseTotals.discount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery fee</span>
                    <span className="font-medium text-foreground">৳{deliveryFee}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-base font-semibold text-foreground">
                  <span>Total to pay</span>
                  <span>৳{total}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button size="lg" disabled={isCartEmpty} className="w-full">
                  Place order now
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  By placing this order, you agree to our delivery & return policy.
                </p>
              </CardFooter>
            </Card>

            <Card className="border-dashed border-border/60 bg-background/60 shadow-none">
              <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
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
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CheckoutPage;
