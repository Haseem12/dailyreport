
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { StockReport } from '@/lib/types';

interface StockReportDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  report: StockReport | null;
}

export default function StockReportDetailsDialog({
  isOpen,
  onOpenChange,
  report,
}: StockReportDetailsDialogProps) {
  if (!report) {
    return null;
  }

  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Report Details - {report.id}</DialogTitle>
          <DialogDescription>
            Full stock report for {report.customerName} submitted by {report.salesAgentName}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p><strong>Customer:</strong> {report.customerName}</p>
              <p><strong>Address:</strong> {report.customerAddress}</p>
              <p><strong>Sales Agent:</strong> {report.salesAgentName}</p>
              <p><strong>Outstanding Balance:</strong> ₦{report.outstandingBalance.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p><strong>Visit Date:</strong> {report.dateOfVisit.toLocaleDateString()}</p>
              <p><strong>Supply Date:</strong> {report.supplyDate.toLocaleDateString()}</p>
              <p><strong>Batch Number:</strong> {report.batchNumber}</p>
              <p><strong>Overall Condition:</strong> <Badge variant={report.productCondition === 'Damaged' ? 'destructive' : 'secondary'}>{report.productCondition}</Badge></p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Product Details</h3>
            <div className="border rounded-lg">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty Remaining</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {report.products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell>{product.quantityRemaining}</TableCell>
                        <TableCell>{product.remarks}</TableCell>
                        <TableCell>{product.action}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
