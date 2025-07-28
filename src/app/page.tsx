'use client';

import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus, BarChart, Clock } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
      <AppLayout pageTitle="Agent Dashboard">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Welcome, Sales Agent!</CardTitle>
              <CardDescription>
                This is your central hub for managing stock reports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Ready to file a new report? Click the button below to get started on your latest customer visit.
                </p>
                <Button asChild size="lg">
                  <Link href="/entry">
                    <FilePlus className="mr-2" />
                    Submit a New Report
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Reports This Month</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+5 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Last Report Submitted</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 days ago</div>
                 <p className="text-xs text-muted-foreground">at Shoprite Lekki</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>A summary of your recent report submissions will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-12">
                    <p>No recent reports submitted.</p>
                </div>
            </CardContent>
        </Card>
      </AppLayout>
  );
}
