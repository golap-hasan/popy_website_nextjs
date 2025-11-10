"use client";

import Lottie from "lottie-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import registerAnimation from "../../../../public/lottie/register.json";

const registerSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required." }),
  email: z.string().min(1, { message: "Email is required." }).email({ message: "Invalid email address." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((previous) => !previous);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    const payload = {
      name: data.fullname,
      role: "USER",
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: data.password,
      confirmPassword: data.password,
    };
    console.log(payload);
    // register(payload);
  };

  return (
    <div className="relative w-full overflow-hidden bg-linear-to-br from-background via-secondary/10 to-background">
      <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[460px] w-[460px] translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-[160px]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-12 xl:px-8">
        <div className="hidden md:flex w-full p-4 rounded-4xl border flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Join Popy Library
          </Badge>
          <div className="relative w-full max-w-[620px] rounded-4xl border border-primary/20 bg-primary/5 p-6 shadow-inner">
            <div className="pointer-events-none absolute inset-5 rounded-[40px] border border-primary/10" />
            <Lottie
              animationData={registerAnimation}
              loop
              className="relative z-10 w-full max-h-[540px]"
              aria-label="Register illustration"
            />
          </div>
          <div className="max-w-lg rounded-4xl border p-4 text-sm text-muted-foreground">
            Create your account to sync wishlists, manage deliveries, and keep every learner in your family stocked with the latest syllabus-ready titles.
          </div>
        </div>

        <Card className="rounded-4xl relative w-full max-w-lg overflow-hidden border-border/60 bg-background/90 shadow-2xl backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-60" />
          <CardContent className="relative z-10">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Link href="/auth/login">
                  <ArrowLeft className="size-4" />
                </Link>
              </Button>
              <Link
                href="/support/faqs"
                className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground transition hover:text-primary"
              >
                Need help?
              </Link>
            </div>

            <div className="mt-8 space-y-2 text-center sm:text-left">
              <h2 className="text-3xl font-semibold text-foreground">Let’s get started</h2>
              <p className="text-sm text-muted-foreground">
                Create your account to sync devices, access bundles, and manage family reading goals.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Full name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jane Rahman"
                          className="rounded-2xl border-border/40 bg-background/95 px-4 py-5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="student@example.com"
                          className="rounded-2xl border-border/40 bg-background/95 px-4 py-5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Phone number
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          className="rounded-2xl border-border/40 bg-background/95 px-4 py-5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="House, road, city"
                          className="rounded-2xl border-border/40 bg-background/95 px-4 py-5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a secure password"
                            className="rounded-2xl border-border/40 bg-background/95 px-4 py-5 pr-12"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground transition hover:text-primary"
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full rounded-full py-5 text-sm font-semibold uppercase tracking-[0.35em]">
                  Create account
                </Button>
              </form>
            </Form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;