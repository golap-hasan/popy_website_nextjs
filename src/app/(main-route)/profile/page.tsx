import { Metadata } from "next";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  BookCopy,
  Heart,
  LogOut,
  MapPin,
  PackageSearch,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import PageLayout from "@/tools/PageLayout";

export const metadata: Metadata = {
  title: "Profile | Popy Publications",
  description:
    "Manage your account details, track orders, and explore personalised recommendations.",
};

const recommendedBooks = [
  {
    id: 1,
    title: "IELTS Writing Masterclass",
    author: "Redowan Hasan",
    price: "৳520",
    image: "/english.png",
  },
  {
    id: 2,
    title: "Science Olympiad Playbook",
    author: "Chotoder Biggan",
    price: "৳480",
    image: "/biggan.png",
  },
  {
    id: 3,
    title: "BCS Question Bank",
    author: "Notion Press",
    price: "৳690",
    image: "/banking.png",
  },
];

const orders = [
  {
    id: "#INV-2451",
    status: "Delivered",
    date: "24 Sep 2025",
    total: "৳1,780",
    items: 3,
  },
  {
    id: "#INV-2409",
    status: "In transit",
    date: "14 Sep 2025",
    total: "৳980",
    items: 2,
  },
  {
    id: "#INV-2384",
    status: "Processing",
    date: "03 Sep 2025",
    total: "৳1,120",
    items: 4,
  },
];

const quickLinks = [
  { label: "Track orders", icon: PackageSearch },
  { label: "Saved addresses", icon: MapPin },
  { label: "Payment methods", icon: Wallet },
  { label: "Wishlist", icon: Heart },
  { label: "Notifications", icon: Bell },
  { label: "Privacy & security", icon: ShieldCheck },
];

const ProfilePage = () => {
  return (
    <PageLayout paddingSize="small">
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-linear-to-br from-primary/5 via-background to-background p-6 shadow-sm lg:p-10">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-linear-to-br from-primary/10 via-primary/5 to-transparent blur-3xl lg:block" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="size-16 border-2 border-primary/40 shadow-md">
                <AvatarImage src="/user-avatar.png" alt="User avatar" />
                <AvatarFallback className="text-lg font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <Badge className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
                  Premium Reader
                </Badge>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Jane Doe
                </h1>
                <p className="text-sm text-muted-foreground">
                  jane@example.com · Member since 2022
                </p>
              </div>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2 lg:w-auto lg:grid-cols-3">
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm text-primary">
                <p className="text-xs uppercase tracking-[0.25em] text-primary/70">
                  Reading streak
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">21</span>
                  <span className="text-xs text-primary/70">days in a row</span>
                </div>
                <Progress value={70} className="mt-4 h-2 bg-primary/20" />
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/80 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Total books
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-foreground">
                    128
                  </span>
                  <span className="text-xs text-muted-foreground">
                    purchased
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/80 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Reward points
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-foreground">
                    2,450
                  </span>
                  <span className="text-xs text-muted-foreground">points</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/40">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="size-4 text-primary" />
                  Continue reading
                </CardTitle>
                <CardDescription>
                  Pick up right where you left off with curated recommendations
                  based on your recent reads.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 py-6 lg:grid-cols-3">
                {recommendedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="group flex h-full flex-col gap-3 rounded-xl border border-border/40 bg-background/80 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="relative overflow-hidden rounded-lg border border-border/40 bg-muted/20">
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={260}
                        height={340}
                        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {book.author}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {book.price}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-auto rounded-full"
                    >
                      Continue
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="border-b border-border/40">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookCopy className="size-4 text-primary" />
                  Recent orders
                </CardTitle>
                <CardDescription>
                  Track your purchases, check delivery status, and download
                  invoices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 py-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-border/30 bg-background/80 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                          {order.id}
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {order.items} items · {order.total}
                        </p>
                      </div>
                      <Badge className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {order.status}
                      </Badge>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Placed on {order.date}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full text-xs"
                      >
                        View details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/40">
                <CardTitle className="text-lg">Account hub</CardTitle>
                <CardDescription>
                  Manage preferences, security, and personal details.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 py-6">
                {quickLinks.map(({ label, icon: Icon }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    className="group flex w-full items-center justify-start gap-3 rounded-xl border border-transparent px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-primary/5"
                  >
                    <Icon className="size-4 text-muted-foreground transition group-hover:text-primary" />
                    <span className="flex-1 text-left text-foreground">
                      {label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Manage
                    </span>
                  </Button>
                ))}
              </CardContent>
              <Separator />
              <CardContent className="py-6">
                <Button
                  variant="outline"
                  className="flex w-full items-center justify-center gap-2 rounded-full"
                >
                  <LogOut className="size-4" />
                  Sign out
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="border-b border-border/40">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <PackageSearch className="size-4 text-primary" />
                  Reading insights
                </CardTitle>
                <CardDescription>
                  Your reading pattern for the past month.
                </CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <Tabs defaultValue="time" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="time">Time spent</TabsTrigger>
                    <TabsTrigger value="genres">Top genres</TabsTrigger>
                    <TabsTrigger value="formats">Preferred formats</TabsTrigger>
                  </TabsList>
                  <TabsContent value="time" className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Average daily reading</span>
                      <span className="text-foreground font-semibold">
                        1h 45m
                      </span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Weekly consistency</span>
                      <span className="text-foreground font-semibold">86%</span>
                    </div>
                    <Progress value={86} className="h-2" />
                  </TabsContent>
                  <TabsContent
                    value="genres"
                    className="space-y-3 text-sm text-muted-foreground"
                  >
                    <div className="flex items-center justify-between">
                      <span>Science & Tech</span>
                      <span className="text-foreground font-semibold">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span>Exam prep</span>
                      <span className="text-foreground font-semibold">33%</span>
                    </div>
                    <Progress value={33} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span>Storytelling</span>
                      <span className="text-foreground font-semibold">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </TabsContent>
                  <TabsContent
                    value="formats"
                    className="space-y-3 text-sm text-muted-foreground"
                  >
                    <div className="flex items-center justify-between">
                      <span>Print</span>
                      <span className="text-foreground font-semibold">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span>eBook</span>
                      <span className="text-foreground font-semibold">22%</span>
                    </div>
                    <Progress value={22} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span>Audio</span>
                      <span className="font-semibold text-foreground">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
