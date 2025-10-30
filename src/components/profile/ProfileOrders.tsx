import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookCopy } from "lucide-react";

const orders = [
  {
    id: "#INV-2451",
    status: "Delivered",
    date: "24 Sep 2025",
    total: "৳1,780",
    items: 3,
  },
  {
    id: "#INV-2409",
    status: "In transit",
    date: "14 Sep 2025",
    total: "৳980",
    items: 2,
  },
  {
    id: "#INV-2384",
    status: "Processing",
    date: "03 Sep 2025",
    total: "৳1,120",
    items: 4,
  },
];

const ProfileOrders = () => {
  return (
    <Card className="border-border/50">
      <CardHeader className="border-b border-border/40">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookCopy className="size-4 text-primary" />
          Recent orders
        </CardTitle>
        <CardDescription>
          Track your purchases, check delivery status, and download invoices.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-border/30 bg-background/80 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {order.id}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {order.items} items · {order.total}
                </p>
              </div>
              <Badge className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {order.status}
              </Badge>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Placed on {order.date}</span>
              <Button variant="ghost" size="sm" className="rounded-full text-xs">
                View details
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProfileOrders;
