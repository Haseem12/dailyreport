
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
import type { StockReport, ProductStock } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const products = report.productss || [];

  const getProductCondition = (product: ProductStock): { condition: 'Good' | 'Damaged' | 'Expired', variant: 'secondary' | 'destructive' } => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const expiryDate = new Date(product.expiryDate);
    
    if (expiryDate < today) {
        return { condition: 'Expired', variant: 'destructive' };
    }
    if (product.productCondition === 'Damaged') {
        return { condition: 'Damaged', variant: 'destructive' };
    }
    return { condition: 'Good', variant: 'secondary' };
  }


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Report Details</DialogTitle>
          <DialogDescription>
            Full stock report for {report.customerName} from {new Date(report.dateOfVisit).toLocaleDateString()}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
          <Card>
            <CardHeader>
                <CardTitle>Visit Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                     <p><strong>Customer:</strong> {report.customerName}</p>
                     <p><strong>Visit Date:</strong> {new Date(report.dateOfVisit).toLocaleDateString()}</p>
                     <p><strong>Address:</strong> {report.customerAddress}</p>
                     <p><strong>Outstanding Balance:</strong> ₦{report.outstandingBalance.toLocaleString()}</p>
                     <p><strong>Sales Agent:</strong> {report.salesAgentName}</p>
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-center">Qty</TableHead>
                        <TableHead>Batch No.</TableHead>
                        <TableHead>Supply Date</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead className="text-right">Condition</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length > 0 ? (
                          products.map((product, index) => {
                            const { condition, variant } = getProductCondition(product);
                            return (
                                <TableRow key={product.id || index}>
                                    <TableCell className="font-medium">{product.productName}</TableCell>
                                    <TableCell className="text-center">{product.quantityRemaining}</TableCell>
                                    <TableCell>{product.batchNumber}</TableCell>
                                    <TableCell>{new Date(product.supplyDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(product.expiryDate).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                    <Badge variant={variant}>
                                        {condition}
                                    </Badge>
                                    </TableCell>
                                </TableRow>
                            )
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                              No product details available for this report.
                            </TableCell>
                          </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </div>
            </CardContent>
          </Card>
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
