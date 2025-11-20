import Link from "next/link";
import PageLayout from "@/tools/PageLayout";
import CustomPagination from "@/components/common/custom-pagination/CustomPagination";
import { getOrders } from "@/services/order";
import OrderCard from "@/components/orders/OrderCard";
import { Order } from "@/types";

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
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default MyOrdersPage;
