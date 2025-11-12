'use client';

import Lottie from 'lottie-react';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
  // Chrome,
  Eye,
  EyeOff,
  // Facebook,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { signUpUser } from '@/services/Auth';
import { ErrorToast, SuccessToast } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import registerAnimation from '../../../../public/lottie/register.json';

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
    .min(8, { message: 'Password must be at least 8 characters.' })
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

const highlights: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Tailored study plans',
    description: 'Unlock syllabi-aligned reading lists for every class year.',
    icon: Sparkles,
  },
  {
    title: 'Collaborate with mentors',
    description:
      'Share progress with teachers and get curated workbook suggestions.',
    icon: HeartHandshake,
  },
  {
    title: 'Secure family library',
    description:
      'Manage multiple learners with OTP-secured checkout and reminders.',
    icon: ShieldCheck,
  },
  {
    title: 'Scholarship updates',
    description:
      'Receive alerts for national exams, Olympiads, and scholarship prep.',
    icon: GraduationCap,
  },
];

// const socials = [
//   { label: 'Continue with Google', icon: Chrome },
//   { label: 'Continue with Facebook', icon: Facebook },
// ];

const Register = () => {
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-12 xl:px-8">
        <div className="w-full space-y-10 text-center lg:text-left">
          <Badge
            variant="outline"
            className="mx-auto rounded-full border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary lg:mx-0"
          >
            Join the community
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Create your Popy Library account
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground lg:mx-0 lg:text-lg">
              Set up your learner profile to sync wishlists, track deliveries,
              and receive curated study support across Play Group to HSC.
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
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-xl rounded-3xl border border-border/50 bg-background/85 p-6 text-left shadow-lg backdrop-blur lg:mx-0">
            <p className="text-sm italic text-muted-foreground">
              “Registering our students on Popy Library made it effortless to
              keep every department stocked with the latest NCTB updates.”
            </p>
            <div className="mt-4 flex flex-col gap-1 text-xs uppercase tracking-[0.3em] text-muted-foreground/80 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-semibold normal-case tracking-normal text-foreground">
                Sharmeen Haque
              </span>
              <span>Academic Coordinator · Rajshahi Collegiate</span>
            </div>
            <div className="hidden md:flex w-full p-4 rounded-4xl border flex-col items-center gap-6 text-center lg:items-start lg:text-left">
              <Badge
                variant="outline"
                className="rounded-full border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary"
              >
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
                Create your account to sync wishlists, manage deliveries, and
                keep every learner in your family stocked with the latest
                syllabus-ready titles.
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
                        <FormItem className="space-y-2">
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

                    {/* FormField for address */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
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
    </div>
  );
};

export default Register;
