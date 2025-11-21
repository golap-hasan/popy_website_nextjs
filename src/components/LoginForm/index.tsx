'use client';

import Lottie from 'lottie-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { signInUser } from '@/services/Auth';
import { ErrorToast, SuccessToast } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import loginAnimation from '../../../public/lottie/login.json';

const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

// const socials = [
//   { label: 'Continue with Google', icon: Chrome },
//   { label: 'Continue with Facebook', icon: Facebook },
// ];

const LoginForm = ({ redirectPath }: { redirectPath: string }) => {
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
        //       router.push('/');
        if (redirectPath) {
          router.push(redirectPath);
        } else {
          router.push('/');
        }
      } else {
        ErrorToast(res.message);
      }
    } catch (err: unknown) {
      ErrorToast(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-linear-to-br from-background via-secondary/10 to-background">
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/3 translate-y-1/3 rounded-full bg-secondary/20 blur-[140px]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:gap-12 xl:px-8">
        <div className="flex items-center justify-center lg:w-1/2">
          <div className="relative w-full max-w-md rounded-4xl border border-primary/20 bg-primary/5 p-6 shadow-inner lg:max-w-[620px]">
            <div className="pointer-events-none absolute inset-5 rounded-[40px] border border-primary/10" />
            <Lottie
              animationData={loginAnimation}
              loop
              className="relative z-10 w-full max-h-[500px] lg:max-h-[600px]"
              aria-label="Login illustration"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:flex lg:items-center">
          <Card className="rounded-4xl relative w-full max-w-lg overflow-hidden border-border/60 bg-background/90 shadow-2xl backdrop-blur mx-auto">
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </Form>

              <Separator className="my-8" />

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
      </div>
    </div>
  );
};

export default LoginForm;
