"use client";

import Lottie from "lottie-react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PageLayout from "@/tools/PageLayout";
import { postHelpFromAdmin } from "@/services/legal";
import helpCenterAnimation from "../../../public/lottie/Help Center.json";
import { ErrorToast } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Phone is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type FormValues = z.infer<typeof schema>;

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await postHelpFromAdmin(values);
      setSubmitted(true);
      form.reset();
    } catch (error) {
      ErrorToast(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to send message."
      );
    }
  };

  return (
    <section id="connect">
      <PageLayout className="grid gap-8 lg:grid-cols-1">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="border-border/60 bg-background/80 shadow-none">
              <CardHeader>
                <CardTitle className="text-lg">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="01XXXXXXXXX"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How can we help?</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Book bundles, workshops, partnerships..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share more details about your request or project"
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        type="submit"
                        size="lg"
                        className="sm:w-48"
                        disabled={form.formState.isSubmitting}
                        loading={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting
                          ? "Submitting..."
                          : "Submit message"}
                      </Button>
                      {submitted && (
                        <p className="text-xs text-emerald-600">
                          Thank you! Our team will get back to you within one
                          business day.
                        </p>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <div className="relative flex items-center justify-center rounded-3xl border border-dashed border-primary/30 bg-primary/5 px-4 py-6">
              <div className="pointer-events-none absolute inset-6 rounded-3xl border border-primary/10" />
              <Lottie
                animationData={helpCenterAnimation}
                loop
                className="relative z-10 max-h-[380px] w-full"
                aria-label="Contact team illustration"
              />
            </div>
          </div>

          <Card className="border-border/60 bg-muted/30 shadow-none">
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="text-base font-semibold text-foreground">
                  Quick links
                </p>
                <p>
                  Need order help right away? Reach out via phone or Messenger
                  for faster responses.
                </p>
              </div>
              <Separator />
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="font-semibold text-foreground">
                    Customer care:
                  </span>{" "}
                  +880 9606-787878
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Messenger:
                  </span>{" "}
                  m.me/popylibrary
                </li>
                <li>
                  <span className="font-semibold text-foreground">Email:</span>{" "}
                  support@popylibrary.com
                </li>
              </ul>
              <Separator />
              <div className="space-y-2 text-xs">
                <p className="font-semibold uppercase tracking-wide text-primary/70">
                  Office hours
                </p>
                <p>Sunday–Thursday · 10am – 7pm</p>
                <p>Friday · Closed · Saturday · 2pm – 8pm</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </section>
  );
};

export default ContactForm;
