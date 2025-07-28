import RegisterAdminForm from '@/components/RegisterAdminForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
            <div className="flex flex-col items-center justify-center gap-4 mb-8">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Bot className="h-8 w-8 text-primary" />
                    <span className="text-3xl font-bold tracking-tighter">StockWatch</span>
                </Link>
            </div>
            <Card>
                <CardHeader className="text-center">
                <CardTitle className="text-2xl">Register New Department</CardTitle>
                <CardDescription>Create credentials for a new department to access reports.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterAdminForm />
                </CardContent>
                 <CardFooter className="flex justify-center text-sm">
                    <span>Already have an account?&nbsp;</span>
                    <Link href="/admin/login" className="text-primary hover:underline font-semibold">
                        Login here
                    </Link>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
