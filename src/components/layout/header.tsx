'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useLang, Lang } from '@/context/language-context';

const navItems = {
  en: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/events', label: 'Events' },
    { href: '/blog', label: 'Blog' },
  ],
  de: [
    { href: '/', label: 'Startseite' },
    { href: '/about', label: 'Über uns' },
    { href: '/events', label: 'Veranstaltungen' },
    { href: '/blog', label: 'Blog' },
  ],
  ar: [
    { href: '/', label: 'الرئيسية' },
    { href: '/about', label: 'من نحن' },
    { href: '/events', label: 'الفعاليات' },
    { href: '/blog', label: 'المدونة' },
  ],
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const currentNavItems = navItems[lang];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">MHG Erlangen</span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          {currentNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang(Lang.EN)}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang(Lang.DE)}>Deutsch</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang(Lang.AR)}>العربية</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full py-6">
                <div className="px-4 mb-8">
                  <Link
                    href="/"
                    className="flex items-center space-x-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Logo className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">MHG Erlangen</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 px-4">
                  {currentNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
