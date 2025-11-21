import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import PageLayout from '@/tools/PageLayout';

const quickLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Academic', href: '/collections/academic' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
];

const companyLinks = [
  { label: 'Help', href: '/help' },
  { label: 'About', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

const supportLinks = [
  { label: 'FAQs', href: '/support/faqs' },
  { label: 'Track Order', href: '/track-order' },
  { label: 'Returns & Refunds', href: '/support/returns' },
  { label: 'Shipping & Delivery', href: '/support/shipping' },
];

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/popylibrary.com.bd', icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/popylibrary.com.bd', icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/popylibrary.com.bd', icon: Linkedin },
  { label: 'YouTube', href: 'https://www.youtube.com/@popylibrary.com.bd', icon: Youtube },
];

const contactDetails = [
  {
    icon: Phone,
    label: 'Hotline',
    value: '+880 1763662180',
    href: 'tel:+8801763662180',
  },
  {
    icon: Mail,
    label: 'Support',
    value: 'hello@popylibrary.com',
    href: 'mailto:hello@popylibrary.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'House 56, Road 4, Dhanmondi, Dhaka',
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-muted/40">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/10" />
      <div className="relative">
        <PageLayout paddingSize='small' className='pt-12'>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="space-y-6">
              <div>
                <Link
                  href="/"
                  className="text-2xl font-bold tracking-tight text-foreground"
                >
                  Popy Library
                </Link>
                <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                  Bangladesh&apos;s trusted companion for academic success and
                  lifelong reading. Explore curated collections from Popy
                  Publications and beyond.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {socials.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target='blank'
                    aria-label={label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border/40 bg-background/80 text-muted-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:text-primary"
                  >
                    <Icon className="size-5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-6 text-sm text-muted-foreground">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target='blank'
                      className="transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-6 text-sm text-muted-foreground">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-6 text-sm text-muted-foreground">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
                Support
              </h4>
              <ul className="space-y-3">
                {supportLinks.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-t border-border/50 py-6 sm:grid-cols-2 lg:grid-cols-3">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="mt-1 inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {label}
                  </p>
                  {href ? (
                    <Link
                      href={href}
                      className="block text-sm font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      {value}
                    </Link>
                  ) : (
                    <p className="text-sm font-semibold text-foreground">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </PageLayout>

        <div className="border-t border-border/50">
          <PageLayout paddingSize="small" className="text-muted-foreground">
            <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} Popy Library. All rights reserved.
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                Developed by{' '}
                <span className="font-semibold text-foreground">
                  SmartEdge Technologies
                </span>
              </p>
              <div className="flex gap-4">
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-primary"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/sitemap"
                  className="transition-colors hover:text-primary"
                >
                  Sitemap
                </Link>
              </div>
            </div>
          </PageLayout>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
