"use client";

import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, Menu, Bot, PlusCircle, UserCog, LogOut, LogIn } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


const agentNavItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/entry', icon: PlusCircle, label: 'New Report' },
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
        description: "Logout functionality is disabled.",
    });
  };

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname.includes('/login') || pathname.includes('/register');
  const isAgentLoggedIn = !isLoginPage && !isAdminRoute;
  const isAdminLoggedIn = isAdminRoute && !isLoginPage;

  let navItems = isAdminRoute ? adminNavItems : agentNavItems;
  let homeLink = isAdminRoute ? '/admin' : '/';

  if (isLoginPage) {
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
              <Bot className="h-5 w-5 transition-all group-hover:scale-110" />
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
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex-1">
         <h1 className="text-xl font-semibold md:text-2xl">{pageTitle}</h1>
      </div>
    </header>
  );
}
