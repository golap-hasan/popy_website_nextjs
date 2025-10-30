import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, PackageSearch, MapPin, Wallet, Heart, Bell, ShieldCheck } from "lucide-react";

const quickLinks = [
  { label: "Track orders", icon: PackageSearch },
  { label: "Saved addresses", icon: MapPin },
  { label: "Payment methods", icon: Wallet },
  { label: "Wishlist", icon: Heart },
  { label: "Notifications", icon: Bell },
  { label: "Privacy & security", icon: ShieldCheck },
];

const ProfileAccountHub = () => {
  return (
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
            <span className="flex-1 text-left text-foreground">{label}</span>
            <span className="text-xs text-muted-foreground">Manage</span>
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
  );
};

export default ProfileAccountHub;
