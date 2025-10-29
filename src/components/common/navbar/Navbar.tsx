"use client";

import { useState, useEffect } from "react";
import {
  Home,
  Store,
  Sparkles,
  Moon,
  Sun,
  Mail,
  ShoppingCartIcon,
  Info,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import MobileDropdown from "./MobileDropdown";
import DesktopDropdown from "./DesktopDropdown";
import { cn, InfoToast } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import PageLayout from "@/tools/PageLayout";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: Store },
  { name: "Collections", href: "/collections", icon: Sparkles },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
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
      <div className="px-4 lg:px-0">
        <PageLayout paddingSize="none">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/">
              <div className="relative h-12 md:h-14 w-32 md:w-40 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  priority
                  className="object-contain object-left dark:brightness-150"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const isActive = item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex items-center justify-center text-sm font-semibold transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="relative z-10 px-1 py-0.5">{item.name}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-1 -bottom-1 h-1 rounded-full bg-primary transition-all duration-300",
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                      )}
                    />
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
              href="/favorite"
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
                <Bookmark className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Button>
            </Link>
            {/* Cart Icon */}
            <Link
              href="/cart"
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
      </PageLayout>
      </div>
    </nav>
  );
};

export default Navbar;
