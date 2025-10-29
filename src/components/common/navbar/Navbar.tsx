"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Home,
  Book,
  Calendar,
  ShoppingCart,
  Star,
  Info,
  Moon,
  Sun,
  Mail,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import MobileDropdown from "./MobileDropdown";
import DesktopDropdown from "./DesktopDropdown";
import { InfoToast } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Recipes", href: "/recipes", icon: Book, isProtected: true },
  {
    name: "Meal Planner",
    href: "/meal-planner",
    icon: Calendar,
    isProtected: true,
  },
  { name: "Grocery", href: "/grocery", icon: ShoppingCart, isProtected: true },
  { name: "Featured", href: "/featured", icon: Star, isProtected: false },
  { name: "About", href: "/about", icon: Info, isProtected: false },
  { name: "Contact", href: "/contact", icon: Mail, isProtected: false },
];

const Navbar = () => {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Fake auth/user state (replace with real Next.js auth integration later)
  const isLoading = false;
  const isLoggedIn = true; // toggle for demo
  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    profile_image: "/images/avatar.png",
  } as const;

  // Filter protected routes
  const protectedRoutes = navigationItems
    .filter((item) => item.isProtected)
    .map((item) => item.href);

  // Handle protected navigation
  const handleProtectedNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (protectedRoutes.includes(href) && !isLoggedIn) {
      e.preventDefault();
      InfoToast("Please login to access this page");
      return false;
    }
    return true;
  };

  // logout function
  const handleLogout = () => {
    // fake logout
    router.push("/");
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 xl:px-0">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/">
              <div className="relative h-12 md:h-14 w-auto overflow-hidden">
                <Image
                  src={"/logo.png"}
                  alt="Logo"
                  fill
                  priority
                  className="object-contain dark:brightness-150"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) =>
                      item.isProtected &&
                      handleProtectedNav(
                        e as unknown as React.MouseEvent<HTMLAnchorElement>,
                        item.href
                      )
                    }
                    className={`text-sm font-medium transition-colors hover:text-foreground ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="group relative rounded-full hidden md:flex p-0"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } mode`}
              >
                <Moon
                  className={`absolute h-5 w-5 transition-all ${
                    theme === "dark"
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }`}
                  aria-hidden="true"
                />
                <Sun
                  className={`h-5 w-5 transition-all ${
                    theme === "dark"
                      ? "scale-0 opacity-0"
                      : "scale-100 opacity-100"
                  }`}
                  aria-hidden="true"
                />
              </Button>
            )}
            {/* Heart Icon */}
            <Link
              href="/profile/my-favourite"
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  InfoToast("Please login to view favorites");
                }
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="hidden rounded-full md:flex"
              >
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Button>
            </Link>
            {/* Cart Icon */}
            <Link
              href="/profile/my-cart"
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  InfoToast("Please login to view cart");
                }
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="hidden rounded-full md:flex"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            {/* Desktop User Profile (md and up) */}
            <div className="hidden md:flex items-center space-x-2">
              <DesktopDropdown
                {...{ isLoading, isLoggedIn, user, handleLogout }}
              />
            </div>

            {/* Mobile User Profile (below md) */}
            <div className="md:hidden">
              <MobileDropdown
                {...{ isLoading, isLoggedIn, user, handleLogout }}
              />
            </div>

            {/* Mobile Menu */}
            <MobileMenu {...{ navigationItems, user }} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
