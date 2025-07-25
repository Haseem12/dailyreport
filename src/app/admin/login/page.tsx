import AdminLoginForm from '@/components/AdminLoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package2 } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
             <Package2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tighter">StockWatch</h1>
        </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin & Department Login</CardTitle>
          <CardDescription>Enter your department credentials to access the admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
