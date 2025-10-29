"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, type MouseEvent } from "react"
import { Heart, Home, Book, Calendar, ShoppingCart, Star, Info, Moon, Sun, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import Image from "next/image"
import MobileMenu from "./MobileMenu"
import MobileDropdown from "./MobileDropdown"
import DesktopDropdown from "./DesktopDropdown"
import { useTheme } from "next-themes"
import { cn, InfoToast } from "@/lib/utils"

const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Recipes", href: "/recipes", icon: Book, isProtected: true },
    { name: "Meal Planner", href: "/meal-planner", icon: Calendar, isProtected: true },
    { name: "Grocery", href: "/grocery", icon: ShoppingCart, isProtected: true },
    { name: "Featured", href: "/featured", icon: Star, isProtected: false },
    { name: "About", href: "/about", icon: Info, isProtected: false },
    { name: "Contact", href: "/contact", icon: Mail, isProtected: false },
]

const Navbar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { setTheme, theme } = useTheme();
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);


    const user = {
        name: 'Golap Hasan',
        email: 'golaphasan@gmail.com',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
    const token = "ifhuheufuesf"
    const isLoading = false;
    const isLoggedIn = !!token;

    // Filter protected routes
    const protectedRoutes = navigationItems
        .filter(item => item.isProtected)
        .map(item => item.href);

    // Handle protected navigation
    const handleProtectedNav = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
        if (protectedRoutes.includes(href) && !token) {
            event.preventDefault();
           InfoToast("Please login to access this page");
        }
    };

    // logout function
    const handleLogout = () => {
       // dispatch(Logout());
        router.push('/');
    };

    return (
        <nav className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="container max-w-7xl mx-auto px-4 xl:px-0">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-8">
                        <Link href="/">
                            <div className="h-10 md:h-10 w-auto overflow-hidden">
                                <Image
                                    src='/logo.png'
                                    alt="Logo"
                                    className="h-full w-full object-contain dark:brightness-150"
                                    fill
                                    priority
                                />
                            </div>
                        </Link>
                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navigationItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={(event) => handleProtectedNav(event, item.href)}
                                        className={cn(
                                            "text-sm font-medium transition-colors hover:text-foreground",
                                            isActive ? "text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4 z-50">
                        {/* Theme Toggle */}
                        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="rounded-full">
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        {/* Heart Icon */}
                        <Link
                            href="/profile/my-favourite"
                            onClick={(event) => {
                                if (!token) {
                                    event.preventDefault();
                                    InfoToast("Please login to view favorites");
                                }
                            }}
                        >
                            <Button variant="ghost" size="icon" className="hidden rounded-full md:flex">
                                <Heart className="h-5 w-5" />
                                <span className="sr-only">Favorites</span>
                            </Button>
                        </Link>

                        {/* Desktop User Profile (md and up) */}
                        <div className="hidden md:flex items-center space-x-2">
                            <DesktopDropdown {...{ isLoading, isLoggedIn, user, handleLogout }} />
                        </div>

                        {/* Mobile User Profile (below md) */}
                        <div className="md:hidden">
                            <MobileDropdown {...{ isLoading, isLoggedIn, user, handleLogout }} />
                        </div>

                        {/* Mobile Menu */}
                        <MobileMenu {...{ navigationItems, user }} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;