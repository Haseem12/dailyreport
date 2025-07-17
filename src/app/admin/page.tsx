
'use client';

import AppLayout from '@/components/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import RegisterAgentForm from '@/components/RegisterAgentForm';
import StockReportDashboard from '@/components/StockReportDashboard';
import RegisterDepartmentForm from '@/components/RegisterDepartmentForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logout } from './login/actions';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <AppLayout pageTitle="Admin Panel">
      <div className="flex justify-center items-start pt-8">
        <Tabs defaultValue="reports" className="w-full max-w-7xl">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="reports">Stock Reports</TabsTrigger>
              <TabsTrigger value="registerAgent">Register Agent</TabsTrigger>
              <TabsTrigger value="registerDepartment">Register Department</TabsTrigger>
            </TabsList>
            {isClient && (
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            )}
          </div>
          <TabsContent value="reports">
            <StockReportDashboard />
          </TabsContent>
          <TabsContent value="registerAgent">
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
           <TabsContent value="registerDepartment">
            <Card>
              <CardHeader>
                <CardTitle>Register New Department</CardTitle>
                <CardDescription>
                  Create credentials for a department to view reports.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegisterDepartmentForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
