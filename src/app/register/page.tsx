
import RegisterAdminForm from '@/components/RegisterAdminForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package2 } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md">
            <div className="flex flex-col items-center justify-center gap-4 mb-8">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Package2 className="h-8 w-8 text-primary" />
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
            </Card>
        </div>
    </div>
  );
}
