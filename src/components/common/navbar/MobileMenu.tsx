'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { AuthUser } from '@/types';

interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  isProtected?: boolean;
}

interface MobileMenuProps {
  navigationItems: NavigationItem[];
  user: AuthUser | null;
}

const MobileMenu = ({ navigationItems, user }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Mobile menu for navigation and user profile.
        </SheetDescription>
        <div className="flex flex-col space-y-4">
          {/* Mobile User Profile */}
          <div className="flex items-center space-x-3 py-4.5 border-b px-4">
            <Avatar className="h-10 w-10 border">
              <AvatarImage
                src={user?.image}
                alt={user?.name || 'User avatar'}
              />
              <AvatarFallback>
                {getInitials(user?.name || 'User')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.name || 'User'}</p>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="px-4 space-y-4">
            {navigationItems.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 text-sm font-medium transition-colors py-2 px-4 rounded-md border ${
                    isActive
                      ? 'bg-secondary text-primary'
                      : 'text-foreground hover:bg-accent/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
