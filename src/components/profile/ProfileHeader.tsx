'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/UserContext';

const ProfileHeader = () => {
  const { user } = useUser();
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-linear-to-br from-primary/5 via-background to-background p-6 shadow-sm lg:p-10">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-linear-to-br from-primary/10 via-primary/5 to-transparent blur-3xl lg:block" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="size-16 border-2 border-primary/40 shadow-md">
            <AvatarImage src={user?.image} alt="User avatar" />
            <AvatarFallback className="text-lg font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {user?.name || 'Jane Doe'}
            </h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:w-auto">
          <Link
            href="/profile/update-profile"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'rounded-full px-6'
            )}
          >
            Edit profile
          </Link>
          <Button className="rounded-full px-6">
            <Link href="/my-orders">Manage orders</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
