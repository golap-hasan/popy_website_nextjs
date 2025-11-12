'use client';

import Lottie from "lottie-react";
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PageLayout from '@/tools/PageLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  BookOpenCheck,
  // Chrome,
  Eye,
  EyeOff,
  // Facebook,
  GraduationCap,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { signInUser } from '@/services/Auth';
import { ErrorToast, SuccessToast } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import loginAnimation from "../../../../public/lottie/login.json";

const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

const highlights: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Stay exam-ready',
    description: 'Unlock your saved carts and personalised board exam picks.',
    icon: GraduationCap,
  },
  {
    title: 'Curated study feeds',
    description: 'Follow reading lists crafted by Popy editors and teachers.',
    icon: BookOpenCheck,
  },
  {
    title: 'Protected checkout',
    description: 'Secure OTP authentication keeps every purchase safeguarded.',
    icon: ShieldCheck,
  },
];

// const socials = [
//   { label: 'Continue with Google', icon: Chrome },
//   { label: 'Continue with Facebook', icon: Facebook },
// ];

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { setIsLoading } = useUser();

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleSignInUser = async (data: z.infer<typeof loginSchema>) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await signInUser(payload);

      if (res?.success) {
        SuccessToast(res?.message);
        setIsLoading(true);
        // router.refresh();
        router.push('/');
      } else {
        ErrorToast(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-linear-to-br from-background via-primary/5 to-background">
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/3 translate-y-1/3 rounded-full bg-secondary/20 blur-[140px]" />

      <PageLayout className="relative z-10 flex min-h-screen items-center py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8 text-center lg:text-left">
            <Badge
              variant="outline"
              className="mx-auto rounded-full border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary lg:mx-0"
            >
              Member access
            </Badge>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
                Sign in to keep learning with Popy Library
              </h1>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground lg:mx-0 lg:text-lg">
                Access your orders, wishlist, and personalised study
                recommendations crafted for Bangladeshi students from Play Group
                to HSC.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map(({ title, description, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-border/50 bg-background/80 p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="inline-flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="mt-3 space-y-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto max-w-xl rounded-3xl border border-border/50 bg-background/85 p-6 text-left shadow-lg backdrop-blur lg:mx-0">
              <p className="text-sm italic text-muted-foreground">
                “Popy&apos;s digital library keeps our JSC and SSC batches
                exam-ready. The curated bundles mean parents never have to guess
                what to buy.”
              </p>
              <div className="mt-4 flex flex-col gap-1 text-xs uppercase tracking-[0.3em] text-muted-foreground/80 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-semibold normal-case tracking-normal text-foreground">
                  Amina Rahman
                </span>
                <span>Coordinator · Khulna Model School</span>
              </div>
          <div className="flex w-full flex-col items-center gap-6 rounded-4xl border border-primary/20 bg-primary/5 p-4 text-center shadow-inner lg:items-start lg:text-left">

            <div className="relative w-full max-w-[540px] rounded-4xl p-6">
              <Lottie
                animationData={loginAnimation}
                loop
                className="relative z-10 w-full max-h-[420px]"
                aria-label="Login illustration"
              />
            </div>
          </div>

          <Card className="relative overflow-hidden border-border/60 bg-background/90 shadow-2xl backdrop-blur">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-60" />
            <CardContent className="relative z-10">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Link href="/">
                    <ArrowLeft className="size-4" />
                  </Link>
                </Button>
                <Link
                  href="/support/faqs"
                  className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground hover:text-primary"
                >
                  Need help?
                </Link>
              </div>

              <div className="mt-8 space-y-2 text-center sm:text-left">
                <h2 className="text-3xl font-semibold text-foreground">
                  Welcome back
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sign in with your email to pick up where you left off and
                  track every order.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSignInUser)}
                  className="mt-8 space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="student@example.com"
                            className="rounded-2xl border-border/40 bg-background/95 px-4 py-5"
                            autoComplete="username"
                            {...field}
                            value={field.value || ''}
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
                      <FormItem className="space-y-2">
                        <div className="flex items-center">
                          <FormLabel className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            Password
                          </FormLabel>
                          <Link
                            href="/auth/forgot-password"
                            className="ml-auto text-xs font-medium text-primary transition hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              className="rounded-2xl border-border/40 bg-background/95 px-4 py-5 pr-12"
                              autoComplete="current-password"
                              {...field}
                              value={field.value || ''}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground transition hover:text-primary"
                              onClick={togglePasswordVisibility}
                              aria-label={
                                showPassword ? 'Hide password' : 'Show password'
                              }
                            >
                              {showPassword ? (
                                <EyeOff className="size-5" />
                              ) : (
                                <Eye className="size-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full rounded-full py-5 text-sm font-semibold uppercase tracking-[0.35em]"
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </Form>

              <Separator className="my-8" />

              {/* <div className="space-y-3">
                {socials.map(({ label, icon: Icon }) => (
                  <Button
                    key={label}
                    type="button"
                    variant="outline"
                    className="w-full items-center justify-center gap-3 rounded-full border-border/50 py-5 text-sm"
                  >
                    <Icon className="size-5" />
                    {label}
                  </Button>
                ))}
              </div> */}

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/register"
                  className="font-semibold text-primary hover:underline"
                >
                  Create one now
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </div>
  );
};

export default LoginForm;
