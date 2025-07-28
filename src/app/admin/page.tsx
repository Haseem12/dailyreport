'use client';

import AdminLayout from '@/components/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import RegisterAgentForm from '@/components/RegisterAgentForm';
import StockReportDashboard from '@/components/StockReportDashboard';
import RegisterDepartmentForm from '@/components/RegisterDepartmentForm';
import AgentList from '@/components/AgentList';
import DepartmentList from '@/components/DepartmentList';
import { Separator } from '@/components/ui/separator';
import { Users, Building, FileText, Activity, DollarSign } from 'lucide-react';


export default function AdminPage() {
  return (
    <AdminLayout pageTitle="Admin Dashboard">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,254</div>
                    <p className="text-xs text-muted-foreground">+50 this week</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">25</div>
                     <p className="text-xs text-muted-foreground">+2 new this month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Departments</CardTitle>
                    <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-muted-foreground">System-wide</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Product Issues</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">15 reported</div>
                     <p className="text-xs text-muted-foreground">Damaged or Expired</p>
                </CardContent>
            </Card>
        </div>
        <Tabs defaultValue="reports" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="reports">Stock Reports</TabsTrigger>
              <TabsTrigger value="agents">Manage Agents</TabsTrigger>
              <TabsTrigger value="departments">Manage Departments</TabsTrigger>
            </TabsList>
          <TabsContent value="reports" className="mt-6">
            <StockReportDashboard />
          </TabsContent>
          <TabsContent value="agents" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <AgentList />
                </div>
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
            </div>
          </TabsContent>
           <TabsContent value="departments" className="mt-6">
             <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    <DepartmentList />
                </div>
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
            </div>
          </TabsContent>
        </Tabs>
    </AdminLayout>
  );
}
