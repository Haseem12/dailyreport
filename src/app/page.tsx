
'use client';

import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <AppLayout pageTitle="Agent Dashboard">
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, Sales Agent!</CardTitle>
            <CardDescription>
              This is your dashboard. You can submit new stock reports for your customer visits here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                To get started, please navigate to the "New Report" page to fill out the daily stock check form for your latest customer visit.
              </p>
              <Button asChild>
                <Link href="/entry">
                  <FilePlus className="mr-2 h-4 w-4" />
                  Submit a New Report
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>A summary of your recent report submissions will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-8">
                    <p>No recent reports submitted.</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
