'use client';

import Lottie from 'lottie-react';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { signUpUser } from '@/services/Auth';
import { ErrorToast, SuccessToast } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import registerAnimation from '../../../public/lottie/register.json';

const registrationValidationSchema = z.object({
  name: z.string().min(1, { message: 'Full name is required.' }),

  address: z.string().min(1, { message: 'Address is required.' }),

  phone: z
    .string()
    .min(1, { message: 'Phone number is required.' })
    .regex(/^\+[1-9]\d{1,14}$/, {
      message:
        'Phone number must be in international format (e.g., +8801832639064).',
    }),

  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email address.' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(20, { message: 'Password must be at most 20 characters.' })
    .regex(
      /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\p{Nd})(?=.*[^\p{L}\p{N}\s])[^\s]{8,64}$/u,
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      }
    ),

  confirmPassword: z
    .string()
    .min(1, { message: 'Confirm password is required.' }),
});

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(previous => !previous);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(previous => !previous);

  const form = useForm({
    resolver: zodResolver(registrationValidationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const [password, confirmPassword] = useWatch({
    control: form.control,
    name: ['password', 'confirmPassword'] as const,
  });

  const handleSignupUser: SubmitHandler<FieldValues> = async data => {
    const payload = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await signUpUser(payload);

      if (res?.success) {
        SuccessToast(res?.message);
        router.push(
          '/auth/verify-otp?email=' +
            encodeURIComponent(data.email) +
            '&type=signup'
        );
      } else {
        ErrorToast(res.message);
      }
    } catch (err: unknown) {
      ErrorToast(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-linear-to-br from-background via-secondary/10 to-background">
      <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[460px] w-[460px] translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-[160px]" />

      <div className="relative z-10 mx-auto md:flex min-h-screen w-full max-w-6xl flex-col justify-center gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:gap-12 xl:px-8">
        <div className="hidden md:flex items-center justify-center lg:w-1/2">
          <div className="relative w-full max-w-md rounded-4xl border border-primary/20 bg-primary/5 p-6 shadow-inner lg:max-w-[620px]">
            <div className="pointer-events-none absolute inset-5 rounded-[40px] border border-primary/10" />
            <Lottie
              animationData={registerAnimation}
              loop
              className="relative z-10 w-full max-h-[500px] lg:max-h-[600px]"
              aria-label="Register illustration"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:flex lg:items-center">
          <Card className="rounded-4xl relative w-full max-w-lg overflow-hidden border-border/60 bg-background/90 shadow-2xl backdrop-blur mx-auto">
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
                <h2 className="text-3xl font-semibold text-foreground">
                  Let&apos;s get started
                </h2>
                <p className="text-sm text-muted-foreground">
                  Create your account to sync devices, access bundles, and
                  manage family reading goals.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSignupUser)}
                  className="mt-8 space-y-6"
                >
                  {/* Row 1: Name and Phone */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* FormField for name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            Full name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Khaled Siddique"
                              className="rounded-2xl border-border/40 bg-background/95 px-4 py-5"
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* FormField for phone */}
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
                              placeholder="+8801832639064"
                              className="rounded-2xl border-border/40 bg-background/95 px-4 py-5"
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 2: Address and Email */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* FormField for address */}
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
                              placeholder="Mohakhali, Dhaka"
                              className="rounded-2xl border-border/40 bg-background/95 px-4 py-5"
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* FormField for email */}
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
                              autoComplete="username"
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* FormField for password */}
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
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Create a secure password"
                              className="rounded-2xl border-border/40 bg-background/95 px-4 py-5 pr-12"
                              autoComplete="new-password"
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

                  {/* FormField for confirmPassword */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Create a secure password"
                              className="rounded-2xl border-border/40 bg-background/95 px-4 py-5 pr-12"
                              autoComplete="new-password"
                              {...field}
                              value={field.value || ''}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground transition hover:text-primary"
                              onClick={toggleConfirmPasswordVisibility}
                              aria-label={
                                showConfirmPassword
                                  ? 'Hide password'
                                  : 'Show password'
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="size-5" />
                              ) : (
                                <Eye className="size-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>

                        {confirmPassword && password !== confirmPassword ? (
                          <FormMessage> Password does not match </FormMessage>
                        ) : (
                          <FormMessage />
                        )}
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full rounded-full py-5 text-sm font-semibold uppercase tracking-[0.35em]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create account'}
                  </Button>
                </form>
              </Form>

              <Separator className="my-8" />

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="font-semibold text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
