'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { AlertCircle, Zap } from 'lucide-react';
import { detectStockAnomalies, DetectStockAnomaliesOutput } from '@/ai/flows/detect-stock-anomalies';
import type { StockReport } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function AnomalyDetector({ reports }: { reports: StockReport[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectStockAnomaliesOutput | null>(null);
  const { toast } = useToast();

  const handleDetection = async () => {
    setIsLoading(true);
    setResult(null);
    try {
      const reportData = JSON.stringify(reports.map(r => ({
        customer: r.customerName,
        agent: r.salesAgentName,
        products: r.products.map(p => ({ name: p.productName, quantity: p.quantityRemaining }))
      })));

      const analysis = await detectStockAnomalies({ reportData });
      setResult(analysis);
    } catch (error) {
      console.error('Anomaly detection failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to detect anomalies. Please try again.',
      });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setResult(null);
    }
    setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Button onClick={() => { setIsOpen(true); handleDetection(); }} size="sm" className="gap-1">
        <Zap className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Detect Anomalies</span>
      </Button>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Stock Anomaly Detection</DialogTitle>
          <DialogDescription>
            AI-powered analysis to find unusual stock levels.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4 min-h-[200px]">
          {isLoading && (
             <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Zap className="h-8 w-8 animate-pulse text-primary" />
                    <p>Analyzing reports...</p>
                </div>
            </div>
          )}
          {result && (
            <div className="space-y-4">
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Analysis Summary</AlertTitle>
                    <AlertDescription>{result.summary}</AlertDescription>
                </Alert>
                <div>
                    <h3 className="font-semibold mb-2">Detected Anomalies:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {result.anomalies.map((anomaly, index) => (
                            <li key={index}>{anomaly}</li>
                        ))}
                    </ul>
                </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
