"use client";

import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, Menu, Bot, PlusCircle, UserCog, LogOut, Users, Building, FileText } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { logout } from '@/app/admin/actions';

const agentNavItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/entry', icon: PlusCircle, label: 'New Report' },
];

const adminNavItems = [
    { href: '/admin', icon: UserCog, label: 'Overview' },
    { href: '/admin/reports', icon: FileText, label: 'Stock Reports' },
    { href: '/admin/agents', icon: Users, label: 'Manage Agents' },
    { href: '/admin/departments', icon: Building, label: 'Manage Departments' },
];

export default function Header({ pageTitle }: { pageTitle: string }) {
  const pathname = usePathname();

  const handleLogout = async () => {
     await logout();
  };

  const isAdminRoute = pathname.startsWith('/admin');
  const navItems = isAdminRoute ? adminNavItems : agentNavItems;
  const homeLink = isAdminRoute ? '/admin' : '/';

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href={homeLink}
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Bot className="h-6 w-6 text-primary" />
              <span className="">StockWatch</span>
            </Link>
            {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
                    pathname === item.href && 'bg-muted text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
            ))}
          </nav>
            <div className="mt-auto">
               <form action={logout}>
                  <Button variant="ghost" className="w-full justify-start mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
               </form>
            </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <h1 className="font-semibold text-xl">{pageTitle}</h1>
      </div>
    </header>
  );
}
