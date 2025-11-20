"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReviewDialog from "./ReviewDialog";

interface OrderReviewButtonProps {
  orderId: string;
  deliveryStatus: string;
  orderBooks?: Array<{
    book?: {
      title?: string;
    };
  }>;
}

const OrderReviewButton = ({
  orderId,
  deliveryStatus,
  orderBooks,
}: OrderReviewButtonProps) => {
  const [open, setOpen] = useState(false);

  if (deliveryStatus !== "Delivered") {
    return null;
  }

  return (
    <>
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        className="text-xs"
      >
        Write Review
      </Button>
      <ReviewDialog
        open={open}
        onOpenChange={setOpen}
        orderId={orderId}
        orderBooks={orderBooks}
      />
    </>
  );
};

export default OrderReviewButton;

