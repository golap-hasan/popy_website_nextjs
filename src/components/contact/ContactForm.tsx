"use client";

import Lottie from "lottie-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/tools/PageLayout";

import helpCenterAnimation from "../../../public/lottie/Help Center.json";

const initialState = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
};

const ContactForm = () => {
  const [formState, setFormState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof typeof initialState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setFormState(initialState);
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
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Full name</Label>
                      <Input
                        id="contact-name"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={(event) =>
                          handleChange("name", event.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="you@example.com"
                        value={formState.email}
                        onChange={(event) =>
                          handleChange("email", event.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Phone number</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={formState.phone}
                        onChange={(event) =>
                          handleChange("phone", event.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-topic">How can we help?</Label>
                      <Input
                        id="contact-topic"
                        placeholder="Book bundles, workshops, partnerships..."
                        value={formState.topic}
                        onChange={(event) =>
                          handleChange("topic", event.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Share more details about your request or project"
                      value={formState.message}
                      onChange={(event) =>
                        handleChange("message", event.target.value)
                      }
                      rows={5}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="submit" size="lg" className="sm:w-48">
                      Submit message
                    </Button>
                    {submitted && (
                      <p className="text-xs text-emerald-600">
                        Thank you! Our team will get back to you within one
                        business day.
                      </p>
                    )}
                  </div>
                </form>
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
