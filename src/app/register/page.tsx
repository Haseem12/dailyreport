
import RegisterAdminForm from '@/components/RegisterAdminForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Building, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function RegisterPage() {
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
                 <p className="text-muted-foreground">Create an Account</p>
            </div>
            <Tabs defaultValue="department" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="department">Department</TabsTrigger>
                    {/* Agent registration is done via admin panel, but a public page could exist */}
                    {/* <TabsTrigger value="agent">Agent</TabsTrigger> */}
                </TabsList>
                <TabsContent value="department">
                    <Card className="border-t-0 rounded-t-none">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl flex items-center justify-center gap-2">
                                <Building className="h-6 w-6" />
                                Register Department
                            </CardTitle>
                            <CardDescription>Create credentials for a new department to access reports.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RegisterAdminForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                 {/* <TabsContent value="agent">
                     <Card className="border-t-0 rounded-t-none">
                        <CardHeader className="text-center">
                        <CardTitle className="text-2xl flex items-center justify-center gap-2">
                            <UserPlus className="h-6 w-6" />
                            Register as Agent
                        </CardTitle>
                        <CardDescription>Create your sales agent account.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p className="text-center text-sm text-muted-foreground">Agent registration is handled by an administrator.</p>
                        </CardContent>
                    </Card>
                </TabsContent> */}
            </Tabs>
             <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="underline text-primary font-medium">
                    Login here
                </Link>
            </div>
        </div>
    </div>
  );
}
