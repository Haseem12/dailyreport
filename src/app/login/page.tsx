
import Link from 'next/link';
import { Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginAgentForm from '@/components/LoginAgentForm';
import AdminLoginForm from '@/components/AdminLoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/20 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center gap-2 mb-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="p-3 bg-primary rounded-full">
                <Bot className="h-8 w-8 text-primary-foreground" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter">StockWatch</h1>
          <p className="text-muted-foreground">Welcome Back</p>
        </div>
        <Tabs defaultValue="agent" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="agent">Agent Login</TabsTrigger>
            <TabsTrigger value="department">Department Login</TabsTrigger>
          </TabsList>
          <TabsContent value="agent">
            <Card className="border-t-0 rounded-t-none">
              <CardHeader>
                <CardTitle className="text-2xl">Agent Portal</CardTitle>
                <CardDescription>Enter your agent credentials to access your dashboard.</CardDescription>
              </CardHeader>
              <CardContent>
                <LoginAgentForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="department">
            <Card className="border-t-0 rounded-t-none">
              <CardHeader>
                <CardTitle className="text-2xl">Department Portal</CardTitle>
                <CardDescription>Enter your department credentials to access the admin panel.</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminLoginForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="underline text-primary font-medium">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
