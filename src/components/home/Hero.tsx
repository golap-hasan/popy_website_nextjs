import {
  Search,
  BookOpen,
  Award,
  Star,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const categories = [
    {
      name: "Academic",
      count: "1,200+ Books",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      name: "Bangla Literature",
      count: "850+ Books",
      icon: <Award className="w-5 h-5" />,
    },
    {
      name: "Best Sellers",
      count: "500+ Books",
      icon: <Star className="w-5 h-5" />,
    },
  ];

  return (
    <section className="relative bg-linear-to-r from-background to-muted/50 py-16 md:py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover Your Next{" "}
              <span className="text-primary">
                Favorite Book
              </span>{" "}
              in Bangladesh
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Explore thousands of books from Bangladeshi authors and
              publishers. Get your favorite books delivered to your doorstep.
            </p>

            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto lg:mx-0">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for books, authors, or categories..."
                className="pl-12 pr-6 py-6 rounded-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background"
              />
              <Button
                size="lg"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6 h-10 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Search
              </Button>
            </div>

            {/* Categories */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-card text-card-foreground px-4 py-2 rounded-full shadow-sm border"
                >
                  <span className="text-primary">{category.icon}</span>
                  <div className="text-left">
                    <p className="text-sm font-medium">
                      {category.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {category.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Book showcase */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px]">
              <div className="absolute -right-8 -top-8 w-64 h-80 bg-primary/10 rounded-2xl transform rotate-6" />
              <div className="absolute -left-8 -bottom-8 w-64 h-80 bg-primary/5 rounded-2xl transform -rotate-6" />
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-56 h-80 bg-card text-card-foreground rounded-xl shadow-xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="h-3/5 bg-linear-to-br from-primary/20 to-primary/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/book-pattern.png')] opacity-5" />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-1 bg-white/30 rounded-full" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground line-clamp-2">
                      The Namesake
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Jhumpa Lahiri
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        ৳350
                      </span>
                      <Button size="sm" className="rounded-full">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-primary">
                10K+
              </h3>
              <p className="text-muted-foreground">Happy Readers</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">
                50K+
              </h3>
              <p className="text-muted-foreground">
                Books Available
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">
                100%
              </h3>
              <p className="text-muted-foreground">
                Authentic Books
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">
                24/7
              </h3>
              <p className="text-muted-foreground">
                Customer Support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
