"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required." }).email({ message: "Invalid email address." }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgetPassword = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsSubmitting(true);
    setStatus("idle");

    try {
      // TODO: Replace with real API call once auth services are wired up.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.info("Password reset email requested", data.email);
      setStatus("success");
    } catch (error) {
      console.error("Failed to request password reset", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-lg">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 md:p-8">
              <Link href="/auth/login" className="inline-flex items-center text-sm font-medium text-muted-foreground transition hover:text-primary">
                <ArrowLeft className="mr-2 size-4" />
                Back to login
              </Link>

              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-semibold text-foreground">Forgot your password?</h1>
                <p className="text-sm text-muted-foreground">
                  Enter the email associated with your account and we’ll send you a secure reset link.
                </p>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {status === "success" ? (
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                  If that email exists in our system, a reset link is on its way. Check your inbox (and spam just in case).
                </p>
              ) : null}
              {status === "error" ? (
                <p className="rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  Something went wrong while requesting the reset link. Please try again in a moment.
                </p>
              ) : null}

              <Button type="submit" className="w-full" loading={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Get reset link"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPassword;