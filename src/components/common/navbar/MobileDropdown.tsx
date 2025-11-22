"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  ListOrdered,
  LogIn,
  LogOutIcon,
  Moon,
  ShoppingCartIcon,
  Sun,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { getInitials } from "@/lib/utils";
import { useTheme } from "next-themes";
import { AuthUser } from "@/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

interface Props {
  isLoading: boolean;
  user: AuthUser | null;
  handleLogout: () => void;
}

const MobileDropdown = ({ isLoading, user, handleLogout }: Props) => {
  const cartCount = useSelector((state: RootState) => state.cart.totalQuantity);
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );
  const { setTheme, theme } = useTheme();
  return (
    <div className="flex gap-3 items-center">
      <Button variant="ghost" size="icon-lg" className="relative rounded-full">
        <Link href="/favorite">
          <Bookmark size={18} className="opacity-80" aria-hidden="true" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-2 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground shadow-sm">
              {wishlistCount > 9 ? "9+" : wishlistCount}
            </span>
          )}
        </Link>
      </Button>
      <Button variant="ghost" size="icon-lg" className="relative rounded-full">
        <Link href="/cart">
          <ShoppingCartIcon
            size={18}
            className="opacity-80"
            aria-hidden="true"
          />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground shadow-sm">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isLoading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <Avatar className="h-10 w-10 border">
              <AvatarImage
                src={user?.image || ""}
                alt={user?.name || "User avatar"}
              />
              <AvatarFallback>
                {getInitials(user?.name || "User")}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button variant="ghost" size="icon-lg" className="rounded-full">
              <User />
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64 mr-4">
          {isLoading ? (
            <div className="p-2 min-w-[200px]">
              <Skeleton className="h-4 w-28 rounded mb-2" />
              <Skeleton className="h-3 w-40 rounded" />
            </div>
          ) : user ? (
            <>
              <DropdownMenuLabel className="flex min-w-0 flex-col">
                <span className="text-foreground truncate text-sm font-medium">
                  {user?.name || "User"}
                </span>
                <span className="text-muted-foreground truncate text-xs font-normal">
                  {user?.email || ""}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full flex items-center">
                    <User
                      size={16}
                      className="opacity-60 mr-2"
                      aria-hidden="true"
                    />
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-orders" className="w-full flex items-center">
                    <ListOrdered
                      size={16}
                      className="opacity-60 mr-2"
                      aria-hidden="true"
                    />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/track-order"
                    className="w-full flex items-center"
                  >
                    <ListOrdered
                      size={16}
                      className="opacity-60 mr-2"
                      aria-hidden="true"
                    />
                    <span>Track Order</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <Sun size={16} className="opacity-60 mr-2" />
                  ) : (
                    <Moon size={16} className="opacity-60 mr-2" />
                  )}
                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOutIcon
                  size={16}
                  className="opacity-60 mr-2"
                  aria-hidden="true"
                />
                <span>Logout</span>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/auth/login" className="w-full flex items-center">
                  <LogIn
                    size={16}
                    className="opacity-60 mr-2"
                    aria-hidden="true"
                  />
                  <span>Login</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/auth/register"
                  className="w-full flex items-center"
                >
                  <UserPlus
                    size={16}
                    className="opacity-60 mr-2"
                    aria-hidden="true"
                  />
                  <span>Register</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun size={16} className="opacity-60 mr-2" />
                ) : (
                  <Moon size={16} className="opacity-60 mr-2" />
                )}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileDropdown;
