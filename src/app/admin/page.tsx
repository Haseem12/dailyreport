import AppLayout from '@/components/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import RegisterAgentForm from '@/components/RegisterAgentForm';
import LoginAgentForm from '@/components/LoginAgentForm';

export default function AdminPage() {
  return (
    <AppLayout pageTitle="Admin Panel">
      <div className="flex justify-center items-start pt-8">
        <Tabs defaultValue="register" className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="register">Register Agent</TabsTrigger>
            <TabsTrigger value="login">Agent Login</TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register New Agent</CardTitle>
                <CardDescription>
                  Fill out the form below to add a new sales agent to the system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegisterAgentForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Agent Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginAgentForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
