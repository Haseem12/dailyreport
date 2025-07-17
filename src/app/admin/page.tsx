import AppLayout from '@/components/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import RegisterAgentForm from '@/components/RegisterAgentForm';
import LoginAgentForm from '@/components/LoginAgentForm';
import StockReportDashboard from '@/components/StockReportDashboard';

export default function AdminPage() {
  return (
    <AppLayout pageTitle="Admin Panel">
      <div className="flex justify-center items-start pt-8">
        <Tabs defaultValue="reports" className="w-full max-w-7xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports">Stock Reports</TabsTrigger>
            <TabsTrigger value="register">Register Agent</TabsTrigger>
            <TabsTrigger value="login">Agent Login</TabsTrigger>
          </TabsList>
          <TabsContent value="reports">
            <StockReportDashboard />
          </TabsContent>
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
