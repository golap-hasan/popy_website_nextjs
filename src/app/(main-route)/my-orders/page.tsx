import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/tools/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CustomPagination from "@/components/common/custom-pagination/CustomPagination";
import { getOrders } from "@/services/order";
import { getImageUrl } from "@/lib/utils";

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

type OrdersPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

const MyOrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const params = await searchParams;
  const page = params.page ?? "1";
  const limit = params.limit ?? "4";

  const result = await getOrders(page, limit);
  const orders: Order[] = Array.isArray(result?.data) ? result.data : [];
  const meta = result?.meta ?? {};

  if (orders.length === 0) {
    return (
      <PageLayout
        paddingSize="small"
        className="screen-height"
      >
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm font-medium text-foreground">
            You don't have any orders yet.
          </p>
          <p className="text-xs text-muted-foreground">
            Browse the shop and place your first order.
          </p>
          <Link
            href="/shop"
            className="mt-2 inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            Go to shop
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      paddingSize="small"
      className="screen-height"
      pagination={
        Number(meta.totalPage) > 1 && (
          <CustomPagination
            totalPages={Number(meta.totalPage) || 0}
            currentPage={Number(meta.page) || Number(page) || 1}
            syncWithUrl
          />
        )
      }
    >
      <div className="flex flex-col gap-6 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              My orders
            </h1>
            <p className="text-xs text-muted-foreground">
              View your recent orders, their status, and book details.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card
              key={order._id}
              className="border-border/60 bg-background/80 shadow-sm"
            >
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

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-border/60 pt-3 text-[11px] sm:text-xs">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default MyOrdersPage;
