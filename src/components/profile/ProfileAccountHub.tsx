import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  PackageSearch,
  MapPin,
  Wallet,
  Heart,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import LogoutButton from '../LogoutButton';

const quickLinks = [
  { label: 'Track orders', icon: PackageSearch, href: '/track-order' },
  { label: 'Saved addresses', icon: MapPin, href: '/profile/update-profile' },
  { label: 'Payment methods', icon: Wallet, href: '/profile/update-profile' },
  { label: 'Wishlist', icon: Heart, href: '/favorite' },
  { label: 'Privacy & security', icon: ShieldCheck, href: '/privacy' },
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
        {quickLinks.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'group flex w-full items-center justify-start gap-3 rounded-xl border border-transparent px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-primary/5'
            )}
          >
            <Icon className="size-4 text-muted-foreground transition group-hover:text-primary" />
            <span className="flex-1 text-left text-foreground">{label}</span>
            <span className="text-xs text-muted-foreground">Manage</span>
          </Link>
        ))}
      </CardContent>
      <Separator />
      <CardContent className="py-6">
        <LogoutButton />
      </CardContent>
    </Card>
  );
};

export default ProfileAccountHub;
