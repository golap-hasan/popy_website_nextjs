import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/lib/utils";
import OrderReviewButton from "./OrderReviewButton";

type OrderBookItem = {
  quantity: number;
  unitPrice: number;
  book?: {
    title?: string;
    coverImage?: string;
    slug?: string;
  };
};

type Order = {
  _id: string;
  deliveryCharge: number;
  finalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  status: string;
  paymentStatus: string;
  deliveryStatus: string;
  books?: OrderBookItem[];
};

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Card className="border-border/60 bg-background/80 shadow-sm">
      <CardHeader className="flex flex-col gap-2 border-b border-border/40 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-sm font-semibold">
            Order #{order._id ?? ""}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Shipping to: {order.shippingAddress}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge
            variant="outline"
            className="border-primary/40 text-primary"
          >
            {order.status}
          </Badge>
          <Badge
            variant="outline"
            className="border-emerald-400/60 text-emerald-600"
          >
            Payment: {order.paymentStatus}
          </Badge>
          <Badge
            variant="outline"
            className="border-blue-400/60 text-blue-600"
          >
            Delivery: {order.deliveryStatus}
          </Badge>
          <span className="ml-1 text-xs font-semibold text-foreground">
            Total: ৳{order.finalAmount}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-3">
          {order.books?.map((item, index: number) => (
            <div
              key={`${order._id}-${index}`}
              className="flex gap-3 rounded-lg border border-border/40 bg-muted/10 p-3 text-xs sm:text-sm"
            >
              <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md border border-border/40 bg-muted/20">
                {item.book?.coverImage ? (
                  <Image
                    src={getImageUrl(item.book.coverImage)}
                    alt={item.book?.title ?? "Book cover"}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col justify-between gap-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <Link
                    href={
                      item.book?.slug ? `/shop/${item.book.slug}` : "#"
                    }
                    className="text-xs font-medium text-foreground hover:underline sm:text-sm"
                  >
                    {item.book?.title}
                  </Link>
                  <span className="text-xs font-semibold text-foreground">
                    ৳{item.unitPrice * item.quantity}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground sm:text-xs">
                  Qty {item.quantity} × ৳{item.unitPrice}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-border/60 pt-3">
          <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
            <span className="text-muted-foreground">
              Payment method:{" "}
              <span className="font-medium text-foreground">
                {order.paymentMethod}
              </span>
            </span>
            <span className="text-muted-foreground">
              Delivery charge:{" "}
              <span className="font-medium text-foreground">
                ৳{order.deliveryCharge}
              </span>
            </span>
          </div>
          <OrderReviewButton
            orderId={order._id}
            deliveryStatus={order.deliveryStatus}
            orderBooks={order.books}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;

