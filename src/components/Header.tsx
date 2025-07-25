
"use client";

import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, Menu, Package2, PlusCircle, UserCog, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { logoutAgent } from '@/app/login/actions';
import { logout } from '@/app/admin/login/actions';

const navItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/entry', icon: PlusCircle, label: 'New Report' },
  { href: '/admin', icon: UserCog, label: 'Admin' },
];

export default function Header({ pageTitle }: { pageTitle: string }) {
  const pathname = usePathname();

  const handleAgentLogout = async () => {
    await logoutAgent();
  };
  
  const handleAdminLogout = async () => {
    await logout();
  };

  const isAgentRoute = ['/', '/entry'].includes(pathname);
  const isAdminRoute = pathname.startsWith('/admin');

  // Don't render header on login pages
  if (pathname === '/admin/login' || pathname === '/login') {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">StockWatch</span>
            </Link>
            {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                    pathname === item.href && 'text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-2xl">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-2">
        {isAgentRoute && (
          <Button onClick={handleAgentLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout Agent
          </Button>
        )}
         {isAdminRoute && !pathname.includes('login') && (
            <form action={handleAdminLogout}>
                <Button variant="outline" size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout Admin
                </Button>
            </form>
        )}
      </div>
    </header>
  );
}
