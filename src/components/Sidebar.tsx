"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlusCircle, UserCog, Bot, Users, Building, FileText, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { logout } from '@/app/admin/actions';

const agentNavItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/entry', label: 'New Report', icon: PlusCircle },
];

const adminNavItems = [
  { href: '/admin', icon: UserCog, label: 'Overview' },
  { href: '/admin/reports', icon: FileText, label: 'Stock Reports' },
  { href: '/admin/agents', icon: Users, label: 'Manage Agents' },
  { href: '/admin/departments', icon: Building, label: 'Manage Departments' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isLoginPage = pathname.includes('/login') || pathname.includes('/register');

  if (isLoginPage) {
    return null;
  }

  const isAdmin = pathname.startsWith('/admin');
  const homeLink = isAdmin ? '/admin' : '/';
  const navItems = isAdmin ? adminNavItems : agentNavItems;

  return (
     <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href={homeLink} className="flex items-center gap-2 font-semibold">
            <Bot className="h-6 w-6 text-primary" />
            <span className="">StockWatch</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
             {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname === item.href && 'bg-muted text-primary'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
           <form action={logout}>
              <Button variant="ghost" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>
        </div>
      </div>
    </div>
  );
}
