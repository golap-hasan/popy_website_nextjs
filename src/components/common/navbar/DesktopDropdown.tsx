'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { LogIn, LogOutIcon, User, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getInitials } from '@/lib/utils';
import { AuthUser } from '@/types';

interface Props {
  isLoading: boolean;
  user: AuthUser | null;
  handleLogout: () => void;
}

const DesktopDropdown = ({ isLoading, user, handleLogout }: Props) => {
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="w-24 h-4" />
              </div>
            ) : (
              <Button
                variant="ghost"
                className="flex items-center space-x-2 h-10 p-0"
              >
                <Avatar className="h-10 w-10 border">
                  <AvatarImage
                    src={user?.image || ''}
                    alt={user?.name || 'User avatar'}
                  />
                  <AvatarFallback>
                    {getInitials(user?.name || 'User')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {user?.name || 'User'}
                </span>
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{user?.name || 'User'}</span>
                <span className="text-xs text-muted-foreground font-normal">
                  {user?.email || ''}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/auth/login" className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/register" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Sign up</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default DesktopDropdown;
