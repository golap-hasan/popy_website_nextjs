"use client"
import { Suspense, useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
// import {
//     useResendResetOTPMutation,
//     useResendSignupOTPMutation,
//     useVerifyOTPForResetPasswordMutation,
//     useVerifyOTPForSignupMutation
// } from "@/redux/feature/auth/authApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { ErrorToast } from "@/lib/utils";

const verificationSchema = z.object({
    code: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});

const VerifyOtpForm = () => {
    const searchParams = useSearchParams();
    const type = useMemo(() => searchParams.get("type") ?? "signup", [searchParams]);
    const email = useMemo(() => decodeURIComponent(searchParams.get("email") ?? ""), [searchParams]);
    const router = useRouter();
    const [cooldown, setCooldown] = useState(0);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(verificationSchema),
        mode: "onSubmit",
        defaultValues: {
            code: "",
        },
    });

    // Resend OTP Mutations
    // const [resendResetOTP, { isLoading: isResendResetLoading }] = useResendResetOTPMutation();
    // const [resendSignupOTP, { isLoading: isResendSignupLoading }] = useResendSignupOTPMutation();

    // Verify OTP Mutations
    // const [verifyOTPForSignup, { isLoading: isVerifyLoadingForSignup }] = useVerifyOTPForSignupMutation();
    // const [verifyOTPForResetPassword, { isLoading: isVerifyLoadingForResetPassword }] = useVerifyOTPForResetPasswordMutation();

    const onSubmit = async (data: z.infer<typeof verificationSchema>) => {
        const OTP = data.code;
        setStatus("idle");

        startTransition(async () => {
            try {
                if (type === "forget-password") {
                    // await verifyOTPForResetPassword({ code: OTP, email }).unwrap();
                    await new Promise((resolve) => setTimeout(resolve, 800));
                    router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
                } else {
                    // await verifyOTPForSignup({ activation_code: OTP, userEmail: email }).unwrap();
                    await new Promise((resolve) => setTimeout(resolve, 800));
                    router.push("/auth/login");
                }
            } catch (error) {
                console.error("OTP verification failed", error);
                setStatus("error");
                // ErrorToast(error?.data?.message || "Verification failed. Please try again.");
            }
        });
    };

    const handleResendOTP = async () => {
        if (cooldown > 0) return;

        try {
            if (type === "forget-password") {
                // await resendResetOTP({ email });
                await new Promise((resolve) => setTimeout(resolve, 500));
            } else {
                // await resendSignupOTP({ email });
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
            setCooldown(60);
            setStatus("success");
        } catch (error) {
            console.error("Failed to resend OTP", error);
            setStatus("error");
            // ErrorToast(error?.data?.message || "Failed to resend OTP");
        }
    };

    // Cooldown timer effect
    useEffect(() => {
        if (cooldown <= 0) return;

        const timer = setInterval(() => setCooldown(s => s - 1), 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    // Set initial cooldown
    useEffect(() => {
        setCooldown(5);
    }, []);

    // const isLoading = isVerifyLoadingForSignup || isVerifyLoadingForResetPassword || isResendResetLoading || isResendSignupLoading;
    // const isResendLoading = isResendResetLoading || isResendSignupLoading;

    return (
        <div className="w-full max-w-sm md:max-w-lg">
            <Card className="overflow-hidden p-0">
                <CardContent className="p-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 md:p-8">
                            <Link
                                href={type === "signup" ? "/auth/register" : "/auth/forgot-password"}
                                className="inline-flex items-center text-sm font-medium text-muted-foreground transition hover:text-primary"
                            >
                                <ArrowLeft className="mr-2 size-4" />
                                {type === "signup" ? "Back to sign up" : "Back to reset"}
                            </Link>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-semibold text-foreground">
                                        {type === "signup" ? "Verify your email" : "Check your inbox"}
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        We just sent a 6-digit code to {email || "your email"}. Enter it below to continue.
                                    </p>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="code"

                                    render={({ field }) => (
                                        <FormItem className="space-y-2 flex flex-col justify-center items-center">
                                            <FormLabel>Verification Code</FormLabel>
                                            <FormControl>
                                                <InputOTP
                                                    maxLength={6}
                                                    {...field}
                                                >
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                    </InputOTPGroup>
                                                    <InputOTPSeparator />
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full"
                                    loading={isPending}
                                    disabled={isPending}
                                >
                                    {isPending ? "Verifying..." : "Verify"}
                                </Button>

                                <div className="text-center text-sm">
                                    <span>Didn&apos;t receive code? </span>
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        disabled={cooldown > 0}
                                        className="text-primary hover:underline"
                                    >
                                        {cooldown > 0
                                            ? `Resend in ${cooldown}s`
                                            : 'Resend Code'}
                                    </button>
                                </div>

                                {status === "success" ? (
                                    <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                                        A fresh verification code is on its way. Give it a moment to arrive.
                                    </p>
                                ) : null}
                                {status === "error" ? (
                                    <p className="rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                                        Unable to process your request right now. Please try again shortly.
                                    </p>
                                ) : null}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

const VerifyOtp = () => {
    return (
        <Suspense fallback={<div className="flex w-full justify-center p-8 text-sm text-muted-foreground">Loading verification...</div>}>
            <VerifyOtpForm />
        </Suspense>
    );
};

export default VerifyOtp;