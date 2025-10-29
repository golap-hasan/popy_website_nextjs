import PageLayout from "@/tools/PageLayout";
import { Truck, ShieldCheck, Gift } from "lucide-react";

const highlights = [
  {
    title: "Fast Nationwide Delivery",
    description: "Receive your books anywhere in Bangladesh within 3-5 business days.",
    icon: Truck,
  },
  {
    title: "Guaranteed Authenticity",
    description: "We partner directly with publishers to ensure every copy is original.",
    icon: ShieldCheck,
  },
  {
    title: "Exclusive Member Rewards",
    description: "Earn points on every order and unlock seasonal gifts and discounts.",
    icon: Gift,
  },
];

const Highlights = () => {
  return (
      <PageLayout>
        <div className="grid gap-8 rounded-3xl bg-muted/40 backdrop-blur lg:grid-cols-3">
          {highlights.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="group relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </PageLayout>
  );
};

export default Highlights;
