
'use client';

import AdminLayout from '@/components/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import RegisterAgentForm from '@/components/RegisterAgentForm';
import StockReportDashboard from '@/components/StockReportDashboard';
import RegisterDepartmentForm from '@/components/RegisterDepartmentForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AgentList from '@/components/AgentList';
import DepartmentList from '@/components/DepartmentList';
import { Separator } from '@/components/ui/separator';


export default function AdminPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AdminLayout pageTitle="Admin Panel">
      <div className="flex justify-center items-start pt-8">
        <Tabs defaultValue="reports" className="w-full max-w-7xl">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="reports">Stock Reports</TabsTrigger>
              <TabsTrigger value="registerAgent">Manage Agents</TabsTrigger>
              <TabsTrigger value="registerDepartment">Manage Departments</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="reports">
            <StockReportDashboard />
          </TabsContent>
          <TabsContent value="registerAgent">
            <div className="space-y-6">
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
              <Separator />
              <AgentList />
            </div>
          </TabsContent>
           <TabsContent value="registerDepartment">
            <div className="space-y-6">
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
              <Separator />
              <DepartmentList />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
