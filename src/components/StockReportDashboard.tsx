
"use client";

import { useState, useEffect } from 'react';
import type { StockReport } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, File, ListFilter } from 'lucide-react';
import StockReportDetailsDialog from './StockReportDetailsDialog';
import { Skeleton } from './ui/skeleton';

export default function StockReportDashboard() {
  const [reports, setReports] = useState<StockReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedReport, setSelectedReport] = useState<StockReport | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    // In a static build, we can't fetch data.
    // We'll just show an empty state.
    setIsLoading(false);
  }, []);

  const handleViewDetails = (report: StockReport) => {
    setSelectedReport(report);
    setIsDetailsOpen(true);
  };

  const filteredReports = reports.filter(
    (report) =>
      report.customerName.toLowerCase().includes(filter.toLowerCase()) ||
      report.salesAgentName.toLowerCase().includes(filter.toLowerCase())
  );

  const getBadgeVariant = (condition?: 'Good' | 'Damaged' | 'Expired') => {
    if (condition === 'Damaged' || condition === 'Expired') {
        return 'destructive';
    }
    return 'secondary';
  }

  return (
    <>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Stock Reports</CardTitle>
                  <CardDescription>
                    An overview of all stock reports from sales agents.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuItem>Product Condition</DropdownMenuItem>
                      <DropdownMenuItem>Date Range</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" variant="outline" className="gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Export
                    </span>
                  </Button>
              </div>
            </div>
            <div className="pt-4">
              <Input
                placeholder="Filter by customer or agent..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
               <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
               </div>
            ) : (
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Agent</TableHead>
                    <TableHead className="hidden md:table-cell">Condition</TableHead>
                    <TableHead>Visit Date</TableHead>
                    <TableHead className="text-right">Balance (₦)</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredReports.length > 0 ? filteredReports.map((report) => (
                    <TableRow key={report.id}>
                        <TableCell>
                        <div className="font-medium">{report.customerName}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            {report.customerAddress}
                        </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{report.salesAgentName}</TableCell>
                        <TableCell className="hidden md:table-cell">
                        <Badge variant={getBadgeVariant(report.productCondition)}>
                            {report.productCondition}
                        </Badge>
                        </TableCell>
                        <TableCell>
                        {new Date(report.dateOfVisit).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                        {report.outstandingBalance.toLocaleString()}
                        </TableCell>
                        <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewDetails(report)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                                No reports found. Data fetching is disabled for static export.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>
            )}
          </CardContent>
        </Card>
      </div>
      {selectedReport && (
        <StockReportDetailsDialog 
            isOpen={isDetailsOpen} 
            onOpenChange={setIsDetailsOpen}
            report={selectedReport} 
        />
      )}
    </>
  );
}
