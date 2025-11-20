"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StarRating } from "@/tools/StarRating";
import { postReview } from "@/services/review";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ErrorToast, SuccessToast } from "@/lib/utils";

const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Please select a rating" })
    .max(5, { message: "Rating must be between 1 and 5" }),
  review: z
    .string()
    .min(10, { message: "Review must be at least 10 characters" }),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  orderBooks?: Array<{
    book?: {
      title?: string;
    };
  }>;
}

const ReviewDialog = ({
  open,
  onOpenChange,
  orderId,
  orderBooks,
}: ReviewDialogProps) => {
  const router = useRouter();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      review: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      form.reset({
        rating: 0,
        review: "",
      });
    }
  }, [open, form]);

  const onSubmit = async (values: ReviewFormValues) => {
    try {
      const result = await postReview(orderId, {
        rating: values.rating,
        review: values.review.trim(),
      });

      if (result?.success) {
        SuccessToast("Review submitted successfully!");
        form.reset();
        onOpenChange(false);
        router.refresh();
      } else {
        ErrorToast(result?.message || "Failed to submit review");
      }
    } catch {
      ErrorToast("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with this order. Your feedback helps others
            make better decisions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <StarRating
                        rating={field.value}
                        onRate={field.onChange}
                        size={24}
                        className="flex-shrink-0"
                      />
                      {field.value > 0 && (
                        <span className="text-sm text-muted-foreground">
                          {field.value} out of 5
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience with this order..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {orderBooks && orderBooks.length > 0 && (
              <div className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
                <p className="font-medium mb-1">Order includes:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  {orderBooks.map((item, index) => (
                    <li key={index}>{item.book?.title || "Book"}</li>
                  ))}
                </ul>
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                Submit Review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;

