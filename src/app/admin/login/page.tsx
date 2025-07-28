import AdminLoginForm from '@/components/AdminLoginForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
         <div className="flex flex-col items-center justify-center gap-4 mb-8">
             <Link href="/" className="flex items-center gap-2 font-semibold">
                <Bot className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold tracking-tighter">StockWatch</span>
             </Link>
        </div>
        <Card className="border-border">
            <CardHeader className="text-center">
            <CardTitle className="text-2xl">Department Login</CardTitle>
            <CardDescription>Enter your department credentials to access the admin panel.</CardDescription>
            </CardHeader>
            <CardContent>
            <AdminLoginForm />
            </CardContent>
            <CardFooter className="flex justify-center text-sm">
                <span>Don't have an account?&nbsp;</span>
                <Link href="/register" className="text-primary hover:underline font-semibold">
                    Register here
                </Link>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
