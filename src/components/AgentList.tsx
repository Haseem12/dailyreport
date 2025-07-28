
'use client';

import { useEffect, useState } from 'react';
import type { AdminUser } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAgents } from '@/app/admin/actions';
import { Skeleton } from '@/components/ui/skeleton';

export default function AgentList() {
  const [agents, setAgents] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setIsLoading(true);
        const fetchedAgents = await getAgents();
        setAgents(fetchedAgents || []);
      } catch (error) {
        console.error('Failed to fetch agents:', error);
        setAgents([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgents();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Agents</CardTitle>
        <CardDescription>A list of all currently registered sales agents.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.length > 0 ? (
                agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.fullName}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.phone}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No agents registered yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
