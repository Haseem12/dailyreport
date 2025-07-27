
"use client";

import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, Menu, Package2, PlusCircle, UserCog, LogOut, LogIn } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


const agentNavItems = [
  { href: '/', icon: Home, label: 'Dashboard', protected: true },
  { href: '/entry', icon: PlusCircle, label: 'New Report', protected: false },
];

const adminNavItems = [
    { href: '/admin', icon: UserCog, label: 'Admin Panel' },
];

export default function Header({ pageTitle }: { pageTitle: string }) {
  const pathname = usePathname();
  const { toast } = useToast();

  const handleLogout = () => {
     toast({
        title: "Logout Clicked",
        description: "Logout functionality is disabled for static export.",
    });
  };

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/login' || pathname.startsWith('/admin/login') || pathname.startsWith('/register');
  const isAgentLoggedIn = !isLoginPage && !isAdminRoute;
  const isAdminLoggedIn = isAdminRoute;

  let navItems;
  let homeLink;

  if (isAdminRoute) {
    navItems = adminNavItems;
    homeLink = '/admin';
  } else {
    navItems = agentNavItems;
    homeLink = '/';
  }

  if (pathname === '/admin/login' || pathname === '/register') {
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
              href={homeLink}
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
             {(isAgentLoggedIn || isAdminLoggedIn) && (
              <div onClick={handleLogout} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground cursor-pointer">
                  <LogOut className="h-5 w-5" />
                  <button type="button">Logout</button>
              </div>
            )}
            {!isAgentLoggedIn && !isAdminRoute && (
               <Link href="/login" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <LogIn className="h-5 w-5" />
                  Agent Login
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex-1">
         <h1 className="text-lg font-semibold md:text-2xl">{pageTitle}</h1>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        {(isAgentLoggedIn || isAdminLoggedIn) && (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
        )}
        {!isAgentLoggedIn && !isAdminRoute && (
             <Button asChild size="sm" variant="outline">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Agent Login
                </Link>
            </Button>
        )}
         {!isAdminLoggedIn && isAdminRoute && (
             <Button asChild size="sm" variant="outline">
                <Link href="/admin/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Admin Login
                </Link>
            </Button>
        )}
      </div>
    </header>
  );
}
