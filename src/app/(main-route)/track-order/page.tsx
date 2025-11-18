import type { Metadata } from "next";
import React from "react";
import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  Package,
  Truck,
  CheckCheck,
  CreditCard,
} from "lucide-react";
import { trackOrder } from "@/services/order";
import { format } from "date-fns";
import { TrackOrderForm } from "./TrackOrderForm";
import { StarRating } from "@/tools/StarRating";

export const metadata: Metadata = {
  title: "Track Order | Popy Library",
  description: "Track your order status and delivery updates",
};

const statusSteps = [
  {
    id: "processing",
    label: "Processing",
    icon: <Package className="h-5 w-5" />,
  },
  { id: "shipped", label: "Shipped", icon: <Truck className="h-5 w-5" /> },
  {
    id: "delivered",
    label: "Delivered",
    icon: <CheckCheck className="h-5 w-5" />,
  },
  {
    id: "completed",
    label: "Completed",
    icon: <CheckCircle className="h-5 w-5" />,
  },
];

interface TrackOrderPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const getStatusIndex = (status: string) => {
  const statusMap: Record<string, number> = {
    Processing: 0,
    Shipped: 1,
    Delivered: 2,
    Completed: 3,
  };
  return statusMap[status] || 0;
};

const TrackOrderPage = async ({ searchParams }: TrackOrderPageProps) => {
  const resolvedSearchParams = await searchParams;
  const rawOrderId = resolvedSearchParams?.orderId;
  const orderId = Array.isArray(rawOrderId) ? rawOrderId[0] : rawOrderId;

  let order: Order | null = null;
  let fetchError = "";

  if (orderId) {
    try {
      const result = await trackOrder(orderId as string);
      if (result?.success && result.data) {
        order = result.data as Order;
      } else {
        fetchError =
          result?.message ??
          "Order not found. Please check the order ID and try again.";
      }
    } catch {
      fetchError = "An error occurred while fetching order details.";
    }
  }

  return (
    <PageLayout paddingSize="small" className="screen-height">
      <div>
        <div className="space-y-2 text-center py-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Track Your Order
          </h1>
          <p className="text-muted-foreground">
            Enter your order ID to check the status of your order
          </p>
        </div>

        <Card className="border-border/50 bg-background/95">
          <CardContent>
            <TrackOrderForm
              initialOrderId={orderId ?? ""}
              serverError={fetchError}
            />

            {order && (
              <div className="mt-8 space-y-8">
                {/* Order Summary */}
                <div className="rounded-lg border p-6">
                  <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                    <div>
                      <h3 className="text-lg font-medium">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Placed on{" "}
                        {format(new Date(order.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-lg font-semibold">
                        ৳{order.finalAmount.toLocaleString()}
                      </p>
                      <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            order.status === "Completed"
                              ? "bg-green-500"
                              : order.status === "Processing"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <span>{order.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div className="mt-8">
                    <h4 className="mb-4 text-sm font-medium">Order Status</h4>
                    <div className="relative">
                      <div className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-border" />
                      <div className="space-y-8">
                        {statusSteps.map((step, index) => {
                          const currentStatusIndex = getStatusIndex(
                            order.status
                          );
                          const isCompleted = index <= currentStatusIndex;
                          const isCurrent = index === currentStatusIndex;

                          return (
                            <div key={step.id} className="relative flex gap-4">
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                  isCompleted
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                }`}
                              >
                                {React.cloneElement(step.icon, {
                                  className: `h-4 w-4 ${
                                    isCompleted
                                      ? "text-white"
                                      : "text-muted-foreground"
                                  }`,
                                })}
                              </div>
                              <div className="flex-1 pb-8">
                                <div className="flex items-center justify-between">
                                  <h4
                                    className={`text-sm font-medium ${
                                      isCompleted
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {step.label}
                                  </h4>
                                  {isCurrent && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                      <Clock className="h-3 w-3" />
                                      In Progress
                                    </span>
                                  )}
                                </div>
                                {isCurrent && order.updatedAt && (
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    Updated on{" "}
                                    {format(
                                      new Date(order.updatedAt),
                                      "MMM d, yyyy hh:mm a"
                                    )}
                                  </p>
                                )}
                                {step.id === "completed" && order.review && (
                                  <div className="mt-2 rounded-lg bg-muted/50 p-3">
                                    <div className="flex items-center gap-1">
                                      {/* {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < (order.rating ?? 0)
                                              ? 'fill-yellow-400 text-yellow-400'
                                              : 'text-muted-foreground'
                                          }`}
                                        />
                                      ))} */}
                                      <StarRating
                                        rating={order.rating ?? 0}
                                        totalStars={5}
                                      />
                                    </div>
                                    <p className="mt-1 text-sm">
                                      {order.review}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-sm font-medium">
                        Shipping Address
                      </h3>
                      <address className="not-italic text-muted-foreground">
                        <p className="text-sm">{order.shippingAddress}</p>
                      </address>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-sm font-medium">
                        Payment Method
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                          {order.paymentMethod === "COD" ? (
                            <span className="text-sm font-medium">COD</span>
                          ) : (
                            <CreditCard className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {order.paymentMethod === "COD"
                              ? "Cash on Delivery"
                              : "Credit/Debit Card"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.paymentStatus}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Order Items</h3>
                  <div className="space-y-4">
                    {order.books.map((item: OrderItem, index: number) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Book ID: {item.book}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          ৳{item.unitPrice.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Subtotal
                      </span>
                      <span className="text-sm">
                        ৳{order.totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Delivery Charge
                      </span>
                      <span className="text-sm">
                        ৳{order.deliveryCharge.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between border-t pt-2 text-base font-medium">
                      <span>Total</span>
                      <span>৳{order.finalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

// Types
interface OrderItem {
  book: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  _id: string;
  user: string;
  books: OrderItem[];
  totalPrice: number;
  deliveryCharge: number;
  finalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  status: string;
  paymentStatus: string;
  deliveryStatus: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  review?: string;
}

export default TrackOrderPage;
